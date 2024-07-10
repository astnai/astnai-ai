"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message, useAssistant } from "ai/react";
import { FaArrowUp } from "react-icons/fa";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import logoMeBlack from "./logoMeBlack.png";
import { GeistSans } from "geist/font/sans";

const geistSans = GeistSans;

const predefinedQuestions = [
  "tell me your twitter",
  "who are your idols?",
  "where do you live?",
  "what is your job",
];

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api/assistant" });
  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [animatedMessages, setAnimatedMessages] = useState<Set<string>>(
    new Set()
  );
  const [showCards, setShowCards] = useState(true);

  useEffect(() => {
    setMounted(true);
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);

    setTimeout(() => inputRef.current?.focus(), 0);

    return () => window.removeEventListener("resize", setVH);
  }, []);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setShowLogo(messages.length === 0);
    setShowCards(messages.length === 0);

    const newMessages = messages.filter((m) => !animatedMessages.has(m.id));
    if (newMessages.length > 0) {
      setTimeout(() => {
        setAnimatedMessages((prev) => {
          const newSet = new Set(prev);
          newMessages.forEach((m) => newSet.add(m.id));
          return newSet;
        });
      }, 50);
    }
  }, [status, messages, animatedMessages]);

  const handleCardClick = (question: string) => {
    handleInputChange({
      target: { value: question },
    } as React.ChangeEvent<HTMLInputElement>);
    inputRef.current?.focus();
    setShowCards(false);
  };

  if (!mounted) return null;
  return (
    <div
      className={`${geistSans.className} w-full h-screen flex flex-col items-center justify-center bg-white`}
    >
      <div className="w-full h-full max-w-2xl flex flex-col bg-white overflow-hidden p-4 mb-20 mx-auto relative">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 z-10 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={logoMeBlack}
              alt="Astnai Logo"
              width={100}
              height={100}
            />
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
                  className={`max-w-[80%] break-words p-3 rounded-full ${
                    m.role === "user"
                      ? "bg-neutral-100 text-black"
                      : "bg-transparent text-black"
                  } ${
                    m.role === "assistant" && !animatedMessages.has(m.id)
                      ? "opacity-0"
                      : ""
                  }`}
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
                    {m.content.replace(/【.*?】/g, "")}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-4 mb-36 transition-opacity duration-300 ${
            showCards ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {predefinedQuestions.map((question, index) => (
            <div
              key={index}
              className="bg-neutral-100 rounded-full p-4 cursor-pointer transition-all duration-300 hover:bg-neutral-200 text-center text-sm"
              onClick={() => handleCardClick(question)}
            >
              {question}
            </div>
          ))}
        </div>
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
      </div>
    </div>
  );
}
