import { MonitorSmartphone, ChartLine, PencilRuler, Users, Palette } from "lucide-react";
import { ACCENTS, type Translations } from "../../theme";

type Props = { t: Translations[keyof Translations] };

export default function Features({ t }: Props) {
  const icons = [MonitorSmartphone, PencilRuler, Users, Palette, ChartLine];

  return (
    <section aria-labelledby="features-title" className="space-y-6">
      <h2 id="features-title" className="h2">{t.featuresTitle.toUpperCase()}</h2>

      <ul className="space-y-4">
        {t.features.map((f, i) => {
          const a = ACCENTS[i % ACCENTS.length];
          const Icon = icons[i % icons.length];

          return (
            <li key={f.title} className="flex items-center gap-6" style={{ alignItems: "center" }}>
              <div className="flex-shrink-0 flex items-center justify-center px-4" style={{ height: "100%" }}>
                <Icon size={20} strokeWidth={1.8} style={{ color: a.bg, flexShrink: 0 }} aria-hidden="true" />
              </div>
              <div className="flex-1 pl-6 pt-2 pb-2" style={{ borderLeft: `2px solid ${a.bg}` }}>
                <h3 className="font-medium text-base mb-1" style={{ color: "var(--text)", fontFamily: "'Ubuntu Sans', sans-serif", fontWeight: 400 }}>
                  {f.title.toUpperCase()}
                </h3>
                <p className="text-sm muted">{f.desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
