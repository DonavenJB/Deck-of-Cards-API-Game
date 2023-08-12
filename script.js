// Variable to store the deck ID, which will be used in subsequent API calls
let deckId = '';

// Fetch a new shuffled deck from the Deck of Cards API
// The API creates a new deck and shuffles it
fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  // Convert the raw response into a JSON object
  .then(res => res.json())
  // Extract the deck ID from the JSON data and store it for later use
  .then(data => {
    deckId = data.deck_id;
  })
  // Log any errors that occur during the fetch operation
  .catch(err => {
    console.log(`error ${err}`);
  });

// Attach a click event listener to the draw cards button
document.querySelector('#drawCardsButton').addEventListener('click', getFetch);

// Function to draw two cards from the deck and determine the winner
function getFetch() {
  // Construct the URL for drawing two cards from the deck
  const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  // Fetch the cards from the API
  fetch(url)
    // Convert the raw response into a JSON object
    .then(res => res.json())
    // Extract the drawn cards from the JSON data
    .then(data => {
      // Convert the card values to numerical values for comparison
      let val1 = cardValue(data.cards[0].value);
      let val2 = cardValue(data.cards[1].value);
      // Update the images to display the drawn cards
      document.querySelector('#player1').src = data.cards[0].image;
      document.querySelector('#player2').src = data.cards[1].image;
      // Determine and display the winner or a tie
      if (val1 > val2) {
        document.querySelector('h3').innerText = 'player 1 WON!';
      } else if (val1 < val2) {
        document.querySelector('h3').innerText = 'player 2 WON!';
      } else {
        document.querySelector('h3').innerText = 'WAR';
      }
    })
    // Log any errors that occur during the fetch operation
    .catch(err => {
      console.log(`error ${err}`);
    });
}

// Function to convert card value strings to numerical values for comparison
function cardValue(val) {
  // Assign numerical values to face cards
  if (val === "ACE") return 14;
  if (val === "KING") return 13;
  if (val === "QUEEN") return 12;
  if (val === "JACK") return 11;
  // For numerical cards, convert the string to a number
  return parseInt(val, 10);
}
