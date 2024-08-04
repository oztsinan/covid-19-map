"use client";

import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export const Spinner = ({ className }: { className?: string }) => {
  return <Loader2Icon className={cn("animate-spin", className)} />;
};
