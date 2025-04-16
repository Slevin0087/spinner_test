export class ResponseDisplay {
  /**
   * Создает компонент для отображения текста ответа
   * @param {string} selector - ID DOM-элемента для вывода
   */
  constructor(selector) {
    this.element = document.getElementById(selector);
    if (!this.element) {
      console.error(`Элемент с ID "${selector}" не найден`);
    }
  }

  /**
   * Устанавливает текст в элемент
   * @param {string} text - Текст для отображения
   */
  setText(text) {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  /**
   * Показывает анимацию временной загрузки
   */
  showLoading() {
    if (this.element) {
      this.element.textContent = "...";
      this.element.style.animation = "pulse 1s infinite";
    }
  }

  /**
   * Сбрасывает анимацию
   */
  reset() {
    if (this.element) {
      this.element.style.animation = "";
    }
  }
}

// Стили можно добавить в CSS:
/*
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  */
