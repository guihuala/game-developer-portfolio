import React from 'react';

/** Decorative ink marks share the site's cyan and osmanthus yellow. */
export const StudioOrnament = ({ variant = 0 }: { variant?: number }) => (
  <svg className={`studio-ornament ornament-${variant % 3}`} viewBox="0 0 100 80" fill="none" aria-hidden="true" focusable="false">
    {variant % 3 === 0 ? <><path d="M48 7c0 22-12 33-34 33 22 0 34 12 34 33 0-21 12-33 34-33C60 40 48 29 48 7Z" fill="currentColor" /><circle cx="85" cy="12" r="4" fill="var(--studio-ink)" /></> : variant % 3 === 1 ? <><path d="M8 49c13-29 39-35 44-19S23 66 28 46s41-37 54-19M69 17l14 10-14 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /><circle cx="12" cy="16" r="4" fill="var(--studio-note)" /></> : <>{[18, 38, 58, 78].flatMap(x => [15, 35, 55].map(y => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" fill="currentColor" />))}<path d="m70 64 10 9 14-15" stroke="var(--studio-note)" strokeWidth="3" strokeLinecap="round" /></>}
  </svg>
);

export const OsmanthusMark = () => <svg className="tools-brand-flower" width="28" height="28" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  {[0, 90, 180, 270].map(angle => <path key={angle} transform={`rotate(${angle} 24 24)`} d="M24 24C14 24 5 23 5 14C5 5 15 3 20 10C24 15 24 20 24 24Z" fill="currentColor" />)}
</svg>;
