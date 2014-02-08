/** @jsx React.DOM */

var Hello = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.renderComponent(<Hello name="Jordan" />, document.getElementById("dashboard"));
