'use strict';
{
  const nemuBtns = [
    document.getElementById('menu3'),
    document.getElementById('scale'),
    document.getElementById('history'),
  ]
  const nemu2Btns = [
    document.getElementById('mc'),
    document.getElementById('mr'),
    document.getElementById('mPlus'),
    document.getElementById('mMinus'),
    document.getElementById('ms'),
    document.getElementById('mDone'),
  ]

  const tds = [
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

  nemuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      checkBtn(btn);
    });
  });
  nemu2Btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      checkBtn(btn);
    });
  });

  tds.forEach((btn) => {
    btn.addEventListener('click', () => {
      checkBtn(btn);
    });
  });

  const formula = document.getElementById("formula");
  const result = document.getElementById("result");
  let calc = [];
  let calcNumber = [];
  let expression;
  let answer;
  let ansflag = false;

  function checkBtn(btn) {
    if (calc[0] === 0) {
      calc.pop();
    }
    if (btn.id === "equals") {
      try {
        clearCalcNumber("=");
        calc = [answer];
        ansflag = true;
        calculation(false);

      } catch (e) {
        result.textContent = "Error";
      }
      return;
    } else if (btn.id === "c") {
      ansflag = false;
      calc = [0];
      clear();
    } else {
      updateFormula(btn.textContent);
    }
  }
  
  function clear() {
    formula.textContent = calc.join("");
  }
  
  function updateFormula(object) {
    if (!isNaN(object) && !ansflag) {
      updateCalcNumber(object);
    } else if (!isNaN(object) && ansflag) {
      calc = [];
      ansflag = false;
      updateCalcNumber(object);
    }
    else {
      ansflag = false;
      clearCalcNumber(object);
    }
  }

  function updateCalcNumber(number) {
    calc.push(number);
    calcNumber.push(number);
    calculation(true);
    expression = calcNumber.join("");
    result.textContent = expression;
  }

  function clearCalcNumber(object) {
    calc.push(object);
    calcNumber = [];
    formula.textContent = calc.join("");
  }

  function calculation(ans) {
    expression = calc.join("");
    answer = Function(`return ${expression}`)();
    result.textContent = answer;
    if (ans)
      formula.textContent = expression;
  }
}