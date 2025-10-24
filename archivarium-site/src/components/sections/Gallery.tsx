import type { Translations } from "../../theme";

type Props = { t: Translations[keyof Translations] };

export default function Gallery({ t }: Props) {
  return (
    <section aria-labelledby="gallery-title" className="space-y-4">
      <h2 id="gallery-title" className="h2">{t.snapshotsTitle.toUpperCase()}</h2>
      <p className="text-sm muted">{t.snapshotsDesc}</p>
      {[1, 2, 3].map((i) => (
        <figure key={i} className="overflow-hidden">
          <img src={`/screenshots/${i}.PNG`} alt="Project screenshot" className="h-56 w-full object-cover sm:h-100" />
        </figure>
      ))}
    </section>
  );
}
