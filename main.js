"use strict";
const Modal = document.querySelector(".modal");
const btncloseModal = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");
const btnshowModal = document.querySelector(".btn--show-Modal");
console.log(btnshowModal);

//function to display Modal
const showModal = function () {
  Modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

//function to hide modal
const closeModal = function () {
  Modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
//show Game Rules
btnshowModal.addEventListener("click", showModal);

//Hide Game rules
btncloseModal.addEventListener("click", closeModal);

//hide by clicking on overlay
overlay.addEventListener("click", closeModal);

//Game logic

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");
const dice = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");

//Global declation of variables
var active, currentScore, playing, activePlayer;
var sum0, sum1;
//initialisation of variables
function initValues() {
  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  sum0 = 0;
  sum1 = 0;
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  dice.classList.add("hidden");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");

  document.querySelector("#name--0").textContent = "Player 1";
  document.querySelector("#name--1").textContent = "Player 2";
}
initValues();
//roll dice event handle
//switch player
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(
    "#current--" + activePlayer
  ).textContent = currentScore;
  activePlayer = activePlayer == 0 ? 1 : 0;

  //here we are using toggle method of classList it simply add the class if that class in not present
  // and delete the class if it is already present
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

rollDice.addEventListener("click", RollDice);

function RollDice() {
  //remove hidden dice
  dice.classList.remove("hidden");
  if (playing) {
    //remove dicehidden
    dice.classList.remove("dicehidden");
    //generate number
    let num = Math.trunc(Math.random() * 6) + 1;

    //dispaly dice
    dice.src = "dice-" + num + ".jpg";
    console.log(num);
    if (num != 1) {
      currentScore += num;
      document.querySelector(
        "#current--" + activePlayer
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
}

//Hold the score//
var holdScore = document.querySelector(".btn--hold");

//switch player

holdScore.addEventListener("click", function () {
  if (playing) {
    activePlayer == 0 ? (sum0 += currentScore) : (sum1 += currentScore);
    activePlayer == 0
      ? (score0.textContent = sum0)
      : (score1.textContent = sum1);
    // activePlayer = activePlayer == 0 ? 1 : 0;
    // player0.classList.toggle("player--active");
    // player1.classList.toggle("player--active");
    if (sum0 >= 100 || sum1 >= 100) {
      playing = false;

      //add music if player win

      var audio = new Audio("audio.wav");
      audio.play();
      //inform the winner

      document.querySelector("#name--" + activePlayer).textContent =
        "🤩Winner🤩";

      //add winner class
      document
        .querySelector(".player--" + activePlayer)
        .classList.add("player--winner");
    } else {
      switchPlayer();
    }
  }
});

//restarting the game
const newGame = document.querySelector(".btn--new");

newGame.addEventListener("click", initValues);
