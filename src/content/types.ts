export type LessonContent = {
  roomId: string;
  intro: string;
  prompt: string;
  choices: { id: string; label: string; correct: boolean }[];
  passFeedback: string;
  failFeedback: string;
  lore: { id: string; text: string }[];
  practice?: PracticeContent;
  /** Keyed by NPC id. Each NPC's structured lesson, if authored. */
  conversations?: Record<string, NPCConversation>;
  /** Boss battle at the level's challenge chamber. Replaces ChallengeTerminal when present. */
  battle?: BossBattle;
};

export type BossBattle = {
  /** Display name, e.g. "Sloppy the Glob". */
  name: string;
  /** Base sprite key — frames are `${spriteKey}_idle_1/2`, `_attack`, `_hurt`, `_defeat`. */
  spriteKey: string;
  /** Boss hearts. */
  maxHP: number;
  /** Player hearts. Defaults to 5. */
  playerHP?: number;
  /** Optional HP threshold phases (1 = no phase change). Default 1. */
  phases?: number;
  introLine: string;
  /** Random taunts on wrong answers / phase transitions. */
  tauntLines: string[];
  victoryLine: string;
  questions: BattleQuestion[];
  /** Optional real-image art. When set, BossSprite renders an <img> (with CSS
   *  state effects) instead of the palette-grid sprite. Drop a PNG at
   *  public/sprites/bosses/<name>.png and set src: '/sprites/bosses/<name>.png'. */
  art?: { src: string; width?: number };
};

export type BattleQuestion = {
  prompt: string;
  choices: { id: string; label: string; correct: boolean }[];
  passFeedback: string;
  failFeedback: string;
};

export type PracticeContent = {
  id: string;
  template: string;
  blanks: { id: string; suggestions: string[] }[];
  prize: { id: string; label: string };
};

export type NPCConversation = {
  beats: ConversationBeat[];
  /** Shown when player re-interacts and picks "just the summary." 1-2 sentences. */
  summary: string;
};

export type ConversationBeat =
  | { kind: 'say'; text: string }
  | { kind: 'choice'; prompt: string; options: ConversationChoice[] }
  | { kind: 'blank'; prompt: string; template: string; blanks: BlankSpec[]; followup: string };

export type ConversationChoice = {
  id: string;
  label: string;
  correct: boolean;
  /** NPC's response after the player picks this. Shown before advancing. */
  reaction: string;
};

export type BlankSpec = { id: string; suggestions: string[] };
