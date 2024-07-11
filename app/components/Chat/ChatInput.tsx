import React, { useRef, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

interface ChatInputProps {
  status: string;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitMessage: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ChatInput({
  status,
  input,
  handleInputChange,
  submitMessage,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-5">
      <form
        onSubmit={submitMessage}
        className="relative flex items-center w-full max-w-2xl mx-auto"
      >
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="flex-grow p-3 bg-neutral-100 text-black rounded-full placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-transparent"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          disabled={status !== "awaiting_message"}
          className="absolute right-2 p-2 bg-black text-white rounded-full hover:bg-neutral-800"
        >
          <FaArrowUp className="w-4 h-4" />
        </button>
      </form>
      <p className="text-center text-xs mt-4 text-neutral-400">
        astnai provides information about{" "}
        <a
          href="https://agustinarias.com"
          className="underline hover:text-black transition-colors duration-300"
        >
          agustin arias
        </a>
        .
      </p>
    </div>
  );
}
