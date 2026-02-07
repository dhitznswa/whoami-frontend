import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="p-4 md:p-16 max-w-4xl mx-auto">{children}</div>;
}
