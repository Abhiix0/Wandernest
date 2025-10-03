import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SOSModal from "./SOSModal";

const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut handler (Shift + S)
  useState(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg transition-all duration-300 hover:scale-110 animate-pulse"
            size="icon"
            role="button"
            aria-label="Emergency SOS Button - Press to contact emergency services or share your location"
            tabIndex={0}
          >
            <AlertCircle className="h-7 w-7 text-white" />
            <span className="sr-only">Emergency Help</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-red-600 text-white border-red-700">
          <p className="font-semibold">Emergency Help (Shift + S)</p>
        </TooltipContent>
      </Tooltip>

      <SOSModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

export default SOSButton;
