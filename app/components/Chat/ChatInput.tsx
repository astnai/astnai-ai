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
    <div className="bg-white w-full max-w-2xl mx-auto chat-input-container">
      <form
        onSubmit={submitMessage}
        className="relative flex items-center w-full"
      >
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="flex-grow p-3 bg-neutral-100 text-black rounded-2xl placeholder-neutral-400 transition-all duration-300 focus:outline-none focus:ring-0 focus:border-transparent w-full"
          value={input}
          placeholder="message astnai"
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
      <p className="text-center text-xs mb-2.5 mt-2 text-neutral-400 footer-text">
        astnai provides information about{" "}
        <a
          href="https://agustinarias.com"
          className="underline hover:text-black transition-colors duration-300"
        >
          agustín arias
        </a>
        .
      </p>
    </div>
  );
}
