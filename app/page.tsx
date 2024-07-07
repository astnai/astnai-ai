"use client";

import { Message, useAssistant } from "ai/react";
import { useEffect, useRef } from "react";
import { FaPaperPlane, FaStop } from "react-icons/fa";

export default function Chat() {
  const {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    error,
    stop,
  } = useAssistant({ api: "/api/assistant" });

  const inputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
    chatContainerRef.current?.scrollTo(
      0,
      chatContainerRef.current.scrollHeight
    );
  }, [status, messages]);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center h-[calc(100vh-4rem)] sm:h-[calc(100vh-6rem)]">
      <div className="w-full bg-white rounded-xl shadow-lg flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden p-6 bg-white">
          <div
            className="h-full overflow-y-auto pr-4 space-y-6"
            ref={chatContainerRef}
          >
            {error != null && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg shadow-sm">
                <p className="font-medium">
                  Error: {(error as any).toString()}
                </p>
              </div>
            )}

            {messages.map((m: Message) => (
              <div
                key={m.id}
                className={`p-4 rounded-lg shadow-sm ${
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
                  } text-sm mb-2`}
                >
                  {m.role === "assistant" ? "Argento" : "You"}
                </p>
                {m.role !== "data" && (
                  <p className="text-neutral-700 whitespace-pre-wrap">
                    {m.content}
                  </p>
                )}
                {m.role === "data" && (
                  <>
                    <p className="text-neutral-700">
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

        <div className="p-6 bg-neutral-50 border-t border-neutral-200">
          <form onSubmit={submitMessage} className="flex space-x-2">
            <input
              ref={inputRef}
              disabled={status !== "awaiting_message"}
              className="flex-1 p-4 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-shadow duration-200"
              value={input}
              placeholder="Ask about Argentina..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={status !== "awaiting_message"}
              className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50"
            >
              <FaPaperPlane className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={stop}
              className="p-4 bg-neutral-200 text-neutral-600 rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400 transition-colors duration-200"
            >
              <FaStop className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
