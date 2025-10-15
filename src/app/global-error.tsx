'use client';

import React from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    // Optional: send to your logger here
    if (typeof window !== 'undefined') {
        // Replace with your logging endpoint
        console.error('[global-error]', { message: error?.message, stack: error?.stack, digest: error?.digest });
    }

    return (
        <html lang="nl">
        <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif', background: '#000', color: '#fff' }}>
        <div style={{ padding: '48px 24px', maxWidth: 720 }}>
            <h1 style={{ margin: 0, fontSize: 28 }}>Er ging iets mis</h1>
            <p style={{ opacity: 0.8, marginTop: 12 }}>
                Er is een fout opgetreden tijdens het laden. Probeer het opnieuw.
            </p>
            <button
                onClick={() => reset()}
                style={{ marginTop: 20, padding: '10px 16px', borderRadius: 8, border: 0, cursor: 'pointer' }}
            >
                Opnieuw laden
            </button>
        </div>
        </body>
        </html>
    );
}
