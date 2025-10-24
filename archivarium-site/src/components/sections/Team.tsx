import type { Translations } from "../../theme";

type Props = { t: Translations[keyof Translations] };

export default function Team({ t }: Props) {
  return (
    <section aria-labelledby="team-title" className="space-y-6">
      <h2 id="team-title" className="h2">{t.teamTitle.toUpperCase()}</h2>
      <div className="p-6 card">
        {t.teamMembers.map((member, idx) => (
          <article
            key={idx}
            className={`flex items-start gap-4 ${idx !== t.teamMembers.length - 1 ? 'mb-6 pb-6 border-b' : ''}`}
            style={{ borderColor: "var(--divider)" }}
          >
            <div
              className="h-12 w-12 grid place-items-center text-sm font-semibold"
              style={{ background: "var(--surface-muted)", color: "var(--text-muted)" }}
            >
              {member.initials}
            </div>
            <div className="flex-1">
              <h3 className="font-medium" style={{ color: "var(--text)", fontFamily: "'Ubuntu Sans', sans-serif", fontWeight: 400 }}>
                {member.name.toUpperCase()}
              </h3>
              <p className="text-sm muted">{member.role}</p>
              <p className="mt-2 text-sm">
                <a
                  className="inline-flex items-center gap-1 underline underline-offset-4"
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
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
  );
}
