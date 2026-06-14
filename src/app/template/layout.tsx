"use client";

import { useEffect } from "react";
import { acquireCameraStream, releaseCameraStream } from "@/src/lib/camera-stream";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    void acquireCameraStream().catch(() => {});

    return () => {
      releaseCameraStream();
    };
  }, []);

  return children;
}
