import { Config } from "../config/config.js";
import { Drum } from "./drum.js";
import { SlotApi } from "../api/SlotApi.js";
import { SpinButton } from "../ui/SpinButton.js";
import { WinDisplay } from "../ui/WinDisplay.js";
import { BetDisplay } from "../ui/BetDisplay.js";
import { BalanceDisplay } from "../ui/BalanceDisplay.js";
import { ResponseDisplay } from "../ui/ResponseDisplay.js";
import { SoundManager } from "../sounds/SoundManager.js";

export class Game {
  constructor() {
    this.balance = Config.gameSettings.initialBalance;
    this.currentBet = Config.gameSettings.betSizes[0];
    this.lastWin = 0;
    this.app = null;
    this.drums = [];
    this.isDrumSpinning = false;
    this.spinning = false;
    this.responseTime = 0;
    this.ui = {
      spinBtn: new SpinButton("spin-btn", () => this.startSpin()),
      response: new ResponseDisplay("response"),
    };
    this.textures = [];

    this.init();
  }

  async init() {
    await SoundManager.init();
    await this.createApp();
    await this.loadTextures();
    this.createDrums();
    this.createUI();
    SoundManager.play('background', { loop: true, volume: 0.3 });
  }

  async createApp() {
    this.app = new PIXI.Application({
      width: Config.appWidth,
      height: Config.appHeight,
      backgroundColor: 0x1a1a2e,
      view: document.getElementById("game-canvas"),
      antialias: true,
    });

    // Загружаем фоновую картинку
    const bgTexture = PIXI.Texture.from("assets/backgrounds/phon.jpg"); // путь к изображению
    const background = new PIXI.Sprite(bgTexture);
    // Растягиваем на весь экран (если нужно)
    background.width = Config.appWidth;
    background.height = Config.appHeight;

    // Добавляем фон в самое начало сцены
    this.app.stage.addChildAt(background, 0); // 0 — индекс (первый слой)
    // console.log("this.app:", this.app);
  }

  // Предзагрузка всех текстур
  async loadTextures() {
    this.textures = await Promise.all(
      Config.iconPaths.map((path) => PIXI.Texture.from(path))
    );
  }

  createUI() {
    // Создание дополнительных UI элементов
    this.ui.balanceDisplay = new BalanceDisplay("balance-display");
    this.ui.betDisplay = new BetDisplay("bet-display");
    this.ui.winDisplay = new WinDisplay("win-display");
    this.updateUI();
  }
  
  updateUI() {
    this.ui.balanceDisplay.setText(`Баланс: $${this.balance}`);
    this.ui.betDisplay.setText(`Ставка: $${this.currentBet}`);
    this.ui.winDisplay.setText(`Выигрыш: $${this.lastWin}`);
  }

  createDrums() {
    for (let i = 0; i < Config.drumsCount; i++) {
      const drum = new Drum(this.textures, this.app, i);
      // console.log('drum.spinning:', drum.spinning);
      this.isDrumSpinning = drum.spinning;
      this.drums.push(drum);
      this.app.stage.addChild(drum.drum);
      // console.log("aaaaaaaaa");
    }
  }

  async startSpin() {
    if (this.spinning) return;

    this.spinning = true;
    // Удаляем старый обработчик, если был
    this.app.ticker.remove(this.update.bind(this));
    // Добавляем новый
    // this.app.ticker.add(this.update.bind(this));
    this.ui.spinBtn.setEnabled(false);
    this.ui.response.setText("Вращение...");

    this.drums.forEach((drum) => drum.spin());
    this.app.ticker.add(this.update.bind(this));

    try {
      const startTime = Date.now();
      this.responseTime = await SlotApi.spin();
      const elapsed = (Date.now() - startTime) / 1000;
      const remainingTime = Math.max(0, this.responseTime - elapsed);

      setTimeout(() => this.stopSpin(), remainingTime * 3000);
    } catch (error) {
      console.error("Ошибка сервера:", error);
      this.responseTime = 3;
      setTimeout(() => this.stopSpin(), remainingTime * 5000);
    }
  }

  update(delta) {
    // console.log('this.spinning:', this.spinning);

    if (!this.spinning) return;
    let atLeastOneDrumSpinning = false; // Флаг, указывающий, есть ли крутящиеся барабаны
    this.drums.forEach((drum) => {
      if (drum.spinning) {
        drum.update(delta); // Обновляем барабан, если он крутится
        atLeastOneDrumSpinning = true; // Устанавливаем флаг в true
      }
    });
    // Если ни один барабан не крутится, останавливаем основной spinning
    if (!atLeastOneDrumSpinning) {
      this.spinning = false;
    }
  }

  stopSpin() {
    // this.spinning = false;
    SoundManager.play("drumStop");
    this.app.ticker.remove(this.update.bind(this));
    this.ui.spinBtn.setEnabled(true);
    this.ui.response.setText(`Результат: ${this.responseTime}s`);

    this.drums.forEach((drum, i) => {
      // console.log(
      //   "сработал stopSpin в game и начался проход по барабанам, где запускается метод drum.stop() для каждого барабана через 2000мс"
      // );

      setTimeout(() => {
        drum.stop();
      }, i * 2000);
    });
  }
}

// Инициализация игры
document.addEventListener("DOMContentLoaded", () => {
  new Game();
});
