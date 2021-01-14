const cardsURL = 'https://deckofcardsapi.com/api/deck';

// 1. draw from a newly shuffled deck, console.log value and suit

axios
	.get(`${cardsURL}/new/draw`)
	.then((res) => {
		for (let card of res.data.cards) {
			console.log(`${card.value} of ${card.suit}`);
		}
	})
	.catch((err) => console.log(err));

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

let firstDraw = null;
axios
	.get(`${cardsURL}/new/draw`)
	.then((res) => {
		firstDraw = res.data.cards[0];
		let deckID = res.data.deck_id;
		return axios.get(`${cardsURL}/${deckID}/draw`);
	})
	.then((res) => {
		let secondDraw = res.data.cards[0];
		for (let card of [ firstDraw, secondDraw ]) {
			console.log(`${card.value} of ${card.suit}`);
		}
	})
	.catch((err) => console.log(err));

// 3.  Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
const $btn = $('button');
const $cards = $('#cards');
let deck = null;

// first,on page load, go to the api and shuffle the deck to get the deck id
axios
	.get(`${cardsURL}/new/shuffle`)
	.then((res) => {
		deck = res.data.deck_id;
		$btn.show();
	})
	.catch((err) => console.log(err));

$btn.on('click', function() {
	axios.get(`${cardsURL}/${deck}/draw`).then((res) => {
		let card = res.data.cards[0];
		console.log(res.data.remaining);
		let cardImg = card.image;
		//display like example- random angles on top of each other
		// random angle
		let cardDispAngle = Math.random() * 90 - 45;
		// random x position with respect to 80px margin
		let cardDispX = Math.random() * 80 - 40;
		// random y position with respect to 80px margin
		let cardDispY = Math.random() * 80 - 40;
		// append to div
		$cards.append(
			`<img src=${cardImg} style="transform: translate(${cardDispX}px, ${cardDispY}px) rotate(${cardDispAngle}deg)">`
		);
		// handle end of deck by hiding button
		if (res.data.remaining === 0) {
			$btn.remove();
		}
	});
});
