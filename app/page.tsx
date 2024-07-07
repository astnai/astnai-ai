"use client";

import { Message, useAssistant } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({ api: "/api/assistant" });

  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
    if (messages.length > 0) {
      setShowTitle(false);
    }
  }, [status, messages]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-white">
      <div className="w-full h-full md:max-w-xl md:h-[calc(100vh-4rem)] md:shadow-xl md:rounded-xl flex flex-col bg-white overflow-hidden">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-hidden relative flex flex-col">
            {showTitle && (
              <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 transition-opacity duration-500 opacity-100 py-6 text-center">
                Argento
              </h1>
            )}
            <div
              className={`flex-1 overflow-y-auto px-4 py-6 space-y-4 transition-opacity duration-500 ${
                showTitle ? "opacity-0" : "opacity-100"
              }`}
              ref={chatContainerRef}
            >
              {error != null && (
                <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg shadow-sm">
                  <p className="font-medium">
                    Error: {(error as any).toString()}
                  </p>
                </div>
              )}

              {messages.map((m: Message) => (
                <div
                  key={m.id}
                  className={`p-3 rounded-lg shadow-sm ${
                    m.role === "user"
                      ? "bg-blue-100 ml-auto text-blue-900"
                      : "bg-neutral-100 border border-neutral-200"
                  }`}
                  style={{ maxWidth: "85%" }}
                >
                  <p
                    className={`font-medium ${
                      m.role === "assistant"
                        ? "text-neutral-900"
                        : "text-blue-900"
                    } text-xs mb-1`}
                  >
                    {m.role === "assistant" ? "Argento" : "You"}
                  </p>
                  {m.role !== "data" && (
                    <p className="text-neutral-700 text-sm whitespace-pre-wrap">
                      {m.content}
                    </p>
                  )}
                  {m.role === "data" && (
                    <>
                      <p className="text-neutral-700 text-sm">
                        {(m.data as any).description}
                      </p>
                      <pre className="mt-2 p-2 bg-neutral-50 rounded-lg text-xs overflow-x-auto">
                        {JSON.stringify(m.data, null, 2)}
                      </pre>
                    </>
                  )}
                </div>
              ))}

              {status === "in_progress" && (
                <div className="flex items-center space-x-2 p-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 bg-neutral-50 border-t border-neutral-200">
            <form onSubmit={submitMessage} className="flex space-x-2">
              <input
                ref={inputRef}
                disabled={status !== "awaiting_message"}
                className="flex-1 p-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow duration-200"
                value={input}
                placeholder="Ask about Argentina..."
                onChange={handleInputChange}
              />
              <button
                type="submit"
                disabled={status !== "awaiting_message"}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
