document.addEventListener("DOMContentLoaded", () => {
  const symbols = ["📚","📚","✏️","✏️","🎨","🎨","⚽","⚽"];
  const gameContainer = document.querySelector(".memory-game");
  const msgGame = document.getElementById("game-msg");

  let firstCard, secondCard;
  let lock = false;
  let matches = 0;

  // ערבוב קלפים
  const shuffled = symbols.sort(() => 0.5 - Math.random());
  shuffled.forEach(sym => {
    const card = document.createElement("div");
    card.classList.add("memory-card");
    card.dataset.symbol = sym;
    card.textContent = "❓";
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  });

  function flipCard() {
    if (lock || this === firstCard) return;
    this.classList.add("flipped");
    this.textContent = this.dataset.symbol;

    if (!firstCard) {
      firstCard = this;
      return;
    }
    secondCard = this;
    lock = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      matches++;
      firstCard = secondCard = null;
      lock = false;
      if (matches === symbols.length / 2) {
        msgGame.textContent = "כל הכבוד! מצאתם את כל הזוגות 🎉";
      }
    } else {
      setTimeout(() => {
        firstCard.textContent = "❓";
        secondCard.textContent = "❓";
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        firstCard = secondCard = null;
        lock = false;
      }, 1000);
    }
  }
});
