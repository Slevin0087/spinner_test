import { Config } from "../config/config.js";

export const Animations = {
  /**
   * Анимация отскока элемента
   * @param {Function} onComplete - Коллбек по завершении
   * @param {PIXI.Container} container - Контейнер PIXI для анимации
   * @param {number} originalY - Исходная позиция Y
   * @param {PIXI.Ticker} ticker - Экземпляр PIXI.Ticker
   */
  bounceAnimation(onComplete = null, container, originalY, ticker) {    
    const bounceDistance = Config.bounceDistance;
    let bounceDirection = 1; // 1 = вниз, -1 = вверх

    const animate = (delta) => {
      if (onComplete) onComplete();
      container.y += 8 * bounceDirection * delta;

      if (bounceDirection === 1 && container.y >= originalY + bounceDistance) {
        bounceDirection = -1; // Меняем направление
      } else if (bounceDirection === -1 && container.y <= originalY) {
        container.y = originalY;
        ticker.remove(animate);
      }
    };

    ticker.add(animate);
    return animate; // Возвращаем функцию для возможности ранней отмены
  },

  /**
   * Анимация плавного замедления
   * @param {Object} target - Целевой объект
   * @param {string} property - Свойство для анимации
   * @param {number} targetValue - Конечное значение
   * @param {number} duration - Длительность в мс
   * @param {PIXI.Ticker} ticker - Экземпляр PIXI.Ticker
   */
  easeTo(target, property, targetValue, duration, ticker) {
    const startValue = target[property];
    const startTime = Date.now();

    const animate = (delta) => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      target[property] = startValue + (targetValue - startValue) * progress;

      if (progress === 1) {
        ticker.remove(animate);
      }
    };

    ticker.add(animate);
  },
};
