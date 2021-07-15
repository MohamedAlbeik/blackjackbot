document.writeln("<script type='text/javascript' src='/table.js'></script>");
const buttons = document.querySelectorAll('.button');
const cardOne = document.querySelector('#p1');
const cardTwo = document.querySelector('#p2');
const dealer = document.querySelector('#dealer');
const redeal = document.querySelector('#redeal-btn')
const suits = ['clubs', 'hearts', 'diamonds', 'spades'];

card1 = {
    representaion: Math.floor(Math.random() * 13) + 1,
    display: cardOne,
}
card1.value = Math.min(card1.representaion, 10);
card2 = {
    representaion: Math.floor(Math.random() * 13) + 1,
    display: cardTwo,
}
card2.value = Math.min(card2.representaion, 10);
dealer_card = {
    representaion: Math.floor(Math.random() * 13) + 1,
    display: dealer,
}
dealer_card.value = Math.min(dealer_card.representaion, 10);

//random guided card string
const randomCard = (representaion) => {
    return '/card-imgs/' + representaion +
        '_of_' + suits[Math.floor(Math.random() * 4)] + '.png';
}

//initilize cards
dealer_card.display.src = randomCard(dealer_card.representaion)
card1.display.src = randomCard(card1.representaion)
card2.display.src = randomCard(card2.representaion)

//translating from array
const translatorFunc = (char) => {
    switch (char) {
        case 'S':
            return 'Stand';
        case 'P':
            return 'Split';
        case 'D':
            return 'Double';
        case 'H':
            return 'Hit';
    }
}

const correctMove = () => {
    console.log(card1.value, 'card 1');
    console.log(card2.value, 'card 2');
    //index change for when dealer has ace
    let index = dealer_card.value - 2;
    if (dealer_card.value === 1) {
        index = 9;
    }
    console.log(index, 'index');

    let correctLetter = null;

    if (card1.value === card2.value) {
        correctLetter = same_card_table[card1.value][index];
    } else if (card1.value === 1) {
        correctLetter = ace_table[card2.value][index];
    } else if (card2.value === 1) {
        correctLetter = ace_table[card1.value][index];
    } else {
        let sum = card1.value + card2.value;
        correctLetter = sum_table[sum][index];
    }

    return translatorFunc(correctLetter);
}


const give_feedback = (btn) => {
    let userChoice = btn.innerText;
    let PC_choice = correctMove();
    let msg = null;

    if (userChoice === PC_choice) {
        msg = 'Correct! ' + userChoice + ' is the right strategy!';
        alert(msg)
    } else {
        msg = 'Incorrect! ' + PC_choice.toLowerCase() + ' is the right decision';
        alert(msg);
    }
}

//adding event listeners to all buttons
buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
        give_feedback(btn);
    })
})

//reseting 
redeal.addEventListener('click', () => {
    card1.representaion = Math.floor(Math.random() * 13) + 1;
    card1.value = Math.min(card1.representaion, 10);

    card2.representaion = Math.floor(Math.random() * 13) + 1;
    card2.value = Math.min(card2.representaion, 10);

    dealer_card.representaion = Math.floor(Math.random() * 13) + 1;
    dealer_card.value = Math.min(dealer_card.representaion, 10);
    dealer_card.display.src = randomCard(dealer_card.representaion)

    card1.display.src = randomCard(card1.representaion)
    card2.display.src = randomCard(card2.representaion)
})
