import React, { useEffect, useMemo, useRef, useState } from "react";
import type { Translations } from "../../theme";

type CarouselItem = {
  src: string;                // required fallback (png/jpg)
  alt?: string;
  caption?: string;
  // Optional performance-friendly sources:
  srcAvif?: string;
  srcWebp?: string;
  // Optional dedicated thumbnail (recommended)
  thumbSrc?: string;
  thumbAvif?: string;
  thumbWebp?: string;
  // Optional intrinsic size (stabilizes layout)
  width?: number;             // e.g., 1920
  height?: number;            // e.g., 720
};

type Props = {
  t: Translations[keyof Translations];
  intervalMs?: number;        // autoplay interval
  id?: string;                // for aria-owns/controls scoping if multiple carousels exist
};

const ArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
);
const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" aria-hidden {...props}><path fill="currentColor" d="m8.59 16.59 1.41 1.41 6-6-6-6-1.41 1.41L13.17 12z"/></svg>
);

export default function Carousel({ t, intervalMs = 4500, id = "carousel" }: Props) {
  const itemsRaw = (t.carouselItems ?? []) as CarouselItem[];
  const items = useMemo<CarouselItem[]>(
    () => itemsRaw.filter(i => i?.src).map(i => ({
      ...i,
      alt: i.alt || i.caption || "Screenshot",
      width: i.width ?? 1920,
      height: i.height ?? 720,
    })),
    [itemsRaw]
  );

  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isReducedMotion = useRef<boolean>(false);

  const go = (next: number) => setIdx(() => (next + items.length) % items.length);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  // Reduced motion: disable autoplay and transitions if user prefers it
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const apply = () => { isReducedMotion.current = !!mq?.matches; };
    apply();
    mq?.addEventListener?.("change", apply);
    return () => mq?.removeEventListener?.("change", apply);
  }, []);

  const pause = () => { if (timer.current) window.clearInterval(timer.current); timer.current = null; };
  const play = () => {
    if (isReducedMotion.current) return; // respect reduced motion
    if (timer.current || items.length <= 1) return;
    timer.current = window.setInterval(() => setIdx(i => (i + 1) % items.length), intervalMs) as unknown as number;
  };

  useEffect(() => {
    play();
    return () => { if (timer.current) window.clearInterval(timer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs, items.length]);

  if (!items.length) return null;

  // Keyboard controls on the container
  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "ArrowLeft": e.preventDefault(); prev(); break;
      case "ArrowRight": e.preventDefault(); next(); break;
      case "Home": e.preventDefault(); go(0); break;
      case "End": e.preventDefault(); go(items.length - 1); break;
      default: break;
    }
  };

  const titleText = t.carouselTitle?.toUpperCase?.() || "GALLERY";
  const sectionId = `${id}-region`;
  const trackId = `${id}-track`;

  return (
    <section aria-labelledby={`${id}-title`} className="space-y-4">
      <h2 id={`${id}-title`} className="h2">{titleText}</h2>

      <div
        id={sectionId}
        ref={containerRef}
        className="relative overflow-hidden select-none"
        onMouseEnter={pause}
        onMouseLeave={play}
        onFocus={pause}
        onBlur={play}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.carouselTitle || "Image carousel"}
        aria-owns={trackId}
        style={{ outline: "none" }}
      >
        {/* Track (fade transition) */}
        <div id={trackId} className="relative" style={{ aspectRatio: "24 / 9", background: "var(--surface-muted)" }}>
          {items.map((item, i) => {
            const active = i === idx;
            const slideId = `${id}-slide-${i}`;
            const eager = active || i === (idx + 1) % items.length;

            return (
              <figure
                key={(item.srcAvif || item.srcWebp || item.src) + i}
                id={slideId}
                className={isReducedMotion.current
                  ? "absolute inset-0"
                  : "absolute inset-0 transition-opacity duration-700 ease-in-out"}
                style={{ opacity: active ? 1 : 0 }}
                aria-hidden={!active}
                aria-labelledby={`${slideId}-caption`}
              >
                <picture>
                  {item.srcAvif && <source srcSet={item.srcAvif} type="image/avif" />}
                  {item.srcWebp && <source srcSet={item.srcWebp} type="image/webp" />}
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                    draggable={false}
                    loading={eager ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={active ? "high" : "low"}
                    width={item.width}
                    height={item.height}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                </picture>

                {/* Caption overlay */}
                {(item.caption ?? "").length > 0 && (
                  <figcaption
                    id={`${slideId}-caption`}
                    className="absolute left-0 right-0 bottom-0 px-4 py-3 text-sm"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,.45), rgba(0,0,0,.12) 60%, rgba(0,0,0,0))",
                      color: "var(--surface)",
                      textShadow: "0 1px 2px rgba(0,0,0,.35)",
                    }}
                  >
                    <span className="block">{item.caption}</span>
                  </figcaption>
                )}
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
          aria-controls={trackId}
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="group absolute right-2 top-1/2 -translate-y-1/2 p-2"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          onClick={next}
          aria-label="Next slide"
          aria-controls={trackId}
        >
          <ArrowRight className="h-5 w-5" />
        </button>

        {/* Live slide announcement for screen readers */}
        <div className="sr-only" aria-live="polite">
          {`Slide ${idx + 1} of ${items.length}: ${items[idx].caption || items[idx].alt}`}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto py-1" role="tablist" aria-label="carousel thumbnails">
        {items.map((item, i) => {
          const active = i === idx;
          const thumbId = `${id}-thumb-${i}`;
          const slideId = `${id}-slide-${i}`;
          const thumbSrc = item.thumbAvif || item.thumbWebp || item.thumbSrc || item.src;
          const thumbAvif = item.thumbAvif;
          const thumbWebp = item.thumbWebp;

          return (
            <button
              key={thumbId}
              id={thumbId}
              onClick={() => go(i)}
              role="tab"
              aria-selected={active}
              aria-controls={slideId}
              className="relative flex-shrink-0"
              style={{
                border: active ? `2px solid var(--focus)` : "1px solid var(--divider)",
                outline: "none",
                background: "var(--surface)",
              }}
            >
              <picture>
                {thumbAvif && <source srcSet={thumbAvif} type="image/avif" />}
                {thumbWebp && <source srcSet={thumbWebp} type="image/webp" />}
                <img
                  src={thumbSrc}
                  alt={item.alt}
                  className="h-16 w-28 object-cover"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  width={320}
                  height={180}
                />
              </picture>
            </button>
          );
        })}
      </div>
    </section>
  );
}
