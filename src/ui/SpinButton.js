export class SpinButton {
  constructor(selector, onClick) {
    this.element = document.getElementById(selector);
    this.element.addEventListener("click", onClick);
  }

  setEnabled(state) {
    this.element.disabled = !state;
  }
}
