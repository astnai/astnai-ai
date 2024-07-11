import { PredefinedQuestion } from "../types";

export const predefinedQuestions: PredefinedQuestion[] = [
  { id: "q1", text: "tell me your twitter" },
  { id: "q2", text: "who are your idols?" },
  { id: "q3", text: "where do you live?" },
  { id: "q4", text: "what is your job" },
];

export function formatMessage(content: string): string {
  return content.replace(/【.*?】/g, "");
}

export function scrollToBottom(element: HTMLElement | null): void {
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
}
