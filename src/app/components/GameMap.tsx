import { Room } from '../data/gameData';

interface GameMapProps {
  currentRoom: Room;
  gameStarted: boolean;
  playerPosition: { x: number; y: number };
  puzzlesSolved: string[];
}

const TILE_SIZE = 64;
const MAP_WIDTH = 5;
const MAP_HEIGHT = 4;

const ROOM_TILES: Record<string, { icon: string; color: string; name: string }> = {
  entrance: { icon: '🏰', color: 'bg-[#946b2d]', name: 'ENTRANCE' },
  corridor: { icon: '📜', color: 'bg-[#5d4e37]', name: 'CORRIDOR' },
  library: { icon: '📚', color: 'bg-[#0e1a40]', name: 'LIBRARY' },
  clocktower: { icon: '🕐', color: 'bg-[#4a4a4a]', name: 'CLOCK TOWER' },
  observatory: { icon: '⭐', color: 'bg-[#1a1a40]', name: 'OBSERVATORY' },
  dungeons: { icon: '🕯️', color: 'bg-[#1a472a]', name: 'DUNGEONS' },
  darkhall: { icon: '🌑', color: 'bg-[#2a0a0a]', name: 'DARK HALL' },
};

export function GameMap({ currentRoom, gameStarted, playerPosition, puzzlesSolved }: GameMapProps) {
  const renderGrid = () => {
    const grid = [];
    
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const isPlayerHere = gameStarted && playerPosition.x === x && playerPosition.y === y;
        const tileData = isPlayerHere ? ROOM_TILES[currentRoom.mapTile] : null;
        const isPuzzleSolved = isPlayerHere && puzzlesSolved.includes(currentRoom.id);
        
        grid.push(
          <div
            key={`${x}-${y}`}
            className={`relative transition-all duration-300 ${
              isPlayerHere
                ? `${tileData?.color} border-2 border-[#d3a625]`
                : 'bg-[#1a1410] border-2 border-[#3a2a1a]'
            }`}
            style={{ 
              width: TILE_SIZE, 
              height: TILE_SIZE,
            }}
          >
            {isPlayerHere && tileData && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
                <div className="text-2xl mb-0.5">{tileData.icon}</div>
                {isPuzzleSolved && (
                  <div className="text-lg">✅</div>
                )}
              </div>
            )}
          </div>
        );
      }
    }
    
    return grid;
  };

  return (
    <div className="border-4 border-[#740001] bg-[#2d1b00] p-3 shadow-[inset_0_0_30px_rgba(116,0,1,0.2)]">
      {/* Player Icon */}
      <div className="flex items-center justify-center mb-3">
        <div className="w-20 h-20 rounded-full bg-[#740001] border-4 border-[#d3a625] flex items-center justify-center text-4xl shadow-[0_0_20px_rgba(211,166,37,0.5)]">
          🧙
        </div>
      </div>

      {/* Map Grid */}
      <div 
        className="grid gap-1 mx-auto mb-3"
        style={{ 
          gridTemplateColumns: `repeat(${MAP_WIDTH}, ${TILE_SIZE}px)`,
          width: 'fit-content',
        }}
      >
        {renderGrid()}
      </div>

      {/* Current Location Info */}
      {gameStarted && (
        <div className="text-center text-[#d4af37] text-[9px] tracking-wider space-y-1">
          <div className="text-[#d3a625]">CURRENT LOCATION:</div>
          <div className="font-bold">{currentRoom.name.toUpperCase()}</div>
        </div>
      )}
    </div>
  );
}
