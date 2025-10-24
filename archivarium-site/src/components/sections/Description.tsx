import type { Translations } from "../../theme";

type Props = { t: Translations[keyof Translations] };

export default function Description({ t }: Props) {
  const paras = Object.values(t.description);
  return (
    <section aria-label="description" className="leading-relaxed py-2 text-m sm:text-lg muted">
      {paras.map((para, i) => (
        <p key={i} className={i < paras.length - 1 ? "mb-4" : ""}>{para}</p>
      ))}
    </section>
  );
}
