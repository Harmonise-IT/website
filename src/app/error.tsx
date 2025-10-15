'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    console.error('[route-error]', error);
    return (
        <div style={{ padding: 32 }}>
            <h2>Er ging iets mis…</h2>
            <button onClick={() => reset()}>Probeer opnieuw</button>
        </div>
    );
}
