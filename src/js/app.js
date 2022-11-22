const audio = new Audio();
const tracksCard = document.getElementsByClassName("track");
const player = document.querySelector(".player");
const pauseBtn = document.querySelector(".player__icon--pause");
const stopBtn = document.querySelector(".player__icon--stop");
// const activeBtn = document.querySelector(".track__img-wrap");

const playMusic = (event) => {
  const trackActive = event.currentTarget;

  audio.src = trackActive.dataset.track;
  audio.play();
  pauseBtn.classList.remove("player__icon--play");
  player.classList.add("player--active");
  // activeBtn.classList.remove("track__img-wrap");

  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].classList.remove("track--active");
  }

  trackActive.classList.add("track--active");
};

for (let i = 0; i < tracksCard.length; i++) {
  tracksCard[i].addEventListener("click", playMusic);
}

pauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove("player__icon--play");
  } else {
    audio.pause();
    pauseBtn.classList.add("player__icon--play");
  }
});

stopBtn.addEventListener("click", () => {
  if (audio.played) {
    audio.pause();
  }
  player.classList.remove("player--active");
});
