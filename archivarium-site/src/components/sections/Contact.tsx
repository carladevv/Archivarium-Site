import React, { useState } from "react";
import { CONTACT_EMAIL, type Translations } from "../../theme";

const MailIcon = () => (
  <svg aria-hidden className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
    <path d="M2 6a2 2 0 012-2h16a2 2 0 012 2v.511l-10 5.5-10-5.5V6zm0 2.236v9.764A2 2 0 004 20h16a2 2 0 002-2V8.236l-9.445 5.195a2 2 0 01-2.11 0L2 8.236z" />
  </svg>
);
const ArrowRight = () => (
  <svg aria-hidden className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--text)" }}>
    <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
  </svg>
);

type Props = { t: Translations[keyof Translations] };

export default function Contact({ t }: Props) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.emailSubject} ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${t.emailBody.replace("Nombre:", form.name).replace("Correo electrónico:", form.email).replace("Mensaje:", form.message)}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section aria-labelledby="cta-title" className="space-y-4">
      <h2 id="cta-title" className="h2">{t.ctaTitle.toUpperCase()}</h2>
      <p className="text-sm muted">{t.ctaDesc}</p>

      <form onSubmit={handleSubmit} className="space-y-3 p-0">
        <div className="grid gap-3">
          <label className="label" htmlFor="name">{t.formName}</label>
          <input
            id="name"
            type="text"
            required
            className="h-10 px-3 text-sm input"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t.formNamePlaceholder}
          />

          <label className="label" htmlFor="email">{t.formEmail}</label>
          <input
            id="email"
            type="email"
            required
            className="h-10 px-3 text-sm input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder={t.formEmailPlaceholder}
          />

          <label className="label" htmlFor="message">{t.formMessage}</label>
          <textarea
            id="message"
            required
            rows={5}
            className="px-3 py-2 text-sm textarea"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder={t.formMessagePlaceholder}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <button type="submit" className="btn-primary">
            <MailIcon />
            {t.formSubmit}
            <ArrowRight />
          </button>
          {sent && <p role="status" className="text-sm" style={{ color: "#2E7D32" }}>{t.formSent}</p>}
        </div>

        <p className="text-xs muted">{t.formDisclaimer} {CONTACT_EMAIL}.</p>
      </form>
    </section>
  );
}
