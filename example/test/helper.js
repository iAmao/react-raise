import axios from 'axios';

/**
 * Set the a value inside localStorage
 * @export
 * @param {String} key - key to store value with in localStorage
 * @param {String} value - item to store inside localStorage
 * @returns {Promise} returns a promise and resolves it with the stored value
 */
export function setLocalstorage(key, value) {
  let storedValue;
  return new Promise((resolve) => {
    window.localStorage.setItem(key, value);
    storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      resolve(storedValue);
    }
  });
}

/**
 * set a default header in axios
 * @export
 * @param {String} header - header name to set
 * @param {String} value - value to set header as
 * @returns {Void} does not have a return value
 */
export function setDefaultHeader(header, value) {
  axios.defaults.headers.common.Authorization = value;
}


/**
 * clear or remove one or all items from localStorage
 * @export
 * @param {String} key - item to remove in localStorage
 * @returns {Void} does not have a return value
 */
export function clearStorage(key) {
  if (!key) {
    window.localStorage.clear();
  } else {
    window.localStorage.removeItem(key);
  }
}
