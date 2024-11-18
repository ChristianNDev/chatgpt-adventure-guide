import OpenAI from 'openai';
import { Category } from './constants';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPT = `You are a friendly local guide AI assistant. Your goal is to provide helpful recommendations about local places and activities.
You should focus on giving specific, practical advice based on the category selected (if any) and the user's interests.
Keep responses concise but informative, around 2-3 sentences.`;

export const generateAIResponse = async (messages: { content: string; isAi: boolean }[], selectedCategory: Category | null) => {
  console.log('Generating AI response with messages:', messages);
  
  const conversationHistory = messages.map(msg => ({
    role: msg.isAi ? 'assistant' : 'user',
    content: msg.content
  }));

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory
      ],
      model: 'gpt-4',
      temperature: 0.7,
      max_tokens: 150
    });

    console.log('AI response generated:', completion.choices[0]?.message?.content);
    return completion.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to generate response');
  }
};