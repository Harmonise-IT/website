'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
    return (
        <html>
        <body style={{display:'grid',placeItems:'center',minHeight:'100dvh',color:'#fff',background:'#0b1020'}}>
        <div style={{maxWidth:560,padding:24}}>
            <h1 style={{fontSize:28,margin:'0 0 8px'}}>Er ging iets mis</h1>
            <p style={{opacity:.8,margin:'0 0 16px'}}>Er is een fout opgetreden tijdens het laden.</p>
            <button onClick={() => reset()} style={{padding:'10px 14px',borderRadius:10,fontWeight:700}}>
                Opnieuw laden
            </button>
        </div>
        </body>
        </html>
    )
}
