import { useState, useEffect } from "react";
import { useAssistant } from "ai/react";

export default function useChat() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: "/api" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setVH();
    window.addEventListener("resize", setVH);

    return () => window.removeEventListener("resize", setVH);
  }, []);

  return {
    status,
    messages,
    input,
    submitMessage,
    handleInputChange,
    mounted,
  };
}
