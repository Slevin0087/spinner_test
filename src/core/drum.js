import { Config } from "../config/config.js";
import { SoundManager } from "../sounds/SoundManager.js";
import { Animations } from "../utils/animations.js";

export class Drum {
  constructor(textures, app, index) {
    this.app = app;
    this.index = index;
    this.icons = [];
    // this.fIcons = [];
    this.regIcons = null;
    this.oldIcons = null;
    this.stopIcons = {
      icons: [],
      tempSymbol: [],
    };
    this.textures = textures;
    this.drum = null;
    this.tempIcon = null;
    this.initTempIconY = -Config.iconSize - Config.drumPadding;
    this.spinning = false;
    this.speed = 0;
    this.originalY = null;

    this.init();
  }

  async init() {
    this.createDrum();
    this.createIcons();
    this.createBorder();
    this.createTempIcons(this.initTempIconY);
  }

  createDrum() {
    this.drum = new PIXI.Container();
    this.drum.x =
      this.index * (Config.iconSize + Config.drumBorderSize * 2 + 2.3);
    console.log("this.drum.x:", this.drum.x);

    this.drum.y =
      this.app.screen.height / 2 -
      (Config.visibleRows * Config.iconSize +
        Config.drumPadding * (Config.visibleRows - 1)) /
        2;
    this.originalY = this.drum.y;
    const mask = new PIXI.Graphics()
      .beginFill(0xffffff)
      .drawRoundedRect(
        0,
        0,
        Config.iconSize + Config.drumBorderSize * 2,
        Config.visibleRows * Config.iconSize +
          Config.drumPadding * (Config.visibleRows - 1),
        20
      )
      .endFill();

    this.drum.mask = mask;
    this.drum.addChild(mask);
    console.log("this.drum:", this.drum);
  }

  createIcons() {
    for (let i = 1; i < Config.visibleRows + 1; i++) {
      // console.log('i:', i);

      const icon = new PIXI.Sprite(this.getRandomTexture());
      // console.log('icon:', icon);

      icon.width = Config.iconSize;
      icon.height = Config.iconSize;
      icon.x = Config.drumBorderSize;
      icon.y = (i - 1) * (Config.iconSize + Config.drumPadding);

      this.icons.push(icon);
      this.drum.addChild(icon);
    }
  }

  createBorder() {
    const border = new PIXI.Graphics();
    border.lineStyle(Config.drumBorderSize, 0xffd700);
    border.drawRoundedRect(
      Config.drumBorderSize / 2,
      0,
      Config.iconSize + Config.drumBorderSize,
      Config.visibleRows * Config.iconSize +
        Config.drumPadding * (Config.visibleRows - 1),
      20
    );
    this.drum.addChildAt(border, 1);
  }

  spin() {
    this.spinning = true;
    this.speed = Config.spinSpeed;
    // Воспроизведение звука
    SoundManager.play("spinStart");
    SoundManager.play("spinning");
    console.log("this.icons:", this.icons);
    // console.log('До if');
    // if(this.tempIcon) return;
    // console.log('ПОСЛЕ if');
    // this.createTempIcons(this.initTempIconY);
  }

  createTempIcons(positionY) {
    // console.log('/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////');

    // if (this.tempIcon) this.drum.removeChild(this.tempIcon);

    this.tempIcon = new PIXI.Sprite(this.getRandomTexture());
    this.tempIcon.width = Config.iconSize;
    this.tempIcon.height = Config.iconSize;
    this.tempIcon.x = Config.drumBorderSize;
    this.tempIcon.y = positionY;
    // console.log('this.tempIcon.y////////////////////////////////////////////////////////////////////////////////////////////////////////////:', this.tempIcon.y);
    this.icons.push(this.tempIcon);
    // console.log('this.icons:', this.icons);
    this.drum.addChild(this.tempIcon);
    console.log("this.drum:", this.drum);
  }

  update(delta) {
    if (!this.spinning) return;
    const moveDistance = this.speed * delta;
    const exactStep = Config.iconSize + Config.drumPadding;
    const visibleHeight = Config.visibleRows * exactStep;
    // console.log('this.icons:', this.icons);

    let newIcons = null;
    // const moveDistance = this.speed * delta;
    // console.log('this.icons:', this.icons);
    const count = this.icons.length; // Кэшируем длину
    // console.log('count:', count);
    // console.log('this.drum.children.length:', this.drum.children.length);

    for (let i = 0; i < count; i++) {
      this.icons[i].y += moveDistance; // for быстрее forEach
      // console.log('moveDistance:', moveDistance);
      // console.log('this.icons[i].y:', this.icons[i].y);
      // const remainder = this.icons[i].y % exactStep;
      // if (Math.abs(remainder) < 2) {
      //   // console.log('в проходе по массиву');
      //   this.icons[i].y = Math.round(this.icons[i].y / exactStep) * exactStep;
      //   // console.log('this.icons[i].y:', this.icons[i].y);
      //   this.icons[i].y += moveDistance;
      // }
      if (this.icons[i].y >= visibleHeight) {
        // console.log("вышло из зоны:", this.icons[i].y);

        // toRemove.push(this.icons[i]);
        // console.log('this.icons ДО:', this.icons);
        newIcons = this.icons.filter((icon) => icon !== this.icons[i]);
        // this.icons = toRemove;
        // console.log('this.icons ПОСЛЕ:', this.icons);
        this.drum.removeChild(this.icons[i]);

        // this.icons[i].destroy();
      }
      // console.log('this.icons[i].y:', this.icons[i].y);
      // console.log('count ПОСЛЕ:', count);
    }

    if (this.tempIcon) {
      // console.log('this.tempIcon.y:', this.tempIcon.y);
      if (this.tempIcon.y >= 0 && this.tempIcon.y <= moveDistance) {
        // console.log("if 2:", this.tempIcon.y);
        this.icons = newIcons;
        this.recycleSymbol(this.tempIcon.y - exactStep);
        // newIcons.push(this.tempIcon)
      }
      // const new2Icons = this.icons.filter((icon) =>   icon === this.tempIcon);
    }
    // console.log('this.icons:', this.icons);
  }

  recycleSymbol(positionY) {
    // console.log('recycleSymbol:', recycleSymbol);
    // if (this.tempIcon) {
    // this.icons.push(this.tempIcon);
    // this.tempIcon = null;
    // }
    this.createTempIcons(positionY);
  }

  stop() {
    console.log("после рекурсии");
    this.finalizeSymbols();
    this.spinning = false;
    // Animations.bounceAnimation(
    //   () => this.finalizeSymbols(),
    //   this.drum,
    //   this.originalY,
    //   this.app.ticker
    // );
  }

  finalizeSymbols() {
    // console.log("стоп");
    const fIcons = [];
    for (let i = 2; i < this.drum.children.length; i++) {
      // console.log("i:", i);

      fIcons.push(this.drum.children[i]);
      // console.log('this.drum.children[i]:', this.drum.children[i]);
    }
    // console.log('this.fIcons:', this.fIcons);
    this.icons = fIcons;
    // console.log('this.icons:', this.icons);
    this.icons.reverse().forEach((f, i) => {
      // console.log("f.y ДОООООООО:", f.y);
      // const originalX = (f.x = Config.drumBorderSize);
      const originalY = (f.y =
        (i - 1) * (Config.iconSize + Config.drumPadding));
      // const bounceDistance = Config.bounceDistance / 2;
      const bounceDistance = Config.bounceDistance;
      let bounceDirection = 1; // 1 = вниз, -1 = вверх

      const animate = (delta) => {
        // console.log('анимация началась');

        // if (onComplete) onComplete();
        f.y += 8 * bounceDirection * delta;

        if (bounceDirection === 1 && f.y >= originalY + bounceDistance) {
          bounceDirection = -1; // Меняем направление
        } else if (bounceDirection === -1 && f.y <= originalY) {
          f.y = originalY;
          this.app.ticker.remove(animate);
        }
      };

      this.app.ticker.add(animate);
      // console.log('анимация закончилась');
      return animate; // Возвращаем функцию для возможности ранней отмены
      // console.log("f.y ПОСЛЕЕЕЕЕЕЕЕ:", f.y);
    });
    console.log("this.icons:", this.icons);

    // console.log("finalizeSymbols this.drum.children:", this.drum.children);
  }

  getRandomTexture() {
    return this.textures[Math.floor(Math.random() * this.textures.length)];
  }
}
