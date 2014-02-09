boardRef.child('cards').on('child_added', function (snapshot) {
  var val = snapshot.val();
  if (val === null) return;

  renderCard(new Card(val));
});

document.getElementById('new-card').onclick = function (e) {
  (new Card()).save();
};

function renderCard(card) {
  var newCard = document.getElementById('new-card');

  /* Element which will hold the card */
  var el = document.createElement('div');
  el.className = 'card';
  newCard.parentNode.insertBefore(el, newCard.nextSibling);

  React.renderComponent(CardView({ card: card }), el);
}
