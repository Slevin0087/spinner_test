export class WinDisplay {
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
    this.element.classList.add("win-change");
    setTimeout(() => {
      this.element.classList.remove("win-change");
    }, 1000);
  }
}