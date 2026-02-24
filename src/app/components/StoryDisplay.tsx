import { useEffect, useRef } from 'react';

interface StoryDisplayProps {
  messages: string[];
}

export function StoryDisplay({ messages }: StoryDisplayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="border-4 border-[#740001] bg-[#f4e8d0] p-4 shadow-[inset_0_0_30px_rgba(116,0,1,0.15)] flex-1 flex flex-col min-h-0">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 text-[8px] leading-relaxed tracking-wide text-[#2d1b00] scrollbar-thin scrollbar-thumb-[#740001] scrollbar-track-[#e4d8c0]"
      >
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`${
              message.startsWith('>') 
                ? 'text-[#740001] font-bold' 
                : message.includes('✨') || message.includes('⚡') || message.includes('💡')
                ? 'text-[#1a472a] font-bold'
                : message.includes('❌') || message.includes('🚫')
                ? 'text-[#8b0002]'
                : message.includes('═══')
                ? 'text-[#740001] font-bold'
                : 'text-[#2d1b00]'
            }`}
          >
            {message || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
}
