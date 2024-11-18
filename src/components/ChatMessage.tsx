import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isAi?: boolean;
}

export const ChatMessage = ({ content, isAi = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "py-8 px-4 flex items-start gap-4 animate-in fade-in-0 slide-in-from-bottom-4",
        isAi ? "bg-gray-50" : "bg-white"
      )}
    >
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isAi ? "bg-primary text-white" : "bg-gray-200"
        )}
      >
        {isAi ? "AI" : "U"}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-gray-800 leading-relaxed">{content}</p>
      </div>
    </div>
  );
};