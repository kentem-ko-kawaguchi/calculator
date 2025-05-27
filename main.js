'use strict';

class UIElements {
  constructor() {
    const get = ids => ids.map(id => document.getElementById(id));

    this.menuBtns = get(['menu3', 'scale', 'history']);
    this.memoryBtns = get(['mc', 'mr', 'mPlus', 'mMinus', 'ms', 'mDone']);
    this.calcBtns = get([
      'percent', 'ce', 'c', 'cancel',
      'fraction', 'square', 'sqrt', 'divide',
      'seven', 'eight', 'nine', 'multiply',
      'four', 'five', 'six', 'subtract',
      'one', 'two', 'three', 'add',
      'negative', 'zero', 'decimal', 'equals'
    ]);
    this.formulaDisplay = document.getElementById('formula');
    this.resultDisplay = document.getElementById('result');
  }
}

class CalculatorLogic {
  constructor(ui) {
    this.ui = ui;
    this.calc = [];
    this.calcNumber = [];
    this.expression = "";
    this.answer = 0;
    this.ansflag = false;
  }

  handleButton(btn) {
    const id = btn.id;

    if (this.calc[0] === 0) this.calc.pop();

    if (id === 'equals') {
      try {
        this.clearCalcNumber('=');
        this.calc = [this.answer];
        this.ansflag = true;
        this.calculate(false);
      } catch {
        this.ui.resultDisplay.textContent = 'Error';
      }
      return;
    }

    if (id === 'c') {
      this.reset();
    } else {
      this.updateFormula(btn.textContent);
    }
  }

  reset() {
    this.calc = [0];
    this.calcNumber = [];
    this.ansflag = false;
    this.ui.formulaDisplay.textContent = this.calc.join('');
    this.ui.resultDisplay.textContent = 0;
  }

  updateFormula(value) {
    if (!isNaN(value)) {
      if (this.ansflag) this.reset();
      this.appendNumber(value);
    } else {
      this.ansflag = false;
      this.clearCalcNumber(value);
    }
  }

  appendNumber(number) {
    this.calc.push(number);
    this.calcNumber.push(number);
    this.expression = this.calcNumber.join('');
    this.ui.resultDisplay.textContent = this.expression;
    this.calculate(true);
  }

  clearCalcNumber(value) {
    this.calc.push(value);
    this.calcNumber = [];
    this.ui.formulaDisplay.textContent = this.calc.join('');
  }

  calculate(updateFormula) {
    this.expression = this.calc.join('');
    try {
      this.answer = Function(`"use strict"; return (${this.expression})`)();
      this.ui.resultDisplay.textContent = this.answer;
      if (updateFormula) this.ui.formulaDisplay.textContent = this.expression;
    } catch {
      this.ui.resultDisplay.textContent = 'Error';
    }
  }
}

class CalculatorApp {
  constructor() {
    const ui = new UIElements();
    const logic = new CalculatorLogic(ui);
    [...ui.menuBtns, ...ui.memoryBtns, ...ui.calcBtns].forEach(btn =>
      btn.addEventListener('click', () => logic.handleButton(btn))
    );
  }
}

new CalculatorApp();
