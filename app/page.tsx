"use client";

import { Message, useAssistant } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { useTheme } from "next-themes";
import ReactMarkdown from "react-markdown";
import logoMeBlack from "./logoMeBlack.png";
import logoMeWhite from "./logoMeWhite.png";

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({ api: "/api/assistant" });

  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setShowLogo(messages.length === 0 && status === "awaiting_message");
  }, [status, messages]);

  if (!mounted) return null;

  const logoSrc = theme === "dark" ? logoMeWhite : logoMeBlack;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="w-full h-full max-w-xl flex flex-col bg-white dark:bg-black overflow-hidden p-4">
        <div className="flex-1 overflow-hidden flex flex-col relative">
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-10 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={logoSrc} alt="Astnai Logo" width={100} height={100} />
          </div>
          <div
            className={`flex-1 overflow-y-auto space-y-6 transition-opacity duration-500 ${
              showLogo ? "opacity-0" : "opacity-100"
            }`}
            ref={chatContainerRef}
          >
            {messages.map((m: Message) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`${
                    m.role === "user"
                      ? "bg-gray-100 dark:bg-[#2c2c2c] text-black dark:text-white rounded-full"
                      : "text-black dark:text-white flex items-start rounded-full"
                  }`}
                  style={{ maxWidth: "100%" }}
                >
                  {m.role === "assistant" && (
                    <div className="flex-shrink-0 mt-1 mr-2">
                      <Image
                        src={logoSrc}
                        alt="Astnai"
                        width={24}
                        height={24}
                      />
                    </div>
                  )}
                  <ReactMarkdown
                    className="inline-block text-sm whitespace-pre-wrap p-3"
                    components={{
                      a: ({ node, ...props }) => (
                        <a
                          {...props}
                          className="text-blue-500 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      ),
                    }}
                  >
                    {m.content.replace(/【.*?】/g, "")}
                  </ReactMarkdown>
                </div>
              </div>
            ))}

            {status === "in_progress" && (
              <div className="flex items-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 pt-4">
          <form onSubmit={submitMessage} className="relative">
            <input
              ref={inputRef}
              disabled={status !== "awaiting_message"}
              className="w-full p-4 bg-gray-100 dark:bg-[#2c2c2c] text-black dark:text-white rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 text-sm transition-shadow duration-200"
              value={input}
              placeholder="Type your message..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={status !== "awaiting_message"}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 focus:outline-none transition-colors duration-200"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
          </form>
          <p className="text-center text-xs font-mono mt-4 text-gray-500 dark:text-gray-400">
            astnai may make mistakes, don't take the answers seriously
          </p>
        </div>
      </div>
    </div>
  );
}
