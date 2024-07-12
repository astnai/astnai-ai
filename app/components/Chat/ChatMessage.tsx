import React from "react";
import { Message } from "ai";
import ReactMarkdown from "react-markdown";
import { formatMessage } from "../../utils/helpers";

interface ChatMessageProps {
  message: Message;
  isAnimated: boolean;
}

export default function ChatMessage({ message, isAnimated }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] break-words p-3 mt-8 rounded-3xl ${
          message.role === "user"
            ? "bg-neutral-100 text-black ml-auto mr-2"
            : "bg-transparent text-black mr-auto ml-2"
        } ${message.role === "assistant" && !isAnimated ? "opacity-0" : ""}`}
      >
        <ReactMarkdown
          className="inline-block text-sm whitespace-pre-wrap"
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                className="text-black underline hover:text-black transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              />
            ),
          }}
        >
          {formatMessage(message.content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
