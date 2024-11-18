import { useState } from "react";
import { Category } from "@/lib/constants";
import { ChatMessage } from "@/components/ChatMessage";
import { Sidebar } from "@/components/Sidebar";
import { CategorySelector } from "@/components/CategorySelector";
import { MessageInput } from "@/components/MessageInput";
import { INITIAL_MESSAGE } from "@/lib/constants";

interface Message {
  content: string;
  isAi: boolean;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { content: INITIAL_MESSAGE, isAi: true }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const handleSendMessage = (content: string) => {
    // Add user message
    setMessages(prev => [...prev, { content, isAi: false }]);
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        content: `Here are some great recommendations for ${content}...`,
        isAi: true
      }]);
    }, 1000);
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
        
        <MessageInput onSendMessage={handleSendMessage} />
      </main>
    </div>
  );
};

export default Index;