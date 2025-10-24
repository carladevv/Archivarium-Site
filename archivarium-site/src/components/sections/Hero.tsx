import type { Translations } from "../../theme";

type Props = { t: Translations[keyof Translations] };

export default function Hero({ t }: Props) {
  return (
    <header className="text-center">
      <div className="mx-auto mb-4 badge">
        {t.badge}
      </div>

      <img
        src="/logos/archivarium_logo_2.png"
        alt="Proyecto Archivarium logo"
        className="mx-auto mb-2 h-32 w-auto"
      />

      <h1 className="h1 text-5xl sm:text-7xl">{t.title.toUpperCase()}</h1>

      <p className="mt-4 mb-6 text-lg sm:text-xl muted">
        {t.tagline}
      </p>
    </header>
  );
}
