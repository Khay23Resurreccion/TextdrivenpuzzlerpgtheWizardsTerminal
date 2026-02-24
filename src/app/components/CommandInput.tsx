import { useState, useRef, useEffect } from 'react';

interface CommandInputProps {
  onCommand: (command: string) => void;
  disabled: boolean;
}

export function CommandInput({ onCommand, disabled }: CommandInputProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onCommand(input);
      setHistory(prev => [...prev, input]);
      setHistoryIndex(-1);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  return (
    <div className="border-4 border-[#740001] bg-[#0f0a08] p-3">
      <form onSubmit={handleSubmit} className="flex gap-2 items-stretch">
        <div className="flex-1 relative border-2 border-[#740001] bg-[#1a1410]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d3a625] text-[10px]">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            className="w-full bg-transparent px-3 py-2 pl-8 text-[#d4af37] text-[10px] tracking-wider focus:outline-none focus:ring-2 focus:ring-[#d3a625] disabled:opacity-50 uppercase"
            placeholder="ENTER COMMAND..."
            autoComplete="off"
            style={{ fontFamily: 'Press Start 2P, cursive' }}
          />
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="bg-[#740001] hover:bg-[#8b0002] disabled:bg-[#3a3a3a] disabled:cursor-not-allowed px-6 text-[#d3a625] text-[8px] tracking-wider transition-colors border-2 border-[#d3a625] min-w-[100px]"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
}
