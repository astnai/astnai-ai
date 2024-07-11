import React, { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    function setVH() {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // Set the value on initial load
    setVH();

    // Update the value on resize
    window.addEventListener("resize", setVH);

    // Clean up
    return () => window.removeEventListener("resize", setVH);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full h-full max-w-2xl flex flex-col bg-white overflow-hidden mx-auto relative layout-container">
        {children}
      </div>
    </div>
  );
}
