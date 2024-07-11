"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Message } from "ai";
import useChat from "../../hooks/useChat";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import PredefinedQuestions from "./PredefinedQuestions";
import Layout from "../Layout/Layout";
import { scrollToBottom } from "../../utils/helpers";
import { predefinedQuestions } from "../../utils/helpers";
import logoMeBlack from "../../public/logoMeBlack.png";

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useChat();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showLogo, setShowLogo] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [animatedMessages, setAnimatedMessages] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    scrollToBottom(chatContainerRef.current);
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

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-grow overflow-hidden relative">
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
            className={`h-full overflow-y-auto space-y-6 transition-opacity duration-500 px-4 ${
              showLogo ? "opacity-0" : "opacity-100"
            }`}
            ref={chatContainerRef}
          >
            {messages.map((m: Message) => (
              <ChatMessage
                key={m.id}
                message={m}
                isAnimated={animatedMessages.has(m.id)}
              />
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <PredefinedQuestions
            questions={predefinedQuestions}
            showCards={showCards}
            handleCardClick={(question: string) => {
              handleInputChange({
                target: { value: question },
              } as React.ChangeEvent<HTMLInputElement>);
              setShowCards(false);
            }}
          />
          <ChatInput
            status={status}
            input={input}
            handleInputChange={handleInputChange}
            submitMessage={submitMessage}
          />
        </div>
      </div>
    </Layout>
  );
}
