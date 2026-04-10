import { QueryProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/components/Home";

export default function Page() {
  return (
    <QueryProvider>
      <TooltipProvider>
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryProvider>
  );
}
