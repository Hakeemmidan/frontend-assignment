// Checks if image is exists
// Source: https://stackoverflow.com/a/18837750/7974948
export const checkIfImageExists = (url, callback) => {
  const img = new Image();

  img.src = url;

  if (img.complete) {
    callback(true);
  } else {
    img.onload = () => {
      callback(true);
    };
    
    img.onerror = () => {
      callback(false);
    };
  }
}

// Always one show one decimal number for 'num'
// Rounds if there are more than one decimal existing in input ('num')
// Source: https://stackoverflow.com/a/6134070/7974948
export const showOneDecimal = (num) => (
  (Math.round(num * 100) / 100).toFixed(1)
);

// Debounce a function to only get called once every 'delay' milliseconds
// Source: https://dev.to/monaye/refactor-davidwalsh-s-debounce-function-5afc
export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    const boundFunc = func.bind(this, ...args);
    clearTimeout(timerId);
    timerId = setTimeout(boundFunc, delay);
  };
};