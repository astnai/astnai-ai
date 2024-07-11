import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full h-full max-w-2xl flex flex-col bg-white overflow-hidden p-4 mb-20 mx-auto relative">
        {children}
      </div>
    </div>
  );
}
