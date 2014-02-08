/**
 * Pads a given string by adding `padChar` to the front until
 * the string is `n` characters long
 *
 * pad('5', 2) => '02'
 * pad('213', 2) => '213'
 * pad('1', 5, 'x') => 'xxxx1'
 */
function pad(str, n, padChar) {
  padChar = padChar || '0';   /* default: '0' */
  str = str + '';             /* make sure str is actually a string */

  if (str.length < n) {
    return new Array(n - str.length + 1).join(padChar) + str;
  } else {
    return str;
  }
}

/**
 * Formats a given time (in seconds)
 * Output: XXhrXXmXXs
 */
function formatTime(timeInSeconds) {
  var formattedTime = '';

  var seconds = timeInSeconds % 60;
  var minutes = Math.floor(timeInSeconds / 60) % 60;
  var hours = Math.floor(timeInSeconds / 60 / 60);

  if (hours > 0) {
    formattedTime += pad(hours, 2) + 'hr';
  }

  if (minutes > 0) {
    formattedTime += pad(minutes, 2) + 'm';
  }

  formattedTime += pad(seconds, 2) + 's';

  return formattedTime;
}
