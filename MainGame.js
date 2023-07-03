// Function to update the character's status bars
function updateStatusBars() {
  // Get the character stats from the characterData.js file
  var characterStats = JSON.parse(localStorage.getItem("characterStats"));

  // Get the health, stamina, and mana points from the character stats
  var healthPoints = characterStats.health;
  var staminaPoints = characterStats.stamina;
  var manaPoints = characterStats.mana;

  // Calculate the current health, stamina, and mana percentages
  var currentHealthPercentage = (healthPoints / characterStats.health) * 100;
  var currentStaminaPercentage = (staminaPoints / characterStats.stamina) * 100;
  var currentManaPercentage = (manaPoints / characterStats.mana) * 100;

  // Update the width of the status fill bars based on the points
  var healthBar = document.getElementById("healthBar");
  healthBar.style.width = currentHealthPercentage + "%";

  var staminaBar = document.getElementById("staminaBar");
  staminaBar.style.width = currentStaminaPercentage + "%";

  var manaBar = document.getElementById("manaBar");
  manaBar.style.width = currentManaPercentage + "%";

  // Update the text above the bars with the remaining points
  var healthText = document.getElementById("healthText");
  healthText.textContent = healthPoints + " HP";

  var staminaText = document.getElementById("staminaText");
  staminaText.textContent = staminaPoints + " Stamina";

  var manaText = document.getElementById("manaText");
  manaText.textContent = manaPoints + " Mana";
}

// Call the function to update the status bars
updateStatusBars();

// Get the character element
var character = document.getElementById("character");

// Set the initial position of the character
var characterPosition = { x: 0, y: 0 };

// Set the speed of character movement
var movementSpeed = 10;

// Define the number of frames and the size of each frame in the spritesheet
var frameCount = 4; // Adjust the number according to the number of frames in your spritesheet
var frameWidth = 64; // Adjust the width according to the width of each frame in your spritesheet
var frameHeight = 64; // Adjust the height according to the height of each frame in your spritesheet

// Set the initial frame and animation properties
var currentFrame = 0;
var animationInterval;
var isAnimating = false;

// Function to start the animation
function startAnimation() {
  if (!isAnimating) {
    animationInterval = setInterval(animateCharacter, 150); // Adjust the interval based on the desired animation speed
    isAnimating = true;
  }
}

// Function to stop the animation
function stopAnimation() {
  clearInterval(animationInterval);
  isAnimating = false;
}

// Function to animate the character
function animateCharacter() {
  // Calculate the position of the current frame in the spritesheet
  var backgroundPositionX = -currentFrame * frameWidth;

  // Set the background position of the character element
  character.style.backgroundPosition = backgroundPositionX + "px 0px";

  // Update the current frame
  currentFrame = (currentFrame + 1) % frameCount;
}

// Function to check collision between character and monsters
function checkCollision() {
  var characterRect = character.getBoundingClientRect();
  var monsters = document.getElementsByClassName('monster');

  for (var i = 0; i < monsters.length; i++) {
    var monsterRect = monsters[i].getBoundingClientRect();

    if (
      characterRect.left < monsterRect.right &&
      characterRect.right > monsterRect.left &&
      characterRect.top < monsterRect.bottom &&
      characterRect.bottom > monsterRect.top
    ) {
      var monsterImage = monsters[i].querySelector('img').src;
      var monsterData = monsters[i].dataset.monsterData;
      combat(monsterImage, monsterData); // Pass the monster data to the combat function
      return; // Exit the function after detecting collision with one monster
    }
  }
}


// Function to handle combat between character and monsters
function combat(monsterImage, monsterData) {
  // Save the monster data to local storage for later use
  localStorage.setItem("monsterData", monsterData);

  // Pass the character and monster data to the combat page or perform other combat logic
  // For simplicity, let's assume we're passing the character and monster data as query parameters in the URL
  var combatUrl = 'combat.html?character=' + character.src + '&monster=' + monsterImage;
  window.location.href = combatUrl;
}

// Update the character's position and check collision after each movement
document.addEventListener("keydown", function(event) {
  var keyPressed = event.key.toLowerCase();

  // Move character based on arrow key pressed
  if (keyPressed === "arrowup" && characterPosition.y > 0) {
    characterPosition.y -= movementSpeed;
  } else if (keyPressed === "arrowdown" && characterPosition.y < (600 - character.offsetHeight)) {
    characterPosition.y += movementSpeed;
  } else if (keyPressed === "arrowleft" && characterPosition.x > 0) {
    characterPosition.x -= movementSpeed;
    character.style.transform = "scaleX(-1)"; // Flip the character horizontally when moving left
  } else if (keyPressed === "arrowright" && characterPosition.x < (800 - character.offsetWidth)) {
    characterPosition.x += movementSpeed;
    character.style.transform = "scaleX(1)"; // Reset the character's transformation when moving right
  }

  // Update the character position
  character.style.top = characterPosition.y + "px";
  character.style.left = characterPosition.x + "px";

  // Start or stop the animation based on movement
  if (keyPressed.startsWith("arrow") && !isAnimating) {
    startAnimation();
  } else if (!keyPressed.startsWith("arrow") && isAnimating) {
    stopAnimation();
  }

  // Check collision with monsters
  checkCollision();
});

// Array of monsters
var monsters = [
  { image: "Goblin.jpg", data: { name: "Goblin", health: 50, strength: 10 } },
  { image: "Bandit.jpg", data: { name: "Bandit", health: 60, strength: 15 } },
  { image: "Minotaur.jpg", data: { name: "Minotaur", health: 100, strength: 20 } },
  // Add more monsters as needed
];

// Function to generate a random number within a given range
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to spawn a random monster at a random location
function spawnRandomMonster() {
  // Get a random monster from the monsters array
  var randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

  // Create a new monster element
  var monsterElement = document.createElement('div');
  monsterElement.classList.add('monster');
  monsterElement.innerHTML = '<img src="' + randomMonster.image + '">';

  // Save the monster data as a data attribute
  monsterElement.dataset.monsterData = JSON.stringify(randomMonster.data);

  // Generate random coordinates for the monster's position
  var randomX, randomY;
  var playerRect = character.getBoundingClientRect();

  // Generate new coordinates until no overlap with the player's position
  do {
    randomX = getRandomNumber(0, 800 - monsterElement.offsetWidth);
    randomY = getRandomNumber(0, 600 - monsterElement.offsetHeight);
  } while (
    randomX < playerRect.right &&
    randomX + monsterElement.offsetWidth > playerRect.left &&
    randomY < playerRect.bottom &&
    randomY + monsterElement.offsetHeight > playerRect.top
  );

  // Set the position of the monster
  monsterElement.style.left = randomX + 'px';
  monsterElement.style.top = randomY + 'px';

  // Append the monster element to the game container
  var gameContainer = document.getElementById('gameContainer');
  gameContainer.appendChild(monsterElement);
}


// Call the function to spawn 10 random monsters
for (var i = 0; i < 10; i++) {
  spawnRandomMonster();
}

// Create an element for the location
var locationElement = document.createElement('div');
locationElement.classList.add('location');
locationElement.innerHTML = '<img src="town1.jpg">';

// Set the position of the location
locationElement.style.left = '200px'; // Adjust the position based on your desired location
locationElement.style.top = '300px'; // Adjust the position based on your desired location

// Append the location element to the game container
var gameContainer = document.getElementById('gameContainer');
gameContainer.appendChild(locationElement);
