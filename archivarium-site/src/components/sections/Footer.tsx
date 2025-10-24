import type { Translations } from "../../theme";

type Props = {
  t: Translations[keyof Translations];
  startYear: number;
  currentYear: number;
};

export default function Footer({ t, startYear, currentYear }: Props) {
  return (
    <footer className="text-center text-sm muted">
      <p>© {startYear}–{currentYear} {t.title}. {t.footerCopyright}</p>
    </footer>
  );
}
