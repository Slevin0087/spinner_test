function getViewportSize() {
  return {
    width: Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    ),
    height: Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ),
  };
}

const { width, height } = getViewportSize();
console.log(`Initial viewport: ${width}x${height}`);

// const iconSize = 200;
// const drumPadding = 20;
// const drumBorderSize = 7;

// const canEl = document.getElementById('game-canvas').offsetWidth;
// const canEl2 = document.getElementById('game-canvas').offsetHeight;
// const cStyle = window.getComputedStyle(canEl);
// parseInt(cStyle)
// console.log('canEl:', typeof canEl);


const iconSize = width / 5.55;
console.log("iconSize:", iconSize);

const drumPadding = width / 150;
const drumBorderSize = width / 130;

export const Config = {
  appWidth: width,
  appHeight: height,
  drumsCount: 5,
  visibleRows: 3,
  totalRows: 5,
  iconSize: iconSize,
  drumPadding: drumPadding,
  drumBorderSize: drumBorderSize,

  iconPaths: [
    "./assets/icon1.png",
    "./assets/icon2.png",
    "./assets/icon3.png",
    "./assets/icon4.png",
    "./assets/icon5.png",
    "./assets/icon6.png",
    "./assets/icon7.png",
    "./assets/icon8.png",
    "./assets/icon9.png",
  ],

  spinDuration: {
    min: 2,
    max: 3,
  },

  bounceDistance: iconSize + drumPadding,
  bounceDuration: 0.3,
  spinSpeed: 50,
  slowDownSpeed: 2,
  serverDelay: { min: 1000, max: 3000 }, // Имитация задержки сервера
  // Имитация сервера
  // serverDelay: [1, 3],

  symbolValues: [10, 20, 30, 40, 50, 100, 150, 200, 500],
  specialSymbolIndex: 8,

  sounds: {
    spinStart: "./assets/sounds/spin-start.mp3",
    spinning: "./assets/sounds/spinning.mp3",
    drumStop: "./assets/sounds/drum-stop.mp3",
    win: "./assets/sounds/win.mp3",
    background: "./assets/sounds/background.mp3",
  },

  animations: {
    symbolGlow: {
      duration: 0.5,
      color: 0xffff00,
    },
    winHighlight: {
      duration: 1,
      scale: 1.2,
    },
  },

  gameSettings: {
    initialBalance: 1000,
    betSizes: [10, 20, 50, 100],
    autoSpinDelay: 1.5,
  },
};

window.addEventListener("resize", () => {
  getViewportSize();
  // console.log(`Resized to: ${width}x${height}`);
});
