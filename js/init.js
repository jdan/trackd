var FIREBASE_ROOT = 'https://trackd-fb.firebaseio.com/boards/';
var BOARD_ID = document.hash || 'noid';
var boardRef = new Firebase(FIREBASE_ROOT + BOARD_ID);
