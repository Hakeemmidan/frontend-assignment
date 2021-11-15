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