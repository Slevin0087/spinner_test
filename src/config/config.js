// config.js
// const iconSize = 200;
// const drumPadding = 20;
// const drumBorderSize = 7;
// export const Config = {
//   appWidth: 1080,
//   appHeight: 1920,
//   drumsCount: 5, // Количество барабанов
//   visibleRows: 3, // Видимых строк
//   totalRows: 5, // Всего строк (включая невидимые)
//   iconSize: iconSize, // Размер символа
//   drumPadding: drumPadding, // Отступ между барабанами
//   drumBorderSize: drumBorderSize,

//   iconPaths: [
//     "./assets/icon1.png",
//     "./assets/icon2.png",
//     "./assets/icon3.png",
//     "./assets/icon4.png",
//     "./assets/icon5.png",
//     "./assets/icon6.png",
//     "./assets/icon7.png",
//     "./assets/icon8.png",
//     "./assets/icon9.png",
//   ],

//   spinDuration: {
//     min: 2, // Минимальное время вращения (сек)
//     max: 3, // Максимальное время вращения (сек)
//   },

//   // Новые параметры конфигурации
//   bounceDistance: iconSize + drumPadding, // Дистанция отскока вниз
//   bounceDuration: 0.3, // Длительность отскока (сек)
//   spinSpeed: 100, // Скорость вращения (пикселей/кадр)
//   slowDownSpeed: 2, // Скорость замедления при остановке
//   // serverDelay: { min: 1000, max: 3000 } // Имитация задержки сервера
//   // Имитация сервера
//   serverDelay: [1, 3], // Случайная задержка 1-3 сек
// };


const iconSize = 200;
const drumPadding = 20;
const drumBorderSize = 7;

export const Config = {
  // ... предыдущие настройки ...
  appWidth: 1080,
  appHeight: 1920,
  drumsCount: 5, // Количество барабанов
  visibleRows: 3, // Видимых строк
  totalRows: 5, // Всего строк (включая невидимые)
  iconSize: iconSize, // Размер символа
  drumPadding: drumPadding, // Отступ между барабанами
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
    min: 2, // Минимальное время вращения (сек)
    max: 3, // Максимальное время вращения (сек)
  },

  // Новые параметры конфигурации
  bounceDistance: iconSize + drumPadding, // Дистанция отскока вниз
  bounceDuration: 0.3, // Длительность отскока (сек)
  spinSpeed: 100, // Скорость вращения (пикселей/кадр)
  slowDownSpeed: 2, // Скорость замедления при остановке
  // serverDelay: { min: 1000, max: 3000 } // Имитация задержки сервера
  // Имитация сервера
  serverDelay: [1, 3], // Случайная задержка 1-3 сек
  // Новые параметры
  symbolValues: [10, 20, 30, 40, 50, 100, 150, 200, 500],
  specialSymbolIndex: 8, // Индекс джокер-символа
  
  // Настройки звуков
  sounds: {
    spinStart: "./assets/sounds/spin-start.mp3",
    spinning: "./assets/sounds/spinning.mp3",
    drumStop: "./assets/sounds/drum-stop.mp3",
    win: "./assets/sounds/win.mp3",
    background: "./assets/sounds/background.mp3"
  },
  
  // Настройки анимаций
  animations: {
    symbolGlow: {
      duration: 0.5,
      color: 0xFFFF00
    },
    winHighlight: {
      duration: 1,
      scale: 1.2
    }
  },
  
  // Настройки игры
  gameSettings: {
    initialBalance: 1000,
    betSizes: [10, 20, 50, 100],
    autoSpinDelay: 1.5
  }
};