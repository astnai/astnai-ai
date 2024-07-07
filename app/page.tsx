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
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    setShowTitle(messages.length === 0);
  }, [status, messages]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full h-full md:max-w-2xl md:h-[calc(100vh-2rem)] md:shadow-2xl md:rounded-3xl flex flex-col bg-white overflow-hidden">
        <div className="flex-1 overflow-hidden flex flex-col relative">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 transition-all duration-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              showTitle ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            Argento
          </h1>
          <div
            className={`flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6 transition-opacity duration-500 ${
              showTitle ? "opacity-0" : "opacity-100"
            }`}
            ref={chatContainerRef}
          >
            {error && (
              <div className="p-3 sm:p-4 bg-red-50 text-red-700 text-xs sm:text-sm rounded-full shadow-md">
                <p className="font-medium">Error: {error.toString()}</p>
              </div>
            )}

            {messages.map((m: Message) => (
              <div
                key={m.id}
                className={`p-3 sm:p-4 rounded-full shadow-md ${
                  m.role === "user"
                    ? "bg-gray-200 ml-auto text-gray-900"
                    : "bg-gray-100 border border-gray-200"
                }`}
                style={{ maxWidth: "85%" }}
              >
                <p
                  className={`font-medium ${
                    m.role === "assistant" ? "text-gray-700" : "text-gray-800"
                  } text-xs mb-1 sm:mb-2`}
                >
                  {m.role === "assistant" ? "Argento" : "You"}
                </p>
                {m.role !== "data" ? (
                  <p className="text-gray-700 text-xs sm:text-sm whitespace-pre-wrap">
                    {m.content}
                  </p>
                ) : (
                  <>
                    <p className="text-gray-700 text-xs sm:text-sm">
                      {(m.data as any).description}
                    </p>
                    <pre className="mt-2 sm:mt-3 p-2 sm:p-3 bg-gray-50 rounded-xl text-xs overflow-x-auto">
                      {JSON.stringify(m.data, null, 2)}
                    </pre>
                  </>
                )}
              </div>
            ))}

            {status === "in_progress" && (
              <div className="flex items-center space-x-2 p-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
          <form
            onSubmit={submitMessage}
            className="flex space-x-2 sm:space-x-3"
          >
            <input
              ref={inputRef}
              disabled={status !== "awaiting_message"}
              className="flex-1 p-3 sm:p-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 text-xs sm:text-sm transition-shadow duration-200"
              value={input}
              placeholder="Ask about Argentina..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={status !== "awaiting_message"}
              className="p-3 sm:p-4 bg-gray-800 text-white rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200 disabled:opacity-50"
            >
              <FaPaperPlane className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
