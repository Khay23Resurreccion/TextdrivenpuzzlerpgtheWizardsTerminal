import { useState } from 'react';
import { GameMap } from './components/GameMap';
import { CommandInput } from './components/CommandInput';
import { StoryDisplay } from './components/StoryDisplay';
import { Sidebar } from './components/Sidebar';
import { gameData, Room } from './data/gameData';
import { parseCommand } from './utils/commandParser';

interface GameState {
  currentRoom: string;
  inventory: string[];
  roomStates: Record<string, any>;
  sealPower: number;
  puzzlesSolved: string[];
  gameStarted: boolean;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentRoom: 'entrance',
    inventory: [],
    roomStates: {},
    sealPower: 0,
    puzzlesSolved: [],
    gameStarted: false,
  });

  const [messages, setMessages] = useState<string[]>([
    "═══════════════════════════════════════════════════",
    "    THE SEAL OF KNOWLEDGE    ",
    "    A TEXT-DRIVEN PUZZLE RPG    ",
    "═══════════════════════════════════════════════════",
    "",
    "LONG AGO, WITHIN THE ANCIENT HALLS OF A LEGENDARY",
    "WIZARDING ACADEMY, A POWERFUL MAGICAL SEAL WAS",
    "PLACED UPON THE CASTLE'S CORE.",
    "",
    "THE SEAL WAS DESIGNED TO PROTECT THE SCHOOL FROM",
    "DARK FORCES — BUT IT CAN ONLY BE SUSTAINED BY",
    "KNOWLEDGE, LOGIC, AND WIT.",
    "",
    "RECENTLY, THE SEAL HAS BEGUN TO WEAKEN. STRANGE",
    "SHADOWS CREEP THROUGH THE LOWER CORRIDORS.",
    "WHISPERS ECHO IN THE CLOCK TOWER. THE DARK HALL",
    "AT THE CASTLE'S EDGE PULSES WITH UNSTABLE MAGIC.",
    "",
    "TO RESTORE BALANCE, THE HEADMASTER ANNOUNCES A",
    "TRIAL:",
    "",
    '"ONLY ONE WHO CAN THINK CLEARLY UNDER PRESSURE AND',
    'PROVE MASTERY OF MAGICAL KNOWLEDGE MAY REINFORCE',
    'THE SEAL."',
    "",
    "YOU ARE CHOSEN. NOT FOR YOUR STRENGTH. NOT FOR",
    "YOUR SPELLS. BUT FOR YOUR MIND.",
    "",
    "═══════════════════════════════════════════════════",
    "",
    "TYPE 'START' TO BEGIN YOUR JOURNEY..."
  ]);

  const addMessage = (message: string) => {
    setMessages(prev => [...prev, message]);
  };

  const handleCommand = (input: string) => {
    const command = input.toLowerCase().trim();
    
    addMessage(`> ${input.toUpperCase()}`);
    addMessage('');

    // Start game
    if (!gameState.gameStarted && command === 'start') {
      setGameState(prev => ({ ...prev, gameStarted: true }));
      const room = gameData.rooms[gameState.currentRoom];
      addMessage(room.description);
      addMessage('');
      addMessage("TYPE 'HELP' FOR A LIST OF COMMANDS.");
      addMessage('');
      return;
    }

    if (!gameState.gameStarted) {
      addMessage("TYPE 'START' TO BEGIN YOUR JOURNEY.");
      addMessage('');
      return;
    }

    // Parse and execute command
    const result = parseCommand(command, gameState, gameData);
    
    if (result.message) {
      addMessage(result.message.toUpperCase());
      addMessage('');
    }

    if (result.newState) {
      setGameState(result.newState);
      
      // Check for room description on movement
      if (result.newState.currentRoom !== gameState.currentRoom) {
        const newRoom = gameData.rooms[result.newState.currentRoom];
        addMessage(newRoom.description);
        addMessage('');
        
        // Check for puzzle completion
        if (newRoom.puzzle && !result.newState.puzzlesSolved.includes(newRoom.id)) {
          addMessage(`⚡ A MAGICAL PUZZLE BLOCKS YOUR PATH!`);
          addMessage('');
        }
      }

      // Check for game completion
      if (result.newState.sealPower >= 100) {
        addMessage('═══════════════════════════════════════════════════');
        addMessage('    VICTORY!    ');
        addMessage('═══════════════════════════════════════════════════');
        addMessage('');
        addMessage('THE SEAL BLAZES WITH RENEWED POWER! LIGHT FLOODS');
        addMessage('THROUGH THE CASTLE, BANISHING EVERY SHADOW.');
        addMessage('');
        addMessage('THE HEADMASTER APPEARS BEFORE YOU, EYES GLEAMING');
        addMessage('WITH PRIDE.');
        addMessage('');
        addMessage('"YOU HAVE PROVEN YOURSELF WORTHY. NOT THROUGH');
        addMessage('BRUTE FORCE, BUT THROUGH WISDOM, LOGIC, AND');
        addMessage('PERSEVERANCE."');
        addMessage('');
        addMessage('THE MAGICAL SEAL IS RESTORED. THE ACADEMY IS SAFE');
        addMessage('ONCE MORE.');
        addMessage('');
        addMessage('YOU HAVE COMPLETED YOUR TRIAL.');
        addMessage('');
      }
    }
  };

  const currentRoom = gameData.rooms[gameState.currentRoom];

  return (
    <div className="min-h-screen bg-[#1a1410] text-[#d4af37] flex items-center justify-center p-4">
      <div className="w-full max-w-[1400px] aspect-[16/9] border-8 border-[#740001] shadow-[0_0_40px_rgba(116,0,1,0.8)] bg-[#2d1b00] relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 border-4 border-[#d3a625] pointer-events-none"></div>
        
        <div className="relative z-10 h-full flex gap-4 p-4">
          {/* Left Sidebar */}
          <Sidebar 
            gameState={gameState}
            currentRoom={currentRoom}
            gameStarted={gameState.gameStarted}
          />

          {/* Right Content Area */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Map Area */}
            <GameMap 
              currentRoom={currentRoom} 
              gameStarted={gameState.gameStarted}
              playerPosition={currentRoom.mapPosition}
              puzzlesSolved={gameState.puzzlesSolved}
            />

            {/* Story Display */}
            <StoryDisplay messages={messages} />

            {/* Command Input */}
            <CommandInput 
              onCommand={handleCommand} 
              disabled={!gameState.gameStarted && messages.some(m => m.includes('VICTORY'))} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}