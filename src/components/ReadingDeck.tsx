import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface ReadingPage { label: string; title: string; text?: string; image?: string; content?: React.ReactNode }

/** A continuous horizontal article, without page boundaries or snapping. */
export const ReadingDeck = ({ pages, name }: { pages: ReadingPage[]; name: string }) => {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const { t } = useLanguage();

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
      {pages.map((section, i) => <section className="reader-content" key={i} aria-label={section.title}>
        <div className="reader-kicker">{name} / {section.label}</div>
        <h2>{section.title}</h2>
        <div className={`reader-body ${section.image ? 'reader-with-image' : ''}`}>
          {section.image && <img src={section.image} alt={section.title} loading="lazy" draggable={false} />}
          {section.text && <p>{section.text}</p>}
          {section.content}
        </div>
      </section>)}
    </div>
  </section>;
};
