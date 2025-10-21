// app/api/contact/route.ts
import { NextResponse } from 'next/server'

// Ensure Node.js runtime (not Edge) for better compatibility with fetch/env
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function json(data: any, status = 200) {
    return NextResponse.json(data, { status })
}

export async function GET() {
    return json({ ok: true, route: 'contact', accepts: ['POST'] })
}

export async function POST(req: Request) {
    try {
        const { name, email, subject, phone, message } = await req.json()

        if (!name || !email || !message) {
            return json({ ok: false, error: 'Missing required fields' }, 400)
        }

        // Compose HTML
        const html = `
      <h2>Nieuw contactbericht</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefoon:</strong> ${phone || '-'}</p>
      <p><strong>Onderwerp:</strong> ${subject || '-'}</p>
      <hr/>
      <p>${String(message || '').replace(/\n/g, '<br/>')}</p>
    `

        // Basic sanity check on env vars (helps catch 502 causes early)
        const apiKey = process.env.RESEND_API_KEY
        const from = process.env.CONTACT_FROM
        const to = process.env.CONTACT_TO

        if (!apiKey || !from || !to) {
            console.error('Missing env vars', { hasApiKey: !!apiKey, from, to })
            return json({ ok: false, error: 'Server not configured (env vars missing).' }, 500)
        }

        const r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from,
                to: Array.isArray(to) ? to : [to],
                reply_to: [email],
                subject: subject ? `[Contact] ${subject}` : 'Nieuw contactbericht',
                html,
            }),
        })

        // Decode error detail from Resend so you can see it in the client
        if (!r.ok) {
            const ct = r.headers.get('content-type') || ''
            const details = ct.includes('application/json') ? await r.json().catch(() => null) : await r.text().catch(() => '')
            console.error('Resend error', r.status, details)
            return json({
                ok: false,
                error: 'Resend rejected the request',
                status: r.status,
                details,
            }, 502)
        }

        const payload = await r.json().catch(() => ({}))
        return json({ ok: true, id: payload?.id ?? null })
    } catch (e: any) {
        console.error('Contact route error', e)
        return json({ ok: false, error: e?.message || 'Invalid request' }, 400)
    }
}
