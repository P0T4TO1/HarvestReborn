"use client";

import { CircularProgress } from "@nextui-org/react";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress size="lg" label="Cargando..." />
    </div>
  );
};
