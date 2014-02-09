var COLOR_CLASSES = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];

/**
 * Card class
 *
 * Cards consist of a log of start and end times
 */

function Card(name, color) {
  this.name = name;
  this.color = color || COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)];

  this.id = Card.cardId++;    // I don't think we need this
  this.running = false;
  this.startTime = null;

  /**
   * Log of all times on the card
   * Each item is a 2-item array with a start and end time
   */
  this.log = [];
}


/**
 * Auto-incrementing id
 */
Card.cardId = 1;


/**
 * Punch in
 * In the future we may also want an initial time (i.e. 5 minutes ago)
 */
Card.prototype.punchIn = function () {
  this.startTime = Math.floor(new Date().getTime() / 1000);
  this.running = true;
};


/**
 * Punch out
 * Returns the session length
 */
Card.prototype.punchOut = function () {
  var endTime = Math.floor(new Date().getTime() / 1000);
  this.log.push([this.startTime, endTime]);
  this.running = false;

  return endTime - this.startTime;
};


/**
 * Returns the total time on the card
 */
Card.prototype.total = function () {
  var i;
  var total = 0;

  for (i = 0; i < this.log.length; i++) {
    total += this.log[i][1] - this.log[i][0];
  }

  /* Also add the current session time */
  if (this.running) {
    var now = Math.floor(new Date().getTime() / 1000);
    total += now - this.startTime;
  }

  return total;
};


/**
 * Returns the current session time on the card
 */
Card.prototype.session = function () {
  if (!this.running) {
    /* Return the last session's time */
    var lastPunch = this.log[this.log.length - 1];
    return lastPunch[1] - lastPunch[0];
  } else {
    /* Return the current run time */
    var now = Math.floor(new Date().getTime() / 1000);
    return now - this.startTime;
  }
};
