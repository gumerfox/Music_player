const dataMusic = [
  {
    id: "1",
    artist: "The weeknd",
    track: "Save your tears",
    poster: "images/photo1.png",
    mp3: "audio/The Weeknd - Save Your Tears.mp3",
  },
  {
    id: "2",
    artist: "Imagine Dragons",
    track: "Follow You",
    poster: "images/photo2.png",
    mp3: "audio/Imagine Dragons - Follow You.mp3",
  },
  {
    id: "3",
    artist: "Tove Lo",
    track: "How Long",
    poster: "images/photo3.png",
    mp3: "audio/Tove Lo - How Long.mp3",
  },
  {
    id: "4",
    artist: "Tom Odell",
    track: "Another Love",
    poster: "images/photo4.png",
    mp3: "audio/Tom Odell - Another Love.mp3",
  },
  {
    id: "5",
    artist: "Lana Del Rey",
    track: "Born To Die",
    poster: "images/photo5.png",
    mp3: "audio/Lana Del Rey - Born To Die.mp3",
  },
  {
    id: "6",
    artist: "Adele",
    track: "Hello",
    poster: "images/photo6.png",
    mp3: "audio/Adele - Hello.mp3",
  },
  {
    id: "7",
    artist: "Tom Odell",
    track: "Can't Pretend",
    poster: "images/photo7.png",
    mp3: "audio/Tom Odell - Can't Pretend.mp3",
  },
  {
    id: "8",
    artist: "Lana Del Rey",
    track: "Young And Beautiful",
    poster: "images/photo8.png",
    mp3: "audio/Lana Del Rey - Young And Beautiful.mp3",
  },
  {
    id: "9",
    artist: "Adele",
    track: "Someone Like You",
    poster: "images/photo9.png",
    mp3: "audio/Adele - Someone Like You.mp3",
  },
  {
    id: "10",
    artist: "Imagine Dragons",
    track: "Natural",
    poster: "images/photo10.png",
    mp3: "audio/Imagine Dragons - Natural.mp3",
  },
  {
    id: "11",
    artist: "Drake",
    track: "Laugh Now Cry Later",
    poster: "images/photo11.png",
    mp3: "audio/Drake - Laugh Now Cry Later.mp3",
  },
  {
    id: "12",
    artist: "Madonna",
    track: "Frozen",
    poster: "images/photo12.png",
    mp3: "audio/Madonna - Frozen.mp3",
  },
];

let playlist = [];

const audio = new Audio();
const tracksCard = document.getElementsByClassName("track");

const catalogContainer = document.querySelector(".catalog__container");
const player = document.querySelector(".player");
const pauseBtn = document.querySelector(".player__icon--pause");
const stopBtn = document.querySelector(".player__icon--stop");
const prevBtn = document.querySelector(".player__icon--prev");
const nextBtn = document.querySelector(".player__icon--next");
const likeBtn = document.querySelector(".player__icon--like");
const muteBtn = document.querySelector(".player__icon--mute");

const catalogAddBtn = document.createElement("button");
catalogAddBtn.classList.add("catalog__btn-add");
catalogAddBtn.innerHTML = `
  <span>Увидеть все</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" />
  </svg>
`;

const pausePlayer = () => {
  const trackActive = document.querySelector(".track--active");
  if (audio.paused) {
    audio.play();
    pauseBtn.classList.remove("player__icon--play");
    trackActive.classList.remove("track--pause");
  } else {
    audio.pause();
    pauseBtn.classList.add("player__icon--play");
    trackActive.classList.add("track--pause");
  }
};

const playMusic = (event) => {
  // чтобы при клике на карточку в адресной строке не появлялось в конце # и страница не перегружалась
  event.preventDefault();
  const trackActive = event.currentTarget;

  if (trackActive.classList.contains("track--active")) {
    pausePlayer();
    return;
  }
let i = 0;
  const id = trackActive.dataset.idTrack;

  const track = dataMusic.find((item, index) => {
    i =index;
    return id === item.id;
  });

  audio.src = track.mp3;
  audio.play();
  pauseBtn.classList.remove("player__icon--play");

  player.classList.add("player--active");

  for (let i = 0; i < tracksCard.length; i++) {
    if (id === tracksCard[i].dataset.idTrack) {
      tracksCard[i].classList.add('track--active');
    } else {
     tracksCard[i].classList.remove("track--active");
  }
}
  };
const addHandlerTrack = () => {
  for (let i = 0; i < tracksCard.length; i++) {
    tracksCard[i].addEventListener("click", playMusic);
  }
};

pauseBtn.addEventListener("click", pausePlayer);

stopBtn.addEventListener('click', () => {
  audio.src = '';
  player.classList.remove('player_active');
  document.querySelector('.track_active').classList.remove('track_active');
  //! add stop active-card
  
});

const createCard = (data) => {
  const card = document.createElement("a");
card.href = '#';
  card.classList.add("catalog__item", "track");
card.dataset.idTrack = data.id;

  card.innerHTML = `
  <div class="track__img-wrap">
                <img
                 class="track__poster" 
                 src="${data.poster}" 
                 alt="${data.artist} ${data.track}"
                 width="180"
                 height="180">
            </div>
            <div class="track__info track-info">
                <p class="track-info__title">${data.track}</p>
                <p class="track-info__artist">${data.artist}</p>
            </div>
  `;
  return card;
};

const renderCatalog = (dataList) => {
playlist = [...dataList];
  catalogContainer.textContent = '';
  const listCards = dataList.map(createCard);
  catalogContainer.append(...listCards);
  addHandlerTrack();
};

// Делаем отображение только 2 рядов карточек
const checkCount = (i = 1) => {
  tracksCard[0]
  if (catalogContainer.clientHeight > tracksCard[0].clientHeight * 3) {
      tracksCard[tracksCard.length - i].style.display = 'none';
      checkCount(i + 1);
  } else if (i !== 1) {
          catalogContainer.append(catalogAddBtn);
      }
};

const init = () => {
  renderCatalog(dataMusic);
  checkCount();
  // Функция кнопки 'Увидеть все', У меня не отображается эта кнопка
  catalogAddBtn.addEventListener("click", () => {
    [...tracksCard].forEach((trackCard) => {
      trackCard.style.display = "";
      catalogAddBtn.remove();
    });
  });
};

init();
