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
