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
