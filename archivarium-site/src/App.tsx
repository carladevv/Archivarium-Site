import React, { useMemo, useState } from "react";
import translations from "./translations.json";

// ——— Proyecto Archivarium — Sleek/Modern pass on user-attached app ———
// Brief: apply the clean, modern style (no rounded corners, no chunky borders,
// minimal/no shadows, elegant spacing) to THIS version with translations + language menu.

// Keep the user's palette as-is
type Language = "ES" | "EN" | "CA";
const ACCENTS = [
  { bg: "#d46d29ff", text: "#FFFFFF" }, // terracotta orange
  { bg: "#A68A64", text: "#1C1C1C" }, // bronze beige
  { bg: "#bd9877ff", text: "#1C1C1C" }, // pale clay
  { bg: "#858585ff", text: "#FFFFFF" }, // neutral gray
];

export const COLORS = {
  // base
  bg: "#F5F4F2",            // light warm gray background (main column)
  outerBg: "#E5E3DF",       // slightly darker outer background
  text: "#2B2B2B",          // main body text
  textMuted: "#5E5E5E",     // muted gray
  heading: "#E8630A",       // orange for highlights
  link: "#C55A11",          // warm rust-orange link
  linkHover: "#8C3F00",     // darker hover

  // surfaces / structure
  surface: "#FFFFFF",       // cards, panels
  surfaceMuted: "#F0EDEB",  // inputs
  border: "#515050ff",      // hairline borders
  divider: "#C6C2BC",       // subtle separators
  shadow: "rgba(0, 0, 0, 0.06)", // very soft (almost flat)

  // states
  focus: "#E8630A",
  selectionBg: "#E8630A",
  selectionText: "#FFFFFF",
};

const CONTACT_EMAIL = "nadinaccg@gmail.com";
const YEAR_CREATED = 2024;

const CheckIcon = () => (
  <svg aria-hidden className="h-5 w-5 flex-none" viewBox="0 0 20 20" fill="currentColor" style={{ color: COLORS.heading }}>
    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.42l2.293 2.294 6.793-6.794a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const MailIcon = () => (
  <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: COLORS.text }}>
    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.511l-10 5.5-10-5.5V6zm0 2.236v9.764A2 2 0 004 20h16a2 2 0 002-2V8.236l-9.445 5.195a2 2 0 01-2.11 0L2 8.236z" />
  </svg>
);

const ArrowRight = () => (
  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: COLORS.text }}>
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
  </svg>
);

const GlobeIcon = () => (
  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);

type Translations = typeof translations;

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lang, setLang] = useState<Language>("ES");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const t = (translations as Translations)[lang];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.emailSubject} ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${t.emailBody.replace("Nombre:", form.name).replace("Correo electrónico:", form.email).replace("Mensaje:", form.message)}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const accentAt = (i: number) => ACCENTS[i % ACCENTS.length];

  const languages: { code: Language; label: string }[] = [
    { code: "ES", label: "Español" },
    { code: "EN", label: "English" },
    { code: "CA", label: "Català" },
  ];

  return (
    <main
      // Outer canvas with a subtle contrast from the inner column — flat, no rounded corners
      className="min-h-dvh antialiased"
      style={{ backgroundColor: COLORS.outerBg, color: COLORS.text }}
    >
      {/* Global theme (selection, links, placeholders) */}
      <style>{`
        ::selection{background:${COLORS.selectionBg};color:${COLORS.selectionText}}
        a{color:${COLORS.link};text-underline-offset:3px}
        a:hover{color:${COLORS.linkHover}}
        ::placeholder{color:${COLORS.textMuted};opacity:0.6}
        hr{border:0;border-top:1px solid ${COLORS.divider}}
      `}</style>

      {/* Language selector — minimal button (square, hairline border, no shadow) */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium"
            style={{
              backgroundColor: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.text,
            }}
            aria-label="Select language"
            aria-expanded={langMenuOpen}
          >
            <GlobeIcon />
            {lang}
          </button>

          {langMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setLangMenuOpen(false)} />
              <div
                className="absolute right-0 mt-2 w-36 overflow-hidden z-50"
                style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}` }}
              >
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangMenuOpen(false); }}
                    className="w-full px-3 py-2 text-left text-sm transition"
                    style={{ background: lang === l.code ? COLORS.surfaceMuted : "transparent", color: COLORS.text }}
                    onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = COLORS.surfaceMuted; }}
                    onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = "transparent"; }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main column — full height, ~60% width, square, flat */}
      <div className="mx-auto min-h-dvh md:w-[60vw]" style={{ backgroundColor: COLORS.bg }}>
        <div className="w-full px-4 sm:px-6 py-14 sm:py-20">

          {/* Hero — simple badge, square edges, thin border, no shadow */}
          <header className="text-center">
            <div
              className="mx-auto mb-5 inline-flex items-center gap-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{ backgroundColor: COLORS.surface, border: `1px solid ${COLORS.divider}`, color: COLORS.text }}
            >
              {t.badge}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight tracking-tight" style={{ color: COLORS.heading }}>
              {t.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg max-w-prose mx-auto" style={{ color: COLORS.text }}>
              {t.tagline}
            </p>
          </header>

          <hr className="my-10" />

          {/* Features — minimalist list with thin left rule matching an accent */}
{/* Features — each item in its own soft block */}
<section aria-labelledby="features-title" className="space-y-6">
  <h2 id="features-title" className="font-serif text-xl font-semibold">
    {t.featuresTitle}
  </h2>

  <ul className="space-y-4">
    {t.features.map((f, i) => {
      const a = ACCENTS[i % ACCENTS.length];
      return (
        <li
          key={f.title}
          className="p-5"
          style={{
            backgroundColor: COLORS.surface,
            borderLeft: `1px solid ${a.bg}`,
          }}
        >
          <h3
            className="font-medium text-base mb-1"
            style={{ color: COLORS.text }}
          >
            {f.title}
          </h3>
          <p className="text-sm" style={{ color: COLORS.textMuted }}>
            {f.desc}
          </p>
        </li>
      );
    })}
  </ul>
</section>



          <hr className="my-10" />

          {/* Gallery — edge-to-edge images, flat */}
          <section aria-labelledby="gallery-title" className="space-y-4">
            <h2 id="gallery-title" className="font-serif text-xl font-semibold">{t.snapshotsTitle}</h2>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>{t.snapshotsDesc}</p>
            {[1, 2, 3].map((i) => (
              <figure key={i} className="overflow-hidden">
                <img src={`/screenshots/${i}.PNG`} alt="Project screenshot" className="h-56 w-full object-cover sm:h-100" />
              </figure>
            ))}
          </section>

          <hr className="my-10" />

          {/* Team — flat list separated by hairline dividers */}
          <section aria-labelledby="team-title" className="space-y-6">
            <h2 id="team-title" className="font-serif text-xl font-semibold">
              {t.teamTitle}
            </h2>
            <div
              className="p-6"
              style={{
                backgroundColor: COLORS.surface,
              }}
            >
              {t.teamMembers.map((member: any, idx: number) => (
                <article key={idx} className={`flex items-start gap-4 ${idx !== t.teamMembers.length - 1 ? 'mb-6 pb-6 border-b' : ''}`} style={{ borderColor: COLORS.divider }}>
                  <div
                    className="h-12 w-12 grid place-items-center text-sm font-semibold"
                    style={{ backgroundColor: COLORS.surfaceMuted, color: COLORS.textMuted }}
                  >
                    {member.initials}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium" style={{ color: COLORS.text }}>{member.name}</h3>
                    <p className="text-sm" style={{ color: COLORS.textMuted }}>{member.role}</p>
                    <p className="mt-2 text-sm">
                      <a
                        className="inline-flex items-center gap-1 underline underline-offset-4"
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: COLORS.link }}
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                        {t.linkedinLabel}
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <hr className="my-10" />

          {/* Contact — square inputs, 1px borders, flat submit button */}
          <section aria-labelledby="cta-title" className="space-y-4">
            <h2 id="cta-title" className="font-serif text-xl font-semibold">{t.ctaTitle}</h2>
            <p className="text-sm" style={{ color: COLORS.textMuted }}>{t.ctaDesc}</p>
            <form onSubmit={handleSubmit} className="space-y-3 p-0">
              <div className="grid gap-3">
                <label className="text-sm font-medium" htmlFor="name">{t.formName}</label>
                <input
                  id="name"
                  type="text"
                  required
                  className="h-10 px-3 text-sm outline-none transition"
                  style={{ backgroundColor: COLORS.surfaceMuted, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.focus; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = COLORS.border; }}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.formNamePlaceholder}
                />
                <label className="text-sm font-medium" htmlFor="email">{t.formEmail}</label>
                <input
                  id="email"
                  type="email"
                  required
                  className="h-10 px-3 text-sm outline-none transition"
                  style={{ backgroundColor: COLORS.surfaceMuted, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.focus; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = COLORS.border; }}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder={t.formEmailPlaceholder}
                />
                <label className="text-sm font-medium" htmlFor="message">{t.formMessage}</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="px-3 py-2 text-sm outline-none transition"
                  style={{ backgroundColor: COLORS.surfaceMuted, border: `1px solid ${COLORS.border}`, color: COLORS.text }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = COLORS.focus; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = COLORS.border; }}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={t.formMessagePlaceholder}
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition"
                  style={{ backgroundColor: COLORS.heading, color: COLORS.selectionText }}
                >
                  <MailIcon />
                  {t.formSubmit}
                  <ArrowRight />
                </button>
                {sent && (
                  <p role="status" className="text-sm" style={{ color: "#2E7D32" }}>{t.formSent}</p>
                )}
              </div>
              <p className="text-xs" style={{ color: COLORS.textMuted }}>{t.formDisclaimer} {CONTACT_EMAIL}.</p>
            </form>
          </section>

          <hr className="my-10" />

          {/* Footer */}
          <footer className="text-center text-sm" style={{ color: COLORS.textMuted }}>
            <p>
              © {YEAR_CREATED}–{year} {t.title}. {t.footerCopyright}
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}
