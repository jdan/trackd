var newCard = document.getElementById('new-card');

newCard.onclick = function (e) {
  /* Element which will hold the card */
  var el = document.createElement('div');
  el.className = "card";

  this.parentNode.insertBefore(el, this.nextSibling);

  React.renderComponent(CardView({ card: new Card() }), el);
};
