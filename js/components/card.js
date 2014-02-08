/** @jsx React.DOM */

/* Store an auto-incrementing cardId for all newly-created cards */
var cardId = 1;

/**
 * A CardView holds
 * - an instance of the Card class
 * - the total time elapsed
 * - the current session's time elapsed
 */
var CardView = React.createClass({

  /**
   * The state of this view includes an id and a Card instance
   */
  getInitialState: function () {
    this.id = cardId++;
    this.card = new Card('Card ' + this.id);

    /* Punch in right away - for now */
    this.card.punchIn();

    return {
      totalTime: 0,
      sessionTime: 0
    };
  },

  tick: function () {
    this.setState({
      totalTime: this.card.total(),
      sessionTime: this.card.session()
    });
  },

  componentDidMount: function () {
    clock.addCallback(this.id, this.tick);
  },

  componentWillUnmount: function () {
    clock.clearCallback(this.id);
  },

  render: function () {
    return (
      <div>
        <div className="card-title">{this.card.name}</div>

        <div className="card-heading">total</div>
        <div className="card-field">{formatTime(this.state.totalTime)}</div>

        <div className="card-heading">session</div>
        <div className="card-field">{formatTime(this.state.sessionTime)}</div>
      </div>
    );
  }
});
