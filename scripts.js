const form = document.querySelector('form');
const output = document.querySelector('output');
const firstInput = document.querySelector('#first-num');
const secondInput = document.querySelector('#second-num');
const operatorSelect = document.querySelector('#operator');

const buttons = Array.from(document.querySelectorAll('#error-btns > button'));
const [
  btnConsoleLog,
  btnConsoleError,
  btnConsoleCount,
  btnConsoleWarn,
  btnConsoleAssert,
  btnConsoleClear,
  btnConsoleDir,
  btnConsoleDirXML,
  btnConsoleGroupStart,
  btnConsoleGroupEnd,
  btnConsoleTable,
  btnStartTimer,
  btnEndTimer,
  btnConsoleTrace,
  btnTriggerGlobalError
] = buttons;

form.addEventListener('submit', e => {
  e.preventDefault();

  try {

    const a = parseFloat(firstInput.value);
    const b = parseFloat(secondInput.value);
    const op = operatorSelect.value;

    if (isNaN(a) || isNaN(b)) {

      throw new Error('Both inputs must be valid numbers.');
    }

    if (op === '/' && b === 0) {

      class DivisionByZeroError extends Error {
        constructor(message) {
          super(message);
          this.name = 'DivisionByZeroError';
        }
      }
      throw new DivisionByZeroError('Cannot divide by zero.');
    }

    const result = eval(`${a} ${op} ${b}`);
    output.textContent = result;
  } catch (err) {

    console.error(`Calculation failed: ${err.name}: ${err.message}`);
    output.textContent = `Error: ${err.message}`;
  } finally {

    firstInput.value = '';
    secondInput.value = '';
  }
});

btnConsoleLog.addEventListener('click', () => {
  console.log('Hello from console.log! This is a demo message.');
});

btnConsoleError.addEventListener('click', () => {
  console.error('This is a console.error() demonstration—looks like a real error in red.');
});

btnConsoleCount.addEventListener('click', () => {
  console.count('CounterDemo'); 

});

btnConsoleWarn.addEventListener('click', () => {
  console.warn('console.warn: Be careful! This is just a demo warning.');
});

btnConsoleAssert.addEventListener('click', () => {

  console.assert(1 + 1 === 3, 'Assertion failed: 1 + 1 should equal 2.');
});

btnConsoleClear.addEventListener('click', () => {
  console.clear();
});

btnConsoleDir.addEventListener('click', () => {

  const sampleObj = { name: 'Lab9', version: 1.0, items: [1, 2, 3] };
  console.dir(sampleObj);
});

btnConsoleDirXML.addEventListener('click', () => {

  const mainElem = document.querySelector('main');
  console.dirxml(mainElem);
});

btnConsoleGroupStart.addEventListener('click', () => {
  console.group('My Grouped Messages');
  console.log('↪ first message inside group');
  console.log('↪ second message inside group');
});
btnConsoleGroupEnd.addEventListener('click', () => {
  console.groupEnd();
});

btnConsoleTable.addEventListener('click', () => {

  const people = [
    { name: 'Alice', age: 30, role: 'Dev' },
    { name: 'Bob', age: 25, role: 'Designer' },
    { name: 'Carol', age: 28, role: 'PM' }
  ];
  console.table(people);
});

btnStartTimer.addEventListener('click', () => {
  console.time('DemoTimer');
});
btnEndTimer.addEventListener('click', () => {
  console.timeEnd('DemoTimer');
});

btnConsoleTrace.addEventListener('click', () => {
  function a() {
    b();
  }
  function b() {
    c();
  }
  function c() {
    console.trace('Here is a stack trace demo—calls: a→b→c');
  }
  a();
});

window.onerror = function (message, source, lineno, colno, errorObj) {
  console.log(
    `[Global handler caught] ${message} at ${source}:${lineno}:${colno}`
  );

  return true;
};

btnTriggerGlobalError.addEventListener('click', () => {

  noSuchFunction(); 
});