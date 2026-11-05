import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { StudioOrnament } from './StudioOrnament';

export interface ReadingPage { label: string; title: string; text?: string; image?: string; content?: React.ReactNode; layout?: 'feature' | 'note' | 'visual' | 'awards' }

// Place full-height prints between offset pairs of smaller, unequal notes.
const pinPositions = (layouts: string[]) => {
  let column = 1;
  let lowerNote = false;
  let pair = 0;
  return layouts.map((layout) => {
    const fullHeight = ['lead', 'feature', 'visual'].includes(layout);
    if (fullHeight && lowerNote) { column += 11; lowerNote = false; }
    let position: React.CSSProperties;
    if (fullHeight) {
      position = {
        '--pin-column': `${column} / span ${layout === 'feature' ? 7 : 8}`,
        '--pin-row': layout === 'visual' ? '3 / span 9' : '2 / span 10',
        '--pin-tilt': layout === 'feature' ? '0deg' : layout === 'lead' ? '-2deg' : '3deg',
      } as React.CSSProperties;
      column += layout === 'feature' ? 9 : 10;
    } else {
      position = {
        '--pin-column': `${column + (lowerNote ? 1 : 0)} / span ${lowerNote ? 8 : 7}`,
        '--pin-row': lowerNote ? '8 / span 5' : pair % 2 ? '2 / span 5' : '1 / span 6',
        '--pin-tilt': layout === 'awards' ? '-4deg' : lowerNote ? '3deg' : '-2deg',
      } as React.CSSProperties;
      if (lowerNote) { column += 11; pair += 1; }
      lowerNote = !lowerNote;
    }
    return position;
  });
};

/** Animate the contents, leaving the paper's layout and rotation untouched. */
const ScrollPiece = ({ container, placement, className, label, children }: {
  container: React.RefObject<HTMLDivElement | null>;
  placement: React.CSSProperties;
  className: string;
  label: string;
  children: React.ReactNode;
}) => {
  const piece = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollXProgress } = useScroll({ container, target: piece, axis: 'x', offset: ['start end', 'end start'] });
  const direction = className.includes('visual') || className.includes('recognition') ? -1 : 1;
  const opacity = useTransform(scrollXProgress, [0, .2, .78, 1], [.35, 1, 1, .5]);
  const x = useTransform(scrollXProgress, [0, .2, .78, 1], [22, 0, 0, -16]);
  const y = useTransform(scrollXProgress, [0, .2, .78, 1], [26 * direction, 0, 0, -18 * direction]);

  return <section ref={piece} className={className} style={placement} aria-label={label}>
    <motion.div className="reader-motion" style={{ opacity: reducedMotion ? 1 : opacity, x: reducedMotion ? 0 : x, y: reducedMotion ? 0 : y }}>
      {children}
    </motion.div>
  </section>;
};

/** A continuous horizontal article, without page boundaries or snapping. */
export const ReadingDeck = ({ pages, name, lead }: { pages: ReadingPage[]; name: string; lead?: React.ReactNode }) => {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const { t } = useLanguage();
  const placements = pinPositions([...(lead ? ['lead'] : []), ...pages.map(section => section.layout ?? (section.image ? 'visual' : 'note'))]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const wheel = (event: WheelEvent) => {
      // Preserve native horizontal trackpad scrolling and browser zoom gestures.
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? element.clientWidth : 1);
      if ((delta < 0 && element.scrollLeft <= 0) || (delta > 0 && element.scrollLeft >= element.scrollWidth - element.clientWidth - 1)) return;
      event.preventDefault();
      element.scrollLeft += delta;
    };
    element.addEventListener('wheel', wheel, { passive: false });
    return () => element.removeEventListener('wheel', wheel);
  }, []);

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current = null;
    event.currentTarget.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return <section className="reading-deck" aria-label={name}>
    <div ref={track} className="reader-track" tabIndex={0} aria-label={t('左右滑动阅读，也可以使用滚轮或方向键', 'Scroll horizontally to read, or use the mouse wheel or arrow keys')} onKeyDown={(event) => {
      if (event.altKey || event.metaKey || event.ctrlKey || (event.target as HTMLElement).closest('a, button, select, input, textarea')) return;
      const element = event.currentTarget;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        element.scrollBy({ left: event.key === 'ArrowRight' ? 80 : -80, behavior: 'instant' });
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        element.scrollTo({ left: event.key === 'Home' ? 0 : element.scrollWidth, behavior: 'instant' });
      }
    }} onPointerDown={(event) => {
      if (event.pointerType !== 'mouse' || event.button !== 0 || (event.target as HTMLElement).closest('a, button, select, input, textarea')) return;
      drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, moved: false };
      event.currentTarget.setPointerCapture(event.pointerId);
    }} onPointerMove={(event) => {
      const gesture = drag.current;
      if (!gesture) return;
      const distance = event.clientX - gesture.x;
      if (Math.abs(distance) > 6) {
        gesture.moved = true;
        event.currentTarget.classList.add('is-dragging');
      }
      if (gesture.moved) event.currentTarget.scrollLeft = gesture.left - distance;
    }} onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { drag.current = null; track.current?.classList.remove('is-dragging'); }} onDragStart={(event) => event.preventDefault()}>
      {lead && <ScrollPiece container={track} className="reader-content reader-lead" placement={placements[0]} label={name}>{lead}</ScrollPiece>}
      {pages.map((section, i) => <ScrollPiece container={track} className={`reader-content reader-${section.layout === 'awards' ? 'recognition' : section.layout ?? (section.image ? 'visual' : 'note')}`} key={i} placement={placements[i + (lead ? 1 : 0)]} label={section.title}>
        {section.layout === 'awards' && <StudioOrnament variant={1} />}
        <h2>{section.title}</h2>
        <div className={`reader-body ${section.image ? 'reader-with-image' : ''}`}>
          {section.image && <img src={section.image} alt={section.title} loading="lazy" draggable={false} />}
          {section.text && <p>{section.text}</p>}
          {section.content}
        </div>
      </ScrollPiece>)}
    </div>
  </section>;
};
