import { Message } from "ai";

export interface ChatProps {
  status: string;
  messages: Message[];
  input: string;
  submitMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PredefinedQuestion {
  id: string;
  text: string;
}
