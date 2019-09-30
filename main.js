var decks = [];
var hands = [];

var deckdirs = ["deck1","deck2"]

function getDeck(dnum)
{
	console.log("getting deck " + dnum + "...");
        var deckdir = deckdirs[dnum];
	$j.ajax({
		url:"get_images.php?dir=" + deckdir, 
                async:"false",
                dataType: "json",
		success: function(jdeck) {
			//console.log(jdeck1);
			//deckl = JSON.parse(data);
                        //deck1 = data;
                        //console.log(deck1);
                        var j = 0;
                        var deck = [];
                        for (i in jdeck) {
                          //console.log(i);
                          console.log(jdeck[i]);
                          //deck1.push(jdeck1[i]);
                          deck[j] = jdeck[i];
                          j++;
                        }
                        console.log(deck.length);
                        decks[dnum] = deck;
                        shuffle(dnum);

                },
		
	});
}

function shuffle(dnum)
{
	// for 1000 turns
	// switch the values of two random cards
	//deck1 = deck[1];
	//deck2 = deck[2];
        console.log('shuffling deck ' + dnum + '...');
        var deck = decks[dnum]
        console.log(deck.length);
	for (var i = 0; i < 1000; i++)
	{
		var location1 = Math.floor((Math.random() * deck.length));
		var location2 = Math.floor((Math.random() * deck.length));
		var tmp = deck[location1];

		deck[location1] = deck[location2];
		deck[location2] = tmp;
                //console.log("swapping " + location1 + " and " + location2);
	}
        
        decks[dnum] = deck;
        get_hand(dnum);
	renderHand(dnum);
}

function get_hand(dnum) {
        var hand_size = 10
        var deck = decks[dnum];
        var hand = [];
        for(var i = 0; i < hand_size; i++)
	{
                console.log(i);
                hand[i] = deck.shift();
                console.log(hand[i]);
	}
        hand = hand.sort();
	decks[dnum] = deck;
        hands[dnum] = hand;
}

function renderHand(dnum)
{
	console.log("rendering hand " + dnum + "...");
        hand = hands[dnum];
        deckdir = deckdirs[dnum];
	document.getElementById('deck' + dnum + '_cards').innerHTML = '';
	for(var i = 0; i < hand.length; i++)
	{
                console.log(i);
                if (typeof hand[i] !== 'undefined') {
                    // the variable is defined
                        var card = document.createElement("img");
                        console.log(hand[i]);
                        card.setAttribute('src', 'images/' + deckdir + '/' + hand[i]);
                        card.setAttribute('onclick', 'playCard(' + dnum + ',' + i + ')');
			card.setAttribute('width', 150);
			card.setAttribute('height', 200);
                        document.getElementById("deck" + dnum + '_cards').appendChild(card);
                } else {
                        console.log("undefined element at " . i);
                }
	}
	
}

function load()
{
	getDeck(0);
        getDeck(1);
        //console.log(deck1);
	//shuffle();
	//renderDecks();
}

function add_card(dnum) {
        hand = hands[dnum];
        deck = decks[dnum];
        var card = deck.shift();
        hand.push(card);
        hand = hand.sort();
        decks[dnum] = deck;
        hands[dnum] = hand;
        renderHand(dnum);
}

function playCard(dnum,cnum) {
        hand = hands[dnum];
        cardimg = hand[cnum];
        hand = hand.splice(cnum, 1);
        renderHand(dnum);
        hands[dnum] = hand;
        var card = document.createElement("img");
        card.setAttribute('src', 'images/' + deckdir + '/' + cardimg);
        card.setAttribute('width', 150);
	card.setAttribute('height', 200);
        document.getElementById('playedcard' + dnum).innerHTML = '';
        document.getElementById('playedcard' + dnum).appendChild(card);
}

window.onload = load;