import { useState } from "react";
import { Category } from "@/lib/constants";
import { ChatMessage } from "@/components/ChatMessage";
import { Sidebar } from "@/components/Sidebar";
import { CategorySelector } from "@/components/CategorySelector";
import { MessageInput } from "@/components/MessageInput";
import { INITIAL_MESSAGE } from "@/lib/constants";
import { generateAIResponse } from "@/lib/chat-service";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  content: string;
  isAi: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: INITIAL_MESSAGE, isAi: true }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
    try {
      // Add user message
      setMessages(prev => [...prev, { content, isAi: false }]);
      setIsLoading(true);
      
      // Generate AI response
      const aiResponse = await generateAIResponse([...messages, { content, isAi: false }], selectedCategory);
      
      // Add AI response
      setMessages(prev => [...prev, { content: aiResponse, isAi: true }]);
    } catch (error) {
      console.error('Error in chat:', error);
      toast({
        title: "Error",
        description: "Failed to generate response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto pt-4">
            <CategorySelector
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <div className="divide-y divide-gray-100">
              {messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  content={message.content}
                  isAi={message.isAi}
                />
              ))}
            </div>
          </div>
        </div>
        
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;