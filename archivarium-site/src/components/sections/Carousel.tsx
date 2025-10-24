import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Translations } from "../../theme";

type Props = {
  t: Translations[keyof Translations];
  intervalMs?: number;
};

const ArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
);
const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}><path fill="currentColor" d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z"/></svg>
);

export default function Carousel({ t, intervalMs = 4500 }: Props) {
  const items = t.carouselItems ?? [];
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  const safeItems = useMemo(
    () => items.filter(i => i?.src).map(i => ({ ...i, alt: i.alt || i.caption || "Screenshot" })),
    [items]
  );

  const go = (next: number) => setIdx((prev) => (next + safeItems.length) % safeItems.length);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // Auto-play with pause on hover/focus for accessibility
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pause = () => { if (timer.current) window.clearInterval(timer.current); timer.current = null; };
  const play = () => {
    if (timer.current) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % safeItems.length);
    }, intervalMs) as unknown as number;
  };

  useEffect(() => {
    play();
    return () => { if (timer.current) window.clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, safeItems.length]);

  if (!safeItems.length) return null;

  return (
    <section aria-labelledby="carousel-title" className="space-y-4">
      <h2 id="carousel-title" className="h2">
        {t.carouselTitle?.toUpperCase?.() || "GALLERY"}
      </h2>

      <div
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onMouseEnter={pause}
        onMouseLeave={play}
        onFocus={pause}
        onBlur={play}
        aria-roledescription="carousel"
        aria-label={t.carouselTitle || "Image carousel"}
      >
        {/* Track (fade transition via opacity) */}
        <div className="relative" style={{ aspectRatio: "24 / 9", background: "var(--surface-muted)" }}>
          {safeItems.map((item, i) => {
            const active = i === idx;
            return (
              <figure
                key={item.src + i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: active ? 1 : 0 }}
                aria-hidden={!active}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Caption overlay (uses theme tokens) */}
                <figcaption
                  className="absolute left-0 right-0 bottom-0 px-4 py-3 text-sm"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.12) 60%, rgba(0,0,0,0))",
                    color: "var(--surface)",
                    textShadow: "0 1px 2px rgba(0,0,0,.35)",
                  }}
                >
                  <span className="block">{item.caption}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* Prev / Next buttons */}
        <button
          type="button"
          className="group absolute left-2 top-1/2 -translate-y-1/2 p-2"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          onClick={prev}
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="group absolute right-2 top-1/2 -translate-y-1/2 p-2"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          onClick={next}
          aria-label="Next slide"
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Dots / slide number for screen readers */}
        <div className="sr-only" aria-live="polite">
          {`Slide ${idx + 1} of ${safeItems.length}: ${safeItems[idx].caption}`}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto py-1" role="tablist" aria-label="carousel thumbnails">
        {safeItems.map((item, i) => {
          const active = i === idx;
          return (
            <button
              key={item.src + "thumb"}
              onClick={() => go(i)}
              role="tab"
              aria-selected={active}
              className="relative flex-shrink-0"
              style={{
                border: active ? `2px solid var(--focus)` : "1px solid var(--divider)",
                outline: "none",
                background: "var(--surface)",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-16 w-28 object-cover"
                draggable={false}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
