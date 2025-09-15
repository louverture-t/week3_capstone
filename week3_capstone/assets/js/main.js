// --- Capstone Challenge: Dragon Rune Adventure ---
// Constructor for Player
class Player {
  constructor(name, species) {
    // Set up player properties
    this.name = name;
    this.species = species;
    this.xp = 3; // Start with 3 XP
    this.runes = []; // Empty array to store collected runes
    this.maxRunes = 5; // Win condition: collect 5 runes
  }
  
  // Method to add a rune to the player's collection
  addRune(rune) {
    this.runes.push(rune);
    console.log(`${this.name} collected: ${rune.name}`);
  }
  
  // Method to lose 1 XP (never goes below 0)
  loseXP() {
    this.xp = Math.max(0, this.xp - 1);
    console.log(`${this.name} lost 1 XP. Current XP: ${this.xp}`);
  }
  
  // Method to gain 1 XP
  gainXP() {
    this.xp += 1;
    console.log(`${this.name} gained 1 XP. Current XP: ${this.xp}`);
  }
  
  // Method to get a summary of the player's stats
  getStats() {
    const runeNames = this.runes.map(rune => rune.name);
    return `${this.name} (${this.species}) | XP: ${this.xp} | Runes: ${runeNames.join(", ") || "None"}`;
  }
  
  // Check if player has won (collected enough runes)
  hasWon() {
    return this.runes.length >= this.maxRunes;
  }
  
  // Check if player has lost (XP reaches 0)
  hasLost() {
    return this.xp <= 0;
  }
}

// Array of possible rune choices (each is an object)
const runeChoices = [
  { name: "Rune of Fire", power: "Flame", emoji: "🔥" },
  { name: "Rune of Ice", power: "Freeze", emoji: "❄️" },
  { name: "Rune of Wisdom", power: "Knowledge", emoji: "📚" },
  { name: "Rune of Shadows", power: "Stealth", emoji: "🌙" },
  { name: "Rune of Lightning", power: "Thunder", emoji: "⚡" },
  { name: "Rune of Earth", power: "Stone", emoji: "🌍" },
  { name: "Rune of Wind", power: "Storm", emoji: "🌪️" },
  { name: "Rune of Light", power: "Radiance", emoji: "✨" }
];

// Utility function: returns a random integer from 0 up to (but not including) max
const randInt = (max) => Math.floor(Math.random() * max);

// Utility function: displays the player's stats in the HTML page
const showStats = player => {
  const statsDiv = document.getElementById('stats');
  statsDiv.innerHTML = `
    <div class="player-stats">
      <h3>🎯 Adventure Status</h3>
      <p><strong>Name:</strong> ${player.name}</p>
      <p><strong>Species:</strong> ${player.species}</p>
      <p><strong>Experience:</strong> ${player.xp} XP</p>
      <p><strong>Runes Collected:</strong> ${player.runes.length}/${player.maxRunes}</p>
      <div class="runes-display">
        ${player.runes.map(rune => `<span class="rune">${rune.emoji} ${rune.name}</span>`).join('')}
      </div>
    </div>
  `;
};

// Function to get two random rune choices
const getRuneChoices = () => {
  const availableRunes = [...runeChoices];
  const choice1 = availableRunes.splice(randInt(availableRunes.length), 1)[0];
  const choice2 = availableRunes.splice(randInt(availableRunes.length), 1)[0];
  return [choice1, choice2];
};

// Function to present rune choice to player
const presentRuneChoice = (player) => {
  const [rune1, rune2] = getRuneChoices();
  const correctChoice = randInt(2); // 0 or 1
  const correctRune = correctChoice === 0 ? rune1 : rune2;
  
  // Show choices to player
  const choice = prompt(
    `🔮 A mystical portal appears! Choose wisely, ${player.name}:\n\n` +
    `1. ${rune1.emoji} ${rune1.name} (Power: ${rune1.power})\n` +
    `2. ${rune2.emoji} ${rune2.name} (Power: ${rune2.power})\n\n` +
    `Enter 1 or 2:`
  );
  
  // Validate input
  if (choice !== "1" && choice !== "2") {
    alert("❌ Invalid choice! You hesitated too long and the portal vanished. You lose 1 XP.");
    player.loseXP();
    return false;
  }
  
  const playerChoice = parseInt(choice) - 1;
  const chosenRune = playerChoice === 0 ? rune1 : rune2;
  
  // Check if correct choice
  if (playerChoice === correctChoice) {
    alert(`✨ Excellent choice! The ${chosenRune.name} resonates with your spirit!\n\n` +
          `You successfully collected the ${chosenRune.name} and gained 1 XP!`);
    player.addRune(chosenRune);
    player.gainXP();
    return true;
  } else {
    alert(`💥 The ${chosenRune.name} was a trap! Dark magic surrounds you.\n\n` +
          `You lose 1 XP but learn from the experience.`);
    player.loseXP();
    return false;
  }
};

// Function to show game over screen
const showGameOver = (player, won) => {
  if (won) {
    alert(`🎉 VICTORY! 🎉\n\n` +
          `Congratulations, ${player.name}! You have collected ${player.runes.length} runes and proven yourself as a legendary rune master!\n\n` +
          `Your ${player.species} heritage has served you well in this mystical adventure.\n\n` +
          `Final Stats:\n` +
          `XP: ${player.xp}\n` +
          `Runes: ${player.runes.map(r => r.name).join(', ')}`);
  } else {
    alert(`💀 DEFEAT 💀\n\n` +
          `Oh no, ${player.name}! Your XP has been depleted and you can no longer continue your quest.\n\n` +
          `You collected ${player.runes.length} runes before falling to the mystical challenges.\n\n` +
          `A true adventurer learns from defeat. Try again!`);
  }
};

// Main function that runs the adventure game
const startAdventure = () => {
  console.log("🐲 Starting Dragon Rune Adventure!");
  
  // Get player name
  let playerName = prompt("🌟 Welcome, brave adventurer! What is your name?");
  
  // Validate name input
  if (!playerName || playerName.trim() === "") {
    alert("❌ A name is required to begin your adventure!");
    return;
  }
  
  playerName = playerName.trim();
  
  // Get player species
  let species = prompt(
    `Greetings, ${playerName}! Choose your heritage:\n\n` +
    `1. 🐲 Dragon - Ancient, powerful, with mystical intuition\n` +
    `2. 👤 Human - Clever, adaptable, with strong determination\n\n` +
    `Enter 1 or 2:`
  );
  
  // Validate species input
  if (species !== "1" && species !== "2") {
    alert("❌ Invalid choice! Please select 1 for Dragon or 2 for Human.");
    return;
  }
  
  const speciesName = species === "1" ? "Dragon" : "Human";
  
  // Create player
  const player = new Player(playerName, speciesName);
  
  // Welcome message
  alert(`🎮 Adventure begins!\n\n` +
        `Welcome, ${player.name} the ${player.species}!\n\n` +
        `Your quest: Collect ${player.maxRunes} mystical runes to become a legendary rune master.\n\n` +
        `You start with ${player.xp} XP. If your XP reaches 0, your adventure ends.\n\n` +
        `Choose wisely and may fortune favor you!`);
  
  // Show initial stats
  showStats(player);
  
  // Game loop
  let gameActive = true;
  
  while (gameActive) {
    // Check win condition
    if (player.hasWon()) {
      showGameOver(player, true);
      gameActive = false;
      break;
    }
    
    // Check lose condition
    if (player.hasLost()) {
      showGameOver(player, false);
      gameActive = false;
      break;
    }
    
    // Present rune choice
    const continueAdventure = confirm(
      `Current Status: ${player.getStats()}\n\n` +
      `Do you wish to seek another rune? The path ahead is dangerous but rewarding.`
    );
    
    if (!continueAdventure) {
      const finalChoice = confirm(
        `Are you sure you want to end your adventure?\n\n` +
        `You currently have ${player.runes.length} runes. You need ${player.maxRunes} to win.`
      );
      
      if (finalChoice) {
        alert(`🚪 Adventure ended!\n\n` +
              `${player.name} the ${player.species} has chosen to end their quest.\n\n` +
              `Final Stats: ${player.getStats()}\n\n` +
              `The runes you collected will be remembered in legend!`);
        gameActive = false;
        break;
      }
    }
    
    // Present rune choice challenge
    presentRuneChoice(player);
    
    // Update display
    showStats(player);
    
    // Add small delay for dramatic effect
    console.log(`Current game state: ${player.getStats()}`);
  }
  
  // Final stats display
  showStats(player);
  console.log("🎮 Adventure completed!");
};

// Add event listener to the start button to begin the adventure when clicked
document.getElementById('startBtn').addEventListener('click', startAdventure);

// Easter egg: Console welcome message
console.log("🐲 Dragon Rune Adventure loaded! Click 'Begin Your Adventure' to start!");
console.log("🎯 Collect 5 runes to win. Don't let your XP reach 0!");