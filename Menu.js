// Get the new game button element
const newGameButton = document.getElementById("newGameButton");

// Add an event listener to the new game button
newGameButton.addEventListener("click", () => {
  // Redirect to chooseClass.html
  window.location.href = "chooseClass.html";
});
