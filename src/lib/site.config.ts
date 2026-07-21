/**
 * Central site configuration.
 * Edit this file to personalize the portfolio — name, bio, and social links.
 */
export const siteConfig = {
  name: "Oliver Donald",
  title: "Oliver Donald — Data Analytics, Biology, Philosophy, Wildlife Photography",
  tagline: "Data Analytics • Biology • Philosophy • Wildlife Photography",
  description:
    "Portfolio of Oliver Donald: data analytics projects, essays on biology and philosophy, and wildlife photography.",
  url: "https://example.com",
  intro:
    "I work at the intersection of data, life sciences, and ideas — building analytics tools, writing about biology and philosophy, and photographing wildlife in the field.",
  social: {
    github: "https://github.com/oliverdonald",
    linkedin: "https://www.linkedin.com/in/oliverdonald",
    email: "hello@example.com",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/essays", label: "Essays" },
    { href: "/photography", label: "Photography" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
