/** @jsx React.DOM */

/* Store an auto-incrementing cardId for all newly-created cards */
var cardId = 1;

var Card = React.createClass({
  getInitialState: function() {
    return {
      id: cardId++,
      secondsElapsed: 0
    };
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    clock.addCallback(this.state.id, this.tick);
  },
  componentWillUnmount: function() {
    clock.clearCallback(this.state.id);
  },
  render: function() {
    return (
      <div>
        <div className="card-title">{this.state.id}</div>
        <div className="card-time">{this.state.secondsElapsed}</div>
      </div>
    );
  }
});
