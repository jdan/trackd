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
      editingName: false,
      showLog: false
    };
  },

  handleSwitch: function (e) {
    e.preventDefault();

    if (this.card.running) {
      this.card.punchOut();
    } else {
      this.card.punchIn();
    }

    /* Change the state */
    this.tick();
  },

  handleNameClick: function (e) {
    e.preventDefault();
    this.setState({ editingName: true });
  },

  handleNameSubmit: function (e) {
    e.preventDefault();

    this.card.name = this.refs.nameInput.getDOMNode().value;
    this.card.save();
    this.setState({ editingName: false });
  },

  handleLogDisplay: function (e) {
    e.preventDefault();
    this.setState({ showLog: true });
  },

  handleLogDismiss: function (e) {
    e.preventDefault();
    this.setState({ showLog: false });
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
    var nameControl, logControl;

    /**
     * Controls for editing the card title
     */
    if (this.state.editingName) {
      nameControl = (
        <div className="card-title">
          <form onSubmit={this.handleNameSubmit}>
            <input autoFocus className="title-input" ref="nameInput" defaultValue={this.card.name} />
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

    /**
     * Log display
     */
    if (this.state.showLog) {
      var logItems = [];
      var log = this.card.prettyLog();
      var i, j, ul;

      for (i = 0; i < log.length; i++) {
        /* Each item is a day */
        logItems.push(<h4 className="card-subheading">{log[i].date}</h4>);
        ul = [];

        for (j = 0; j < log[i].punches.length; j++) {
          ul.push(
            <li className="card-li">
              {log[i].punches[j][0]} - {log[i].punches[j][1]} ({log[i].punches[j][2]})
            </li>
          );
        }

        logItems.push(<ul className="card-ul">{ul}</ul>);
      }

      logControl = (
        <div className="modal">
          <a href="#" onClick={this.handleLogDismiss} className="modal-dismiss">×</a>
          <div className="modal-body">
            <div className="card-title">{this.card.name}</div>
            {logItems}
          </div>
        </div>
      );
    } else {
      logControl = "";
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
          <a href="#" onClick={this.handleSwitch} className="button">
            {this.card.running ? "Stop" : "Start"}
          </a>

          <a href="#" onClick={this.handleLogDisplay} className="button">
            Log
          </a>
        </div>

        {logControl}
      </div>
    );
  }
});
