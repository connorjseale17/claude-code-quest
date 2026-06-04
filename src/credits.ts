/**
 * Single source of truth for the Claude Code Quest credits. Shown on the
 * very first screen (BootScreen, terminal MOTD style) and the very last
 * screen (CertificationPage, "built by" footer) so the two ends of the
 * experience bookend with the same team list.
 */
export type Credit = { role: string; name: string };

export const CREDITS: Credit[] = [
  { role: 'App Development Lead',    name: 'Connor Seale' },
  { role: 'Curriculum Development',  name: 'Gustavo Tepoz' },
  { role: 'Learning & Engagement',   name: 'Christopher Arana' },
];
