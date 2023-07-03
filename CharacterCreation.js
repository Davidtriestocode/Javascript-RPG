function confirmStats() {
  // Get the selected class
  var selectedClass = document.getElementById("classContainer").innerText.replace("Selected Class: ", "");

  // Get the attribute values
  var strength = document.getElementById("strengthInput").value;
  var endurance = document.getElementById("enduranceInput").value;
  var agility = document.getElementById("agilityInput").value;
  var attack = document.getElementById("attackInput").value;
  var defence = document.getElementById("defenceInput").value;
  var intelligence = document.getElementById("intelligenceInput").value;
  var magic = document.getElementById("magicInput").value;
  var health = document.getElementById("healthInput").value;
  var stamina = document.getElementById("staminaInput").value;
  var mana = document.getElementById("manaInput").value;

  // Set current health, stamina, and mana
  var currentHealth = health;
  var currentStamina = stamina;
  var currentMana = mana;

  // Create an object to store the character stats
  var characterStats = {
    class: selectedClass,
    strength: strength,
    endurance: endurance,
    agility: agility,
    attack: attack,
    defence: defence,
    intelligence: intelligence,
    magic: magic,
    health: health,
    stamina: stamina,
    mana: mana,
    currentHealth: currentHealth,
    currentStamina: currentStamina,
    currentMana: currentMana
  };

  // Save the character stats to local storage
  localStorage.setItem("characterStats", JSON.stringify(characterStats));

  // Redirect the user to the MainGame.html page
  window.location.href = "MainGame.html";
}

// Add event listener to the "Confirm" button
var confirmButton = document.getElementById("confirmButton");
confirmButton.addEventListener("click", confirmStats);
