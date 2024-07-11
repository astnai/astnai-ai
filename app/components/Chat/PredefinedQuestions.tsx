import React from "react";
import { PredefinedQuestion } from "../../types";

interface PredefinedQuestionsProps {
  questions: PredefinedQuestion[];
  showCards: boolean;
  handleCardClick: (question: string) => void;
}

export default function PredefinedQuestions({
  questions,
  showCards,
  handleCardClick,
}: PredefinedQuestionsProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-4 mb-4 w-full max-w-2xl mx-auto px-5 transition-opacity duration-300 ${
        showCards ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {questions.map((question) => (
        <div
          key={question.id}
          className="bg-neutral-100 rounded-full p-4 cursor-pointer transition-all duration-300 hover:bg-neutral-200 text-center text-sm"
          onClick={() => handleCardClick(question.text)}
        >
          {question.text}
        </div>
      ))}
    </div>
  );
}
