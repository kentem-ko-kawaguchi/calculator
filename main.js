'use strict';

class UIElements {
  constructor() {
    this.menuBtns = [
      document.getElementById('menu3'),
      document.getElementById('scale'),
      document.getElementById('history'),
    ];
    this.memoryBtns = [
      document.getElementById('mc'),
      document.getElementById('mr'),
      document.getElementById('mPlus'),
      document.getElementById('mMinus'),
      document.getElementById('ms'),
      document.getElementById('mDone'),
    ];
    this.calcBtns = [
      document.getElementById('percent'),
      document.getElementById('ce'),
      document.getElementById('c'),
      document.getElementById('cancel'),
      document.getElementById('fraction'),
      document.getElementById('square'),
      document.getElementById('sqrt'),
      document.getElementById('divide'),
      document.getElementById('seven'),
      document.getElementById('eight'),
      document.getElementById('nine'),
      document.getElementById('multiply'),
      document.getElementById('four'),
      document.getElementById('five'),
      document.getElementById('six'),
      document.getElementById('subtract'),
      document.getElementById('one'),
      document.getElementById('two'),
      document.getElementById('three'),
      document.getElementById('add'),
      document.getElementById('negative'),
      document.getElementById('zero'),
      document.getElementById('decimal'),
      document.getElementById('equals'),
    ];
    this.formulaDisplay = document.getElementById("formula");
    this.resultDisplay = document.getElementById("result");
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
    if (this.calc[0] === 0) this.calc.pop();

    const id = btn.id;

    if (id === "equals") {
      try {
        this.clearCalcNumber("=");
        this.calc = [this.answer];
        this.ansflag = true;
        this.calculation(false);
      } catch (e) {
        this.ui.resultDisplay.textContent = "Error";
      }
      return;
    }

    if (id === "c") {
      this.ansflag = false;
      this.calc = [0];
      this.calcNumber = [];
      this.clear();
      this.ui.resultDisplay.textContent = 0;
    } else {
      this.updateFormula(btn.textContent);
    }
  }

  clear() {
    this.ui.formulaDisplay.textContent = this.calc.join("");
  }

  updateFormula(value) {
    if (!isNaN(value)) {
      if (this.ansflag) {
        this.calc = [];
        this.calcNumber = [];
        this.ansflag = false;
      }
      this.updateCalcNumber(value);
    } else {
      this.ansflag = false;
      this.clearCalcNumber(value);
    }
  }

  updateCalcNumber(number) {
    this.calc.push(number);
    this.calcNumber.push(number);
    this.calculation(true);
    this.expression = this.calcNumber.join("");
    this.ui.resultDisplay.textContent = this.expression;
  }

  clearCalcNumber(value) {
    this.calc.push(value);
    this.calcNumber = [];
    this.ui.formulaDisplay.textContent = this.calc.join("");
  }

  calculation(updateFormulaFlag) {
    this.expression = this.calc.join("");
    try {
      this.answer = Function(`"use strict"; return (${this.expression})`)();
      this.ui.resultDisplay.textContent = this.answer;
      if (updateFormulaFlag) {
        this.ui.formulaDisplay.textContent = this.expression;
      }
    } catch {
      this.ui.resultDisplay.textContent = "Error";
    }
  }
}

class CalculatorApp {
  constructor() {
    this.ui = new UIElements();
    this.logic = new CalculatorLogic(this.ui);
  }

  init() {
    [...this.ui.menuBtns, ...this.ui.memoryBtns, ...this.ui.calcBtns].forEach(btn => {
      btn.addEventListener('click', () => this.logic.handleButton(btn));
    });
  }
}

const app = new CalculatorApp();
app.init();
