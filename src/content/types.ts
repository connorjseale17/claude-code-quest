export type LessonContent = {
  roomId: string;
  intro: string;
  prompt: string;
  choices: { id: string; label: string; correct: boolean }[];
  passFeedback: string;
  failFeedback: string;
  lore: { id: string; text: string }[];
  practice?: PracticeContent;
};

export type PracticeContent = {
  id: string;
  template: string;
  blanks: { id: string; suggestions: string[] }[];
  prize: { id: string; label: string };
};
