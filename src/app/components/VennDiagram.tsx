'use client';

import { useId, useMemo } from 'react';
import s from './VennDiagram.module.scss';

type VennDiagramProps = {
    size?: number; // total SVG size in px
    animate?: boolean;
    labels?: {
        a?: string; b?: string; c?: string;
        ab?: string; bc?: string; ac?: string; abc?: string;
    };
    colors?: { a?: string; b?: string; c?: string };
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    title?: string;
    description?: string;
};

export default function VennDiagram({
                                        size = 764, // bigger canvas
                                        animate = true,
                                        labels = { a: 'Mens', b: 'Beleid', c: 'Techniek', ab: '', bc: '', ac: '', abc: 'Opgave' },
                                        colors = { a: '#EBA33B', b: '#EBA33B', c: '#EBA33B' },
                                        stroke = 'rgba(0,0,0,0.28)',
                                        strokeWidth = 2,
                                        className,
                                        title = 'Venn Diagram',
                                        description = 'Three intersecting sets with gentle animated breathing.',
                                    }: VennDiagramProps) {
    const uid = useId();

    // Larger radius + tighter placement => more overlap
    const r = useMemo(() => size * 0.30, [size]); // was 0.235
    const center = useMemo(() => ({ x: size / 2, y: size / 2 }), [size]);

    // smaller offsets increase overlap
    const offsetX = useMemo(() => r * 0.5, [r]);  // was ~0.95r
    const offsetY = useMemo(() => r * 0.5, [r]);  // was ~0.85r

    const A = { cx: center.x - offsetX, cy: center.y + offsetY * 0.18 };
    const B = { cx: center.x + offsetX, cy: center.y + offsetY * 0.18 };
    const C = { cx: center.x,            cy: center.y - offsetY * 0.95 };

    const ariaTitleId = `${uid}-title`;
    const ariaDescId = `${uid}-desc`;

    const styleVars = {
        '--venn-a': colors.a,
        '--venn-b': colors.b,
        '--venn-c': colors.c,
        '--venn-stroke': stroke,
        '--venn-stroke-width': `${strokeWidth}`,
        '--venn-size': `${size}px`,
    } as React.CSSProperties;

    return (
        <figure
            className={[s.container, animate ? s.animate : '', className].filter(Boolean).join(' ')}
            style={styleVars}
            aria-labelledby={ariaTitleId}
            aria-describedby={ariaDescId}
            role="img"
        >
            <svg
                className={s.venn}
                width="100%"
                height="100%"
                viewBox={`0 0 ${size} ${size}`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                <defs>
                    <filter id={`${uid}-shadow`} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
                        <feOffset in="blur" dx="0" dy="4" result="offset" />
                        <feMerge>
                            <feMergeNode in="offset" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id={`${uid}-noise`}>
                        <feTurbulence baseFrequency="0.9" numOctaves="2" type="fractalNoise" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 0 0 0.06" />
                        </feComponentTransfer>
                        <feBlend mode="multiply" in2="SourceGraphic" />
                    </filter>
                </defs>

                <g filter={`url(#${uid}-shadow)`}>
                    {/* Circle A */}
                    <circle
                        cx={A.cx}
                        cy={A.cy}
                        r={r}
                        fill="var(--venn-a)"
                        fillOpacity="0.5"
                        stroke="var(--venn-stroke)"
                        strokeWidth={strokeWidth}
                        filter={`url(#${uid}-noise)`}
                    >
                        {animate && (
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                dur="12s"
                                values="0 0; 20 20; 0 40; -20 20; 0 0; -20 -20; 0 -40; 20 -20; 0 0"
                                repeatCount="indefinite"
                            />

                        )}
                    </circle>

                    {/* Circle B */}
                    <circle
                        cx={B.cx}
                        cy={B.cy}
                        r={r}
                        fill="var(--venn-b)"
                        fillOpacity="0.5"
                        stroke="var(--venn-stroke)"
                        strokeWidth={strokeWidth}
                        filter={`url(#${uid}-noise)`}
                    >
                        {animate && (
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                dur="12s"
                                values="0 0; -20 15; 0 -20; -15 -15; 0 0; 25 -15; 40 0; 25 15; 0 0"
                                repeatCount="indefinite"
                            />


                        )}
                    </circle>

                    {/* Circle C */}
                    <circle
                        cx={C.cx}
                        cy={C.cy}
                        r={r}
                        fill="var(--venn-c)"
                        fillOpacity="0.5"
                        stroke="var(--venn-stroke)"
                        strokeWidth={strokeWidth}
                        filter={`url(#${uid}-noise)`}
                    >
                        {animate && (
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                dur="12s"
                                values="0 0; 15 -15; 0 -30; -15 -15; 0 0; -15 15; 0 30; 15 15; 0 0"
                                repeatCount="indefinite"
                            />
                        )}
                    </circle>
                </g>

                {/* Labels */}
                <g className={s.labels}>
                    {labels.a && (
                        <text x={A.cx + r * 0.3} y={A.cy - r * 1.2} className={s.label}>{labels.a}</text>
                    )}
                    {labels.b && (
                        <text x={B.cx + r * 0.8} y={A.cy + r * 0.4} className={s.label} textAnchor="end">{labels.b}</text>
                    )}
                    {labels.c && (
                        <text x={A.cx - r * 0.4} y={A.cy + r * 0.4} className={s.label} textAnchor="middle">{labels.c}</text>
                    )}
                    {labels.ab && (
                        <text x={center.x} y={center.y + r * 0.35} className={s.intersection} textAnchor="middle">{labels.ab}</text>
                    )}
                    {labels.ac && (
                        <text x={(A.cx + C.cx) / 2} y={(A.cy + C.cy) / 2 - r * 0.06} className={s.intersection} textAnchor="middle">{labels.ac}</text>
                    )}
                    {labels.bc && (
                        <text x={(B.cx + C.cx) / 2} y={(B.cy + C.cy) / 2 - r * 0.06} className={s.intersection} textAnchor="middle">{labels.bc}</text>
                    )}
                    {labels.abc && (
                        <text x={center.x} y={center.y} className={s.center} textAnchor="middle">{labels.abc}</text>
                    )}
                </g>
            </svg>

            <figcaption className={s.srOnly}>
                <span id={ariaTitleId}>{title}</span>
                <span id={ariaDescId}>{description}</span>
            </figcaption>
        </figure>
    );
}
