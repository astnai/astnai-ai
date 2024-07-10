"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message, useAssistant } from "ai/react";
import { FaArrowCircleUp } from "react-icons/fa";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import logoMeBlack from "./logoMeBlack.png";
import { GeistSans } from "geist/font/sans";

const geistSans = GeistSans;

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
    setShowLogo(messages.length === 0 && status === "awaiting_message");

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

  if (!mounted) return null;
  return (
    <div
      className={`${geistSans.className} w-full h-screen flex flex-col items-center justify-center bg-white`}
    >
      <div className="w-full h-full max-w-2xl flex flex-col bg-white overflow-hidden p-4 mb-20 mx-auto">
        <div className="flex-1 overflow-hidden flex flex-col relative chat-container">
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
                  className={`${
                    m.role === "user"
                      ? "bg-[#1c1c1c] text-white rounded-full p-2"
                      : "text-[#1c1c1c] rounded-full p-2"
                  } ${
                    m.role === "assistant" && !animatedMessages.has(m.id)
                      ? "opacity-0"
                      : ""
                  } max-w-[80%] break-words`}
                >
                  {m.role === "assistant" ? (
                    <div className="assistant-message">
                      <div className="flex-shrink-0 mr-2">
                        <Image
                          src={logoMeBlack}
                          alt="Astnai"
                          width={24}
                          height={24}
                        />
                      </div>
                      <ReactMarkdown
                        className="inline-block text-sm whitespace-pre-wrap"
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
                  ) : (
                    <ReactMarkdown
                      className="inline-block text-sm whitespace-pre-wrap"
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
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="input-container max-w-2xl mx-auto w-full">
          <form onSubmit={submitMessage} className="relative flex items-center">
            <input
              ref={inputRef}
              disabled={status !== "awaiting_message"}
              className="flex-grow p-2 pr-12 bg-[#1c1c1c] text-white rounded-full focus:outline-none placeholder-white"
              value={input}
              placeholder=""
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={status !== "awaiting_message"}
              className="absolute right-2 p-2 text-white hover:text-neutral-600 focus:outline-none transition-colors duration-200"
            >
              <FaArrowCircleUp className="w-6 h-6" />
            </button>
          </form>
          <p className="text-center text-xs font-mono mt-2 text-black">
            talk to astnai
          </p>
        </div>
      </div>
    </div>
  );
}