export type Language = "ES" | "EN" | "CA";
export type Translations = {
  [K in Language]: {
    badge: string;
    title: string;
    tagline: string;
    description: Record<string, string>;
    carouselTitle?: string;
    carouselItems?: { src: string; alt?: string; caption: string }[];
    featuresTitle: string;
    features: { title: string; desc: string }[];
    snapshotsTitle: string;
    snapshotsDesc: string;
    teamTitle: string;
    teamMembers: { initials: string; name: string; role: string; linkedin: string }[];
    ctaTitle: string;
    ctaDesc: string;
    formName: string;
    formNamePlaceholder: string;
    formEmail: string;
    formEmailPlaceholder: string;
    formMessage: string;
    formMessagePlaceholder: string;
    formSubmit: string;
    formSent: string;
    formDisclaimer: string;
    linkedinLabel: string;
    emailSubject: string;
    emailBody: string;
    footerCopyright: string;
  };
};

export const ACCENTS = [
  { bg: "#d46d29ff", text: "#FFFFFF" },
  { bg: "#A68A64", text: "#1C1C1C" },
  { bg: "#bd9877ff", text: "#1C1C1C" },
  { bg: "#858585ff", text: "#FFFFFF" },
];

export const COLORS = {
  bg: "#F5F4F2",
  outerBg: "#2e2e2eff",
  text: "#2B2B2B",
  textMuted: "#5E5E5E",
  heading: "#3b2d1cff",
  link: "#953e04",
  linkHover: "#8C3F00",
  surface: "#FFFFFF",
  surfaceMuted: "#F0EDEB",
  border: "#515050ff",
  divider: "#C6C2BC",
  shadow: "rgba(0, 0, 0, 0.06)",
  focus: "#E8630A",
  selectionBg: "#E8630A",
  selectionText: "#FFFFFF",
};

export const CONTACT_EMAIL = "nadinaccg@gmail.com";
export const YEAR_CREATED = 2024;
