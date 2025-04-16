export class BalanceDisplay {
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
      this.element.classList.add('balance-change');
      setTimeout(() => {
        this.element.classList.remove('balance-change');
      }, 1000);
    }
  }
  
  // Аналогично для BetDisplay и WinDisplay