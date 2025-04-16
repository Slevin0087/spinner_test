import { Config } from "../config/config.js";

export class SoundManager {
    static sounds = {};
    
    static async init() {
      if (Howler) {
        // Инициализация звуков
        for (const [key, path] of Object.entries(Config.sounds)) {
          this.sounds[key] = new Howl({
            src: [path],
            preload: true
          });
        }
      }
    }
    
    static play(key, options = {}) {
      if (this.sounds[key]) {
        const sound = this.sounds[key];
        sound.volume(options.volume || 1);
        sound.play();
      }
    }
    
    static stop(key) {
      if (this.sounds[key]) {
        this.sounds[key].stop();
      }
    }
    
    static setMuted(muted) {
      Howler.mute(muted);
    }
  }