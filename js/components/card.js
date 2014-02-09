/**
 * A CardView holds
 * - an instance of the Card class
 * - the total time elapsed
 * - the current session's time elapsed
 */
var CardView = React.createClass({displayName: 'CardView',

  /**
   * The state of this view includes an id and a Card instance
   */
  getInitialState: function () {
    this.card = this.props.card;

    /* Punch in if the card has no log */
    if (!this.card.running && !this.card.log.length) {
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

  handleDeleteClick: function (e) {
    e.preventDefault();

    if (confirm('Are you sure you want to delete - ' + this.card.name + '?')) {
      this.card.destroy();
    }
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
        React.DOM.div( {className:"card-title"},
          React.DOM.form( {onSubmit:this.handleNameSubmit, onBlur:this.handleNameSubmit},
            React.DOM.input( {autoFocus:true, className:"title-input", ref:"nameInput", defaultValue:this.card.name} )
          )
        )
      );
    } else {
      nameControl = (
        React.DOM.div( {className:"card-title", onClick:this.handleNameClick},
          this.card.name
        )
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
        logItems.push(React.DOM.h4( {className:"card-subheading"}, log[i].date));
        ul = [];

        /* in case punches isn't defined */
        log[i].punches = log[i].punches || [];

        for (j = 0; j < log[i].punches.length; j++) {
          ul.push(
            React.DOM.li( {className:"card-li"},
              log[i].punches[j][0], " - ", log[i].punches[j][1], " (",log[i].punches[j][2],") "
            )
          );
        }

        logItems.push(React.DOM.ul( {className:"card-ul"}, ul));
      }

      logControl = (
        React.DOM.div( {className:"modal"},
          React.DOM.a( {href:"#", onClick:this.handleLogDismiss, className:"modal-dismiss"}, "×"),
          React.DOM.div( {className:"modal-body"},
            React.DOM.div( {className:"card-title"}, this.card.name),
            logItems
          )
        )
      );
    } else {
      logControl = "";
    }

    return (
      React.DOM.div( {className:"bg bg-" + this.card.color},
        nameControl,

        React.DOM.div( {className:"card-heading"}, "total"),
        React.DOM.div( {className:"card-field"}, formatTime(this.state.totalTime)),

        React.DOM.div( {className:"card-heading"},
          this.card.running ? "current session" : "last session"
        ),
        React.DOM.div( {className:"card-field"}, formatTime(this.state.sessionTime)),

        React.DOM.div( {className:"card-actions"},
          React.DOM.a( {href:"#", onClick:this.handleSwitch, className:"button"},
            this.card.running ? "Stop" : "Start"
          ),

          React.DOM.a( {href:"#", onClick:this.handleLogDisplay, className:"button"},
            " Log "
          ),

          React.DOM.a( {href:"#", onClick:this.handleDeleteClick, className:"button button-delete"},
            " Delete "
          )
        ),

        logControl
      )
    );
  }
});
