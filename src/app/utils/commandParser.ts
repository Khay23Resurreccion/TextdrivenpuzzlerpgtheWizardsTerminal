import { GameData } from '../data/gameData';

interface CommandResult {
  message?: string;
  newState?: any;
}

export const parseCommand = (
  command: string,
  gameState: any,
  gameData: GameData
): CommandResult => {
  const parts = command.split(' ');
  const action = parts[0];
  const target = parts.slice(1).join(' ');

  const currentRoom = gameData.rooms[gameState.currentRoom];

  // Help command
  if (action === 'help') {
    return {
      message: `AVAILABLE COMMANDS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOVEMENT:
  NORTH, SOUTH, EAST, WEST (OR N, S, E, W)
  
ACTIONS:
  LOOK - EXAMINE YOUR SURROUNDINGS
  EXAMINE [OBJECT] - LOOK AT SOMETHING CLOSELY
  TAKE [ITEM] - PICK UP AN ITEM
  INVENTORY (OR INV) - CHECK YOUR ITEMS
  USE [ITEM] - USE AN ITEM FROM INVENTORY
  
PUZZLES:
  SOLVE [ANSWER] - ANSWER A PUZZLE
  HINT - GET A HINT FOR CURRENT PUZZLE
  
OTHER:
  HELP - SHOW THIS HELP MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    };
  }

  // Look command
  if (action === 'look') {
    let message = currentRoom.description + '\n';
    if (currentRoom.items && currentRoom.items.length > 0) {
      message += `\nYOU SEE: ${currentRoom.items.join(', ').toUpperCase()}`;
    }
    message += `\n\nEXITS: ${Object.keys(currentRoom.exits).join(', ').toUpperCase()}`;
    return { message };
  }

  // Examine command
  if (action === 'examine' || action === 'ex') {
    if (!target) {
      return { message: 'WHAT DO YOU WANT TO EXAMINE?' };
    }
    
    if (currentRoom.items?.includes(target)) {
      const item = gameData.items[target];
      return { message: item.description };
    }
    
    return { message: `YOU DON'T SEE A ${target.toUpperCase()} HERE.` };
  }

  // Take command
  if (action === 'take' || action === 'get') {
    if (!target) {
      return { message: 'WHAT DO YOU WANT TO TAKE?' };
    }
    
    const normalizedTarget = target.replace(/\s+/g, '_');
    
    if (currentRoom.items?.includes(normalizedTarget)) {
      const newInventory = [...gameState.inventory, normalizedTarget];
      const newRoomItems = currentRoom.items.filter(i => i !== normalizedTarget);
      
      return {
        message: `YOU TAKE THE ${target.replace(/_/g, ' ').toUpperCase()}.`,
        newState: {
          ...gameState,
          inventory: newInventory,
          roomStates: {
            ...gameState.roomStates,
            [currentRoom.id]: { ...currentRoom, items: newRoomItems }
          }
        }
      };
    }
    
    return { message: `YOU CAN'T TAKE THAT.` };
  }

  // Inventory command
  if (action === 'inventory' || action === 'inv') {
    if (gameState.inventory.length === 0) {
      return { message: 'YOUR INVENTORY IS EMPTY.' };
    }
    return {
      message: `INVENTORY:\n${gameState.inventory.map((item: string) => `  • ${item.replace(/_/g, ' ').toUpperCase()}`).join('\n')}`
    };
  }

  // Solve command
  if (action === 'solve') {
    if (!currentRoom.puzzle) {
      return { message: 'THERE IS NO PUZZLE TO SOLVE HERE.' };
    }
    
    if (gameState.puzzlesSolved.includes(currentRoom.id)) {
      return { message: 'YOU HAVE ALREADY SOLVED THIS PUZZLE.' };
    }
    
    if (!target) {
      return { message: currentRoom.puzzle.question };
    }
    
    const answer = target.toLowerCase().trim();
    
    if (answer === currentRoom.puzzle.answer) {
      const newSealPower = gameState.sealPower + currentRoom.puzzle.reward;
      return {
        message: `✨ CORRECT! THE PUZZLE DISSOLVES IN A FLASH OF LIGHT.\n\n⚡ THE SEAL GROWS STRONGER! (+${currentRoom.puzzle.reward}% POWER)\n\nMAGICAL ENERGY COURSES THROUGH THE CASTLE. YOU FEEL THE DARKNESS RECEDING.`,
        newState: {
          ...gameState,
          sealPower: newSealPower,
          puzzlesSolved: [...gameState.puzzlesSolved, currentRoom.id]
        }
      };
    } else {
      return {
        message: '❌ THAT IS NOT CORRECT. THE MAGIC REMAINS SEALED.\n\nTYPE "HINT" FOR HELP, OR TRY AGAIN.'
      };
    }
  }

  // Hint command
  if (action === 'hint') {
    if (!currentRoom.puzzle) {
      return { message: 'THERE IS NO PUZZLE HERE.' };
    }
    
    if (gameState.puzzlesSolved.includes(currentRoom.id)) {
      return { message: 'YOU HAVE ALREADY SOLVED THIS PUZZLE.' };
    }
    
    return { message: `💡 HINT: ${currentRoom.puzzle.hint}` };
  }

  // Movement commands
  const directions: Record<string, string> = {
    n: 'north',
    s: 'south',
    e: 'east',
    w: 'west',
    north: 'north',
    south: 'south',
    east: 'east',
    west: 'west',
  };

  if (directions[action]) {
    const direction = directions[action];
    
    if (currentRoom.exits[direction]) {
      const nextRoomId = currentRoom.exits[direction];
      const nextRoom = gameData.rooms[nextRoomId];
      
      // Check if puzzle blocks the way
      if (currentRoom.puzzle && !gameState.puzzlesSolved.includes(currentRoom.id)) {
        return {
          message: '🚫 A MAGICAL BARRIER BLOCKS YOUR PATH! YOU MUST SOLVE THE PUZZLE FIRST.\n\n' + currentRoom.puzzle.question
        };
      }
      
      return {
        message: `YOU TRAVEL ${direction.toUpperCase()}...`,
        newState: {
          ...gameState,
          currentRoom: nextRoomId
        }
      };
    } else {
      return { message: 'YOU CANNOT GO THAT WAY.' };
    }
  }

  return { message: `I DON'T UNDERSTAND THAT COMMAND. TYPE 'HELP' FOR AVAILABLE COMMANDS.` };
};