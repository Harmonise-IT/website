// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    // quick sanity check: visit /api/contact in the browser
    return NextResponse.json({ ok: true, route: 'contact', accepts: ['POST'] });
}

export async function POST(req: Request) {
    try {
        const { name, email, subject, phone, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
        }

        const html = `
      <h2>Nieuw contactbericht</h2>
      <p><strong>Naam:</strong> ${name}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefoon:</strong> ${phone || '-'}</p>
      <p><strong>Onderwerp:</strong> ${subject || '-'}</p>
      <hr/>
      <p>${(message || '').replace(/\n/g, '<br/>')}</p>
    `;

        const r = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: process.env.CONTACT_FROM,
                to: [process.env.CONTACT_TO!],
                reply_to: [email],
                subject: subject ? `[Contact] ${subject}` : 'Nieuw contactbericht',
                html,
            }),
        });

        if (!r.ok) {
            const text = await r.text();
            console.error('Resend error:', text);
            return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 502 });
        }

        return NextResponse.json({ ok: true });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
    }
}
