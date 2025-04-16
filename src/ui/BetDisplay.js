export class BetDisplay {
  constructor(selector) {
    this.element = document.getElementById(selector);
  }

  setText(text) {
    if (this.element) {
      this.element.textContent = text;
      this.animateChange();
    }
  }

  animateChange() {
    this.element.classList.add("bet-change");
    setTimeout(() => {
      this.element.classList.remove("bet-change");
    }, 1000);
  }
}
