import { Config } from "../config/config.js";

export const Animations = {
  bounceAnimation(onComplete = null, container, originalY, ticker) {
    const bounceDistance = Config.bounceDistance;
    let bounceDirection = 1;

    const animate = (delta) => {
      if (onComplete) onComplete();
      container.y += 8 * bounceDirection * delta;

      if (bounceDirection === 1 && container.y >= originalY + bounceDistance) {
        bounceDirection = -1;
      } else if (bounceDirection === -1 && container.y <= originalY) {
        container.y = originalY;
        ticker.remove(animate);
      }
    };

    ticker.add(animate);
    return animate;
  },

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
