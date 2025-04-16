export class ResponseDisplay {
  constructor(selector) {
    this.element = document.getElementById(selector);
    if (!this.element) {
      console.error(`Элемент с ID "${selector}" не найден`);
    }
  }

  setText(text) {
    if (this.element) {
      this.element.textContent = text;
    }
  }

  showLoading() {
    if (this.element) {
      this.element.textContent = "...";
      this.element.style.animation = "pulse 1s infinite";
    }
  }

  reset() {
    if (this.element) {
      this.element.style.animation = "";
    }
  }
}

/*
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
  }
  */
