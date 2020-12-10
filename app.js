
//Create an Alphabet Array
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

//Create a word box array to store the words
const wordsBox = [];


//Cache DOM nodes
const $letters = $('.letters');
const $wordBox = $('.words');
const $input = $('input');
const $addButton = $('#submit');
const $shuffleButton = $('#shuffle');
const $scoreBoard = $('.scoreBoard');
const $inputContainer = $('.input-container');
const $timerButton = $('#timer');
const $switchPlayerButton = $('#switch-player');
const $closeInstructionsButton = $('#close-instructions');
const $instructionsModal = $('#instructions');
const $instructionsButton = $('.instructions');
const $letsPlayButton = $('#lets-play');
const $dictionaryModal = $('#dictionary-check');
const $closeDisputeButton = $('#close-dispute');





//Create a player class
class Player {
    constructor(name){
        this.name = name;
        this.points = 0;
        this.wordsCreated = [];
    }
    increaseScore(wordLength){
        if(wordLength === 2){
            this.points += 10;
        }
        if(wordLength === 3){
            this.points += 20
        }
        if(wordLength === 4){
            this.points += 30
        }
        if(wordLength >= 5){
            this.points += 40
        }


    }
    decreaseScore(wordLength){
        if(wordLength === 2){
            this.points -= 10;
        }
        if(wordLength === 3){
            this.points -= 20
        }
        if(wordLength === 4){
            this.points -= 30
        }
        if(wordLength >= 5){
            this.points -= 40
        }
    }
}

const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

//Define who is the current player
let currentPlayer = player1;
//Append current player to words box
let $currentPlayerName = $('<p>').html(currentPlayer.name);
$('.currentPlayer').append($currentPlayerName);

//Set scores to display right off the bat
const $scores = $('<p>').text(
    `Player 1: ${player1.points}
    Player 2: ${player2.points}`);
    $scoreBoard.append($scores);

//Updates the score board with current point score
const updateScoreBoard = () => {
    $scoreBoard.empty();
    const $scores = $('<p>').text(
    `Player 1: ${player1.points}
    Player 2: ${player2.points}`);
    $scoreBoard.append($scores);
}


//Create a letters box class
class LettersBox {
    constructor(){
        this.letters = [];
    }
    generateLetters() {
        this.letters = [];
        $letters.empty();
        for(let i = 1; i <= 10; i++){
            //Create random index variable to store random index
            const randomIndex = Math.floor(Math.random()*(alphabet.length-1));
            const $li = $('<li>').html(alphabet[randomIndex]).css('list-style-type', 'none').css('font-size', '15px');
            $letters.append($li);
            this.letters.push(alphabet[randomIndex]);
            console.log(randomIndex);
        }
    
        console.log(this.letters);
    }
    
}
const lettersBox = new LettersBox;

//Generate 7 random numbers
lettersBox.generateLetters();

//CHECK WIN///

const checkWin = () => {
    if (player1.points >= 100){
        alert(`${player1.name} has won with ${player1.points} points!`);
        clearTimeout(timerId);
       
    }
    if (player2.points >= 100){
        alert(`${player2.name} has won with ${player2.points} points!`);
        clearTimeout(timerId);
    
    }

}

/////TIMER/////
//Create 30 sec timer function 

let timeLeft = 30;
$('.timer').html(timeLeft).css('font-size', '50px');


const timer = () => {
    
 
    const startTimer = () => {
        
        if(timeLeft === -1){
            alert('Times up!');
            clearTimeout(timerId);
            
        } else {
            $('.timer').html(timeLeft).css('font-size', '50px');
            timeLeft--;
        }
      
    }
    
    
    let timerId = setInterval(startTimer, 1000);
}




//Event Handlers

//Display dictionary
const displayDictionary = () => {
    $dictionaryModal.css('display', 'block');
}

//Delete word function
const deleteWord = (event) => {
    let $element = $('.word');
    let $elementLength = $element.html().length;
    currentPlayer.decreaseScore($elementLength);
    event.target.parentElement.remove();
    updateScoreBoard();
}


const addWord = () => {
    // event.stopPropogation();
    const $li = $('<li>');
    const $p = $('<p>').addClass('word').html($input.val());
    $li.append($p);
    const $disputeButton = $('<button>').addClass('dispute').text('DISPUTE');
    const $deleteButton = $('<img>').addClass('trash').attr('src', 'trashcan.png').css('width', '34px');
    $li.append($disputeButton);
    $li.append($deleteButton);
    $disputeButton.on('click', displayDictionary);
    currentPlayer.increaseScore($input.val().length);
    updateScoreBoard();
    checkWin();
    $wordBox.append($li);
    $deleteButton.on('click', deleteWord);
    $input.val('');

}





const switchPlayer = () => {
    lettersBox.generateLetters();
    $('.currentPlayer').empty();
    $wordBox.empty();
    currentPlayer === player1? currentPlayer = player2: currentPlayer = player1
    let $currentPlayerName = $('<p>').html(currentPlayer.name);
    $('.currentPlayer').append($currentPlayerName);
    timeLeft = 30;
    $('.timer').html(timeLeft);
}

//Close instructions modal function
const closeInstructionsModal = () => {
    $instructionsModal.css('display', 'none');
    $letsPlayButton.remove();
}

//Opens instructions modal function
const openInstructionsModal =  () => {
    $instructionsModal.css('display', 'block');
}

setTimeout(openInstructionsModal, 2000);

//Close dispute modal function
const closeDisputeModal = () => {
    $dictionaryModal.css('display', 'none')
}

//EVENT LISTENERS && EVENT HANDLERS//
//Add event listener for ADD button
$addButton.on('click', ()=>{addWord()});
$inputContainer.keypress((event) => {
    if (event.keyCode === 13){
        addWord();
        
    }
});
$shuffleButton.on('click', ()=>{lettersBox.generateLetters()});
$timerButton.on('click', ()=>{timer()});


//Modal close button for instructions
$closeInstructionsButton.on('click', closeInstructionsModal);
$letsPlayButton.on('click', closeInstructionsModal);
$instructionsButton.on('click', openInstructionsModal);

$closeDisputeButton.on('click', closeDisputeModal);

//When switch player is clicked, player is updated
$switchPlayerButton.on('click', ()=>{switchPlayer()});


//Add delete on click listner
//Add delete event handler
//Add dispute on click listner
//Add dispute event handler










// $(() => {
//     // put jQuery in here
   
// });