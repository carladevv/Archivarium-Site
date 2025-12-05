export default function BackgroundMosaic() {
  const BG_IMAGES = Array.from({ length: 14 }, (_, i) => `/background/avif/256/${i + 1}.avif`);
  const tiles = Array.from({ length: 120 }, (_, i) => BG_IMAGES[i % BG_IMAGES.length]);
  const COLS = 10;

  const columns: string[][] = Array.from({ length: COLS }, () => []);
  tiles.forEach((src, i) => columns[i % COLS].push(src));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 flex items-center justify-center"
      style={{ opacity: 0.03, filter: "grayscale(100%)" }}
    >
      <div className="flex w-full h-full" style={{ gap: "clamp(8px, 2vw, 24px)" }}>
        {columns.map((col, c) => (
          <div
            key={c}
            className="flex flex-col flex-1"
            style={{
              gap: "clamp(8px, 2vw, 24px)",
              paddingTop: c % 2 ? "clamp(16px, 4vw, 48px)" : 0,
              minWidth: 0,
            }}
          >
            {col.map((src, i) => (
              <img
                key={`${c}-${i}`}
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width={256}
                height={256}
                className="block select-none w-full"
                style={{ aspectRatio: "1/1", objectFit: "cover" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
