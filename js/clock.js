/**
 * Global clock class
 * Maintains a list of callbacks to execute on an interval
 */

function Clock(interval) {
  this.interval = interval;
  this.callbacks = {};
  this.timer = null;

  /* Start the clock automatically */
  this.start();
}

Clock.prototype.start = function () {
  this.timer = setInterval(this.dispatch.bind(this), this.interval);
};

Clock.prototype.stop = function () {
  clearInterval(this.timer);
};

Clock.prototype.dispatch = function () {
  for (var id in this.callbacks) {
    this.callbacks[id]();
  }
};

Clock.prototype.addCallback = function (id, callback) {
  this.callbacks[id] = callback;
};

Clock.prototype.clearCallback = function (id) {
  delete this.callbacks[id];
};


/* Create a global clock object */
var INTERVAL_MS = 1000;
var clock = new Clock(INTERVAL_MS);
