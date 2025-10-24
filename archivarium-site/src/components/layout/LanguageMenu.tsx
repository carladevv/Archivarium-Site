import { useState } from "react";
import type { Language } from "../../theme";

const GlobeIcon = () => (
  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

type Props = {
  lang: Language;
  onChange: (l: Language) => void;
};

export default function LanguageMenu({ lang, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const languages: { code: Language; label: string }[] = [
    { code: "ES", label: "Español" },
    { code: "EN", label: "English" },
    { code: "CA", label: "Català" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
        aria-label="Select language"
        aria-expanded={open}
      >
        <GlobeIcon />
        {lang}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 mt-2 w-36 overflow-hidden z-50"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { onChange(l.code); setOpen(false); }}
                className="w-full px-3 py-2 text-left text-sm transition"
                style={{ background: lang === l.code ? "var(--surface-muted)" : "transparent", color: "var(--text)" }}
                onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = "var(--surface-muted)"; }}
                onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = "transparent"; }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
