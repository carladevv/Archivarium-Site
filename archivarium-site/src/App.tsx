import { useMemo, useState } from "react";
import translations from "./translations.json";
import BackgroundMosaic from "./components/layout/BackgroundMosaic";
import LanguageMenu from "./components/layout/LanguageMenu";
import Hero from "./components/sections/Hero";
import Description from "./components/sections/Description";
import Carousel from "./components/sections/Carousel";
import Features from "./components/sections/Features";
import Gallery from "./components/sections/Gallery";
import Team from "./components/sections/Team";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { COLORS, type Language, type Translations, YEAR_CREATED } from "./theme";

export default function App() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lang, setLang] = useState<Language>("ES");

  const t = (translations as Translations)[lang];

  return (
    <main
      className="min-h-dvh antialiased relative"
      style={{ backgroundColor: COLORS.outerBg, color: COLORS.text }}
    >
      <BackgroundMosaic />

      {/* —— Global + unified styles */}
      <style>{`
        /* Theme tokens */
        :root{
          --bg:${COLORS.bg};
          --outer-bg:${COLORS.outerBg};
          --text:${COLORS.text};
          --text-muted:${COLORS.textMuted};
          --heading:${COLORS.heading};
          --link:${COLORS.link};
          --link-hover:${COLORS.linkHover};
          --surface:${COLORS.surface};
          --surface-muted:${COLORS.surfaceMuted};
          --border:${COLORS.border};
          --divider:${COLORS.divider};
          --shadow:${COLORS.shadow};
          --focus:${COLORS.focus};
          --sel-bg:${COLORS.selectionBg};
          --sel-text:${COLORS.selectionText};
        }

        /* Global primitives */
        ::selection{background:var(--sel-bg);color:var(--sel-text)}
        a{color:var(--link);text-underline-offset:3px}
        a:hover{color:var(--link-hover)}
        ::placeholder{color:var(--text-muted);opacity:0.6}
        hr{border:0;border-top:1px solid var(--divider)}

        /* Reusable text styles */
        .h1{
          color:var(--heading);
          font-family:'Ubuntu Sans',sans-serif;
          font-weight:800;
          line-height:1.1;
          letter-spacing:.02em;
          text-transform:uppercase;
        }
        .h2{
          font-family:'Ubuntu Sans',sans-serif;
          font-weight:600;
          font-size:1.25rem; /* ~text-xl */
          color:var(--text);
          text-transform:uppercase;
        }
        .label{
          font-family:'Ubuntu Sans',sans-serif;
          font-weight:600;
          font-size:.875rem; /* text-sm */
          color:var(--text);
        }
        .muted{ color:var(--text-muted); }

        /* Components */
        .badge{
          background:var(--surface);
          border:1px solid var(--divider);
          color:var(--text);
          font-family:'Ubuntu Sans',sans-serif;
          font-weight:600;
          text-transform:uppercase;
          letter-spacing:.12em;
          font-size:11px;
          padding:.25rem .5rem;
          display:inline-flex;
          align-items:center;
          gap:.5rem;
        }
        .btn-primary{
          background:var(--heading);
          color:var(--sel-text);
          display:inline-flex;
          align-items:center;
          gap:.5rem;
          font-weight:600;
          font-size:.875rem;
          padding:.5rem 1rem;
        }
        .input, .textarea{
          background:var(--surface-muted);
          border:1px solid var(--border);
          color:var(--text);
          outline:none;
          transition:border-color .15s ease;
        }
        .input:focus, .textarea:focus{ border-color:var(--focus); }

        /* Containers */
        .main-col{ background:var(--bg); }
        .card{ background:var(--surface); }
        .section{ margin-block:2.5rem; } /* ~my-10 */
      `}</style>

      {/* Language selector */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageMenu lang={lang} onChange={setLang} />
      </div>

      {/* Main column */}
      <div className="mx-auto min-h-dvh md:w-[60vw] relative z-10 main-col">
        <div className="w-full px-4 sm:px-6 py-14 sm:py-10">

          <Hero t={t} />

          <hr className="my-10" />
          <Description t={t} />

          <hr className="my-10" />
          <Carousel t={t} />

          <hr className="my-10" />
            <Features t={t} />

          <hr className="my-10" />
          <Gallery t={t} />

          <hr className="my-10" />
          <Team t={t} />

          <hr className="my-10" />
          <Contact t={t} />

          <hr className="my-10" />
          <Footer t={t} startYear={YEAR_CREATED} currentYear={year} />
        </div>
      </div>
    </main>
  );
}
