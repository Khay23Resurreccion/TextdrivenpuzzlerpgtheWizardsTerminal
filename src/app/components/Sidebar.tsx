interface SidebarProps {
  gameState: any;
  currentRoom: any;
  gameStarted: boolean;
}

export function Sidebar({ gameState, currentRoom, gameStarted }: SidebarProps) {
  return (
    <div className="w-72 flex flex-col gap-4">
      {/* Title Box */}
      <div className="border-4 border-[#740001] bg-[#0f0a08] p-3 shadow-[inset_0_0_20px_rgba(212,175,55,0.1)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-2xl">🏰</div>
          <div className="text-[#d4af37] text-[10px] leading-tight tracking-wide">
            THE SEAL OF KNOWLEDGE
          </div>
        </div>
        <div className="text-[#d4af37] text-[7px] leading-relaxed tracking-wide space-y-1">
          <div>A WIZARDING ACADEMY ADVENTURE</div>
          <div>RESTORE THE MAGICAL SEAL</div>
          <div className="mt-2 space-y-0.5">
            <div>1. EXPLORE THE CASTLE</div>
            <div>2. SOLVE ANCIENT PUZZLES</div>
            <div>3. RESTORE THE SEAL</div>
            <div>4. SAVE THE ACADEMY</div>
          </div>
        </div>
      </div>

      {/* House Colors Selector */}
      <div className="border-4 border-[#740001] bg-[#0f0a08] p-3">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button className="bg-[#740001] text-[#d3a625] py-2 text-[8px] border-2 border-[#d3a625] hover:bg-[#8b0002] transition-colors">
            GRYFFINDOR
          </button>
          <button className="bg-[#1a472a] text-[#aaaaaa] py-2 text-[8px] border-2 border-[#aaaaaa] hover:bg-[#2a5a3a] transition-colors">
            SLYTHERIN
          </button>
          <button className="bg-[#0e1a40] text-[#946b2d] py-2 text-[8px] border-2 border-[#946b2d] hover:bg-[#1e2a50] transition-colors">
            RAVENCLAW
          </button>
          <button className="bg-[#f0c75e] text-[#000000] py-2 text-[8px] border-2 border-[#000000] hover:bg-[#e0b74e] transition-colors">
            HUFFLEPUFF
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-6 bg-gradient-to-r from-[#740001] via-[#d3a625] to-[#946b2d] relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-[8px] text-white font-bold tracking-wider">
              SEAL POWER
            </div>
          </div>
          <div className="h-8 bg-[#1a1410] border-2 border-[#740001] relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#d3a625] to-[#f0c75e] transition-all duration-500"
              style={{ width: `${gameState.sealPower}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-[#2d1b00] font-bold tracking-wider z-10 mix-blend-difference">
              {gameState.sealPower}%
            </div>
          </div>
        </div>
      </div>

      {/* Timer Box */}
      <div className="border-4 border-[#740001] bg-[#0f0a08] p-3 flex items-center justify-between">
        <button className="w-10 h-10 bg-[#740001] text-[#d3a625] flex items-center justify-center text-xl border-2 border-[#d3a625] hover:bg-[#8b0002] transition-colors">
          ◀
        </button>
        <div className="flex-1 text-center text-[#d4af37] text-lg tracking-wider">
          {gameState.puzzlesSolved.length} : {4 - gameState.puzzlesSolved.length}
        </div>
        <button className="w-10 h-10 bg-[#740001] text-[#d3a625] flex items-center justify-center text-xl border-2 border-[#d3a625] hover:bg-[#8b0002] transition-colors">
          ▶
        </button>
      </div>

      {/* Control Buttons */}
      <div className="border-4 border-[#740001] bg-[#0f0a08] grid grid-cols-3 overflow-hidden">
        <button className="h-16 bg-[#d3a625] hover:bg-[#e3b635] transition-colors flex items-center justify-center text-2xl border-r-2 border-[#740001]">
          ▶
        </button>
        <button className="h-16 bg-[#946b2d] hover:bg-[#a47b3d] transition-colors flex items-center justify-center text-2xl border-r-2 border-[#740001]">
          ⏸
        </button>
        <button className="h-16 bg-[#740001] hover:bg-[#8b0002] transition-colors flex items-center justify-center text-2xl text-[#d3a625]">
          ⏹
        </button>
      </div>

      {/* Stats */}
      <div className="border-4 border-[#740001] bg-[#0f0a08] p-3 text-[8px] space-y-1">
        <div className="text-[#d4af37]">
          <span className="text-[#d3a625]">LOCATION:</span> {gameStarted ? currentRoom.name.toUpperCase() : 'NOT STARTED'}
        </div>
        <div className="text-[#d4af37]">
          <span className="text-[#d3a625]">PUZZLES:</span> {gameState.puzzlesSolved.length} / 4
        </div>
        <div className="text-[#d4af37]">
          <span className="text-[#d3a625]">INVENTORY:</span> {gameState.inventory.length} ITEMS
        </div>
      </div>
    </div>
  );
}
