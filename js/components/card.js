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
    clock.addCallback(this.id, this.tick.bind(this));
  },
  componentWillUnmount: function() {
    clock.clearCallback(this.id);
  },
  render: function() {
    return (
      <div>Id: {this.state.id}<br/>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});
