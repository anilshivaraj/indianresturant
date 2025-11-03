"use client";

import React from "react";
import CartBar from "@/components/CartBar";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CartBar />
    </>
  );
}


