import { Shield, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface VerifiedBadgeProps {
  source?: string;
  variant?: "shield" | "check";
  size?: "sm" | "md";
  className?: string;
}

export const VerifiedBadge = ({ 
  source = "trusted APIs", 
  variant = "shield",
  size = "sm",
  className = ""
}: VerifiedBadgeProps) => {
  const Icon = variant === "shield" ? Shield : Check;
  const sizeClasses = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 ${className}`}
            aria-label="Verified information"
          >
            <Icon className={sizeClasses} />
            <span className="text-xs font-medium">Verified</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">
            This information is verified and sourced from {source}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface VerificationSourceProps {
  source: string;
  className?: string;
}

export const VerificationSource = ({ source, className = "" }: VerificationSourceProps) => {
  return (
    <p className={`text-xs text-muted-foreground italic ${className}`}>
      Source: {source}
    </p>
  );
};
