function selectCharacter(characterClass) {
  // Perform any additional logic or processing here
  console.log("Selected character class: " + characterClass);
  
  // Update the chosen class in the character data
  characterData.chosenClass = characterClass;
  
  // Redirect to the characterCreation.html page
  window.location.href = "characterCreation.html";
}
