export interface Room {
  id: string;
  name: string;
  description: string;
  exits: { [direction: string]: string };
  items?: string[];
  puzzle?: {
    type: string;
    question: string;
    answer: string;
    hint: string;
    reward: number;
  };
  mapPosition: { x: number; y: number };
  mapTile: string;
}

export interface GameData {
  rooms: Record<string, Room>;
  items: Record<string, { description: string; portable: boolean }>;
}

export const gameData: GameData = {
  rooms: {
    entrance: {
      id: 'entrance',
      name: 'Grand Entrance Hall',
      description: '🏰 YOU STAND IN THE GRAND ENTRANCE HALL. TOWERING STONE ARCHWAYS RISE ABOVE YOU, AND ANCIENT TAPESTRIES LINE THE WALLS. TO THE NORTH LIES THE CENTRAL CORRIDOR. TO THE EAST IS THE LIBRARY WING. TO THE WEST, YOU SEE STAIRS DESCENDING INTO DARKNESS.',
      exits: { north: 'corridor', east: 'library', west: 'dungeons' },
      mapPosition: { x: 2, y: 3 },
      mapTile: 'entrance',
    },
    corridor: {
      id: 'corridor',
      name: 'Central Corridor',
      description: '📜 THE CENTRAL CORRIDOR STRETCHES BEFORE YOU. FLOATING CANDLES LIGHT THE PATH. STRANGE WHISPERS SEEM TO EMANATE FROM THE WALLS. TO THE NORTH IS THE CLOCK TOWER. TO THE SOUTH IS THE GRAND ENTRANCE.',
      exits: { north: 'clocktower', south: 'entrance' },
      mapPosition: { x: 2, y: 2 },
      mapTile: 'corridor',
    },
    library: {
      id: 'library',
      name: 'Ancient Library',
      description: '📚 ENDLESS SHELVES OF ANCIENT TOMES SURROUND YOU. DUST MOTES DANCE IN SHAFTS OF COLORED LIGHT FROM STAINED GLASS WINDOWS. A PEDESTAL IN THE CENTER HOLDS AN OPEN BOOK. TO THE WEST IS THE GRAND ENTRANCE.',
      exits: { west: 'entrance' },
      items: ['ancient_tome'],
      puzzle: {
        type: 'riddle',
        question: 'AN ANCIENT RIDDLE IS INSCRIBED ON THE PEDESTAL:\n\n"I SPEAK WITHOUT A MOUTH AND HEAR WITHOUT EARS. I HAVE NO BODY, BUT COME ALIVE WITH WIND. WHAT AM I?"\n\nTYPE: SOLVE [YOUR ANSWER]',
        answer: 'echo',
        hint: 'THINK ABOUT SOUND AND HOW IT TRAVELS...',
        reward: 25,
      },
      mapPosition: { x: 3, y: 3 },
      mapTile: 'library',
    },
    clocktower: {
      id: 'clocktower',
      name: 'Clock Tower',
      description: '🕐 THE CLOCK TOWER RISES HIGH ABOVE. AN ENORMOUS CLOCK FACE DOMINATES THE ROOM, ITS HANDS FROZEN AT MIDNIGHT. GEARS AND MECHANISMS FILL THE WALLS. TO THE SOUTH IS THE CENTRAL CORRIDOR. TO THE EAST IS THE OBSERVATORY.',
      exits: { south: 'corridor', east: 'observatory' },
      puzzle: {
        type: 'logic',
        question: 'THE CLOCK IS STUCK. A MAGICAL INSCRIPTION READS:\n\n"THREE WIZARDS CAST SPELLS AT DIFFERENT TIMES:\n- WIZARD A CASTS EVERY 3 HOURS\n- WIZARD B CASTS EVERY 4 HOURS\n- WIZARD C CASTS EVERY 6 HOURS\n\nTHEY ALL CAST TOGETHER AT MIDNIGHT. WHEN WILL THEY NEXT CAST TOGETHER?"\n\nTYPE: SOLVE [NUMBER] (IN HOURS)',
        answer: '12',
        hint: 'FIND THE LEAST COMMON MULTIPLE OF 3, 4, AND 6...',
        reward: 25,
      },
      mapPosition: { x: 2, y: 1 },
      mapTile: 'clocktower',
    },
    observatory: {
      id: 'observatory',
      name: 'Star Observatory',
      description: '⭐ THE DOMED CEILING SHOWS A PERFECT NIGHT SKY FILLED WITH CONSTELLATIONS. MAGICAL TELESCOPES POINT IN ALL DIRECTIONS. TO THE WEST IS THE CLOCK TOWER.',
      exits: { west: 'clocktower' },
      items: ['star_map'],
      puzzle: {
        type: 'pattern',
        question: 'STAR CRYSTALS ON THE FLOOR FORM A PATTERN:\n\n2, 3, 5, 7, 11, 13, ?\n\nTYPE: SOLVE [NUMBER]',
        answer: '17',
        hint: 'THESE ARE SPECIAL NUMBERS THAT CAN ONLY BE DIVIDED BY 1 AND THEMSELVES...',
        reward: 25,
      },
      mapPosition: { x: 3, y: 1 },
      mapTile: 'observatory',
    },
    dungeons: {
      id: 'dungeons',
      name: 'Lower Dungeons',
      description: '🕯️ COLD STONE WALLS PRESS IN AROUND YOU. TORCHES FLICKER WITH GREEN FLAME. SHADOWS SEEM TO MOVE ON THEIR OWN. TO THE EAST IS THE GRAND ENTRANCE. TO THE NORTH IS THE DARK HALL.',
      exits: { east: 'entrance', north: 'darkhall' },
      mapPosition: { x: 1, y: 3 },
      mapTile: 'dungeons',
    },
    darkhall: {
      id: 'darkhall',
      name: 'The Dark Hall',
      description: '🌑 THE VERY AIR HERE PULSES WITH UNSTABLE MAGIC. THE SEAL CHAMBER DOOR STANDS BEFORE YOU, COVERED IN GLOWING RUNES. THIS IS THE HEART OF THE CASTLE\'S PROTECTIVE MAGIC. TO THE SOUTH IS THE LOWER DUNGEONS.',
      exits: { south: 'dungeons' },
      puzzle: {
        type: 'final',
        question: 'THE SEAL CHAMBER DOOR IS LOCKED WITH A FINAL RIDDLE:\n\n"I AM NOT ALIVE, BUT I GROW.\nI DON\'T HAVE LUNGS, BUT I NEED AIR.\nI DON\'T HAVE A MOUTH, BUT WATER KILLS ME.\nWHAT AM I?"\n\nTYPE: SOLVE [YOUR ANSWER]',
        answer: 'fire',
        hint: 'THINK ABOUT SOMETHING THAT CONSUMES AND SPREADS...',
        reward: 25,
      },
      mapPosition: { x: 1, y: 2 },
      mapTile: 'darkhall',
    },
  },
  items: {
    ancient_tome: {
      description: 'A LEATHER-BOUND TOME FILLED WITH ANCIENT MAGICAL KNOWLEDGE.',
      portable: true,
    },
    star_map: {
      description: 'A SHIMMERING MAP SHOWING CONSTELLATION PATTERNS.',
      portable: true,
    },
  },
};