"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SavedToast({ message = "Salvo com sucesso!" }: { message?: string }) {
  const params = useSearchParams();
  useEffect(() => {
    if (params.get("saved") === "1") {
      toast.success(message);
    }
  }, [params, message]);
  return null;
}
