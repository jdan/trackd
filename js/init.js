var FIREBASE_ROOT = 'https://trackd-fb.firebaseio.com/boards/';
var HASH_LENGTH = 6;

if (document.location.hash.length < HASH_LENGTH) {
  document.location.hash = randomHash();
}

var BOARD_ID = document.location.hash.slice(1);
var boardRef = new Firebase(FIREBASE_ROOT + BOARD_ID);

function randomHash(length) {
  length = length || HASH_LENGTH;

  var chars = '0123456789abcdef';
  var i, build = '';

  for (i = 0; i < length; i++) {
    build += chars[Math.floor(Math.random() * chars.length)];
  }

  return build;
}
