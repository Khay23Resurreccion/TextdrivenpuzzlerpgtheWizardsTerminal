interface StatusBarProps {
  sealPower: number;
  inventory: string[];
  puzzlesSolved: number;
  totalPuzzles: number;
}

export function StatusBar({ sealPower, inventory, puzzlesSolved, totalPuzzles }: StatusBarProps) {
  return (
    <div className="bg-slate-950 border-b-2 border-purple-500/50 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏰</div>
            <div>
              <h1 className="text-xl font-bold text-purple-300">The Seal of Knowledge</h1>
              <p className="text-xs text-slate-400">A Text-Driven Puzzle RPG</p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6">
            {/* Seal Power */}
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>⚡</span>
                <span>Seal Power</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-32 h-3 bg-slate-800 rounded-full overflow-hidden border border-purple-500/30">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-cyan-400 transition-all duration-500 ease-out"
                    style={{ width: `${sealPower}%` }}
                  />
                </div>
                <span className="text-sm font-mono font-semibold text-purple-300">{sealPower}%</span>
              </div>
            </div>

            {/* Puzzles */}
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>🧩</span>
                <span>Puzzles</span>
              </div>
              <div className="text-sm font-mono font-semibold text-cyan-300">
                {puzzlesSolved} / {totalPuzzles}
              </div>
            </div>

            {/* Inventory */}
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <span>🎒</span>
                <span>Items</span>
              </div>
              <div className="text-sm font-mono font-semibold text-yellow-300">
                {inventory.length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
