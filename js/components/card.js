/** @jsx React.DOM */

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
    this.card = this.props.card;

    /* Punch in if the card has no log */
    if (!this.card.log.length) {
      this.card.punchIn();
    }

    return {
      totalTime: 0,
      sessionTime: 0,
      editingName: false
    };
  },

  handleSwitch: function () {
    if (this.card.running) {
      this.card.punchOut();
    } else {
      this.card.punchIn();
    }

    /* Change the state */
    this.tick();
  },

  handleNameClick: function () {
    this.setState({ editingName: true });
  },

  handleNameSubmit: function (e) {
    e.preventDefault();

    this.card.name = this.refs.nameInput.getDOMNode().value;
    this.setState({ editingName: false });
  },

  tick: function () {
    this.setState({
      totalTime: this.card.total(),
      sessionTime: this.card.session()
    });
  },

  componentDidMount: function () {
    clock.addCallback(this.card.id, this.tick);
  },

  componentWillUnmount: function () {
    clock.clearCallback(this.card.id);
  },

  render: function () {
    var nameControl;

    /**
     * Controls for editing the card title
     */
    if (this.state.editingName) {
      nameControl = (
        <div className="card-title">
          <form onSubmit={this.handleNameSubmit}>
            <input autofocus className="title-input" ref="nameInput" defaultValue={this.card.name} />
          </form>
        </div>
      );
    } else {
      nameControl = (
        <div className="card-title" onClick={this.handleNameClick}>
          {this.card.name}
        </div>
      );
    }

    return (
      <div className={"bg bg-" + this.card.color}>
        {nameControl}

        <div className="card-heading">total</div>
        <div className="card-field">{formatTime(this.state.totalTime)}</div>

        <div className="card-heading">
          {this.card.running ? "current session" : "last session"}
        </div>
        <div className="card-field">{formatTime(this.state.sessionTime)}</div>

        <div className="card-actions">
          <div onClick={this.handleSwitch} onTouchEnd={this.handleSwitch} className="button">
            {this.card.running ? "Stop" : "Start"}
          </div>
        </div>
      </div>
    );
  }
});
