
$(() => {
//Create an Alphabet Array
const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z' ];
const vowels = ['A', 'E', 'I', 'O', 'U'];

//Create a word box array to store the words
const wordsBox = [];

//Establish set time
let timeLeft = 30;
//Append time left
$('.timer').html(timeLeft).css('font-size', '80px');

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
const $goButton = $('#go');
const $dictionaryModal = $('#dictionary-check');
const $closeDisputeButton = $('#close-dispute');
const $playerNameModal = $('#player-name');
const $letsPlayButton = $('#lets-play');
const $timesUpModal = $('#times-up');
const $timesUpButton = $('#times-up-button');
const $winnerModal = $('#winner');
const $playAgainButton = $('#play-again');
const $closeWinnerButton = $('#close-winner');

//Create a player class
class Player {
    constructor(name){
        this.name = name;
        this.points = 0;
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
//Instantiate two new players 
const player1 = new Player('Player 1');
const player2 = new Player('Player 2');

//Establish current player variable, assign to player 1
let currentPlayer = player1;

//Function: Append current player to words box function
const updateCurrentPlayerName = () => {
    let $currentPlayerName = $('<p>').html(currentPlayer.name);
    $('.currentPlayer').append($currentPlayerName);
}

//Set scores for each player to display on the DOM right off the bat
const $player1Score = $('<p>').text(
    `${player1.name}: ${player1.points}`);
    $scoreBoard.append($player1Score);
const $player2Score = $('<p>').text(
    `${player2.name}: ${player2.points}`);
    $scoreBoard.append($player2Score);

//Function: Updates the score board with current point score
const updateScoreBoard = () => {
    $scoreBoard.empty();
    const $player1Score = $('<p>').text(
        `${player1.name}: ${player1.points}`);
        $scoreBoard.append($player1Score);
    const $player2Score = $('<p>').text(
        `${player2.name}: ${player2.points}`);
        $scoreBoard.append($player2Score);
}


const generateLetters = () => {
    $letters.empty();
    for(let i = 1; i <= 7; i++){
        //Create random index variable to store random index
        const randomIndexConsonant = Math.floor(Math.random()*(consonants.length-1));
        //Create li tag with the html inside to be a random letter in consonant array
        const $li = $('<li>').html(consonants[randomIndexConsonant]).css('list-style-type', 'none');
        //Create a randomized looking display of the letters
        //If i at the current letter is even
        if(i%2 === 0){
            //align the letter in the center
            $li.css('align-items', 'center');
        }
        //If i at the current letter is odd
        if (i%3 === 0){
            //align the letter at the end of the flex box
            $li.css('align-items', 'flex-end')
        }
        //Append the li to the ul in the words container
        $letters.append($li);
    }
    for(let i = 1; i <= 3; i++){
        //Create random index variable to store random index
        const randomIndexVowel = Math.floor(Math.random()*(vowels.length-1));
        const $li = $('<li>').html(vowels[randomIndexVowel]).css('list-style-type', 'none');
        if(i%2 === 0){
            $li.css('align-items', 'flex-end');
        }
        if (i%3 === 0){
            $li.css('align-items', 'center')
        }
        $letters.append($li);
    } 
}

//Generate 7 random letters
generateLetters();


/////TIMER/////
//Create 30 sec timer function 
const openTimesUpModal = () => {
    $timesUpModal.css('display', 'block');
}

let timerId;

const timer = () => {
    const startTimer = () => {
        
        if(timeLeft === -1){
            openTimesUpModal();
            clearTimeout(timerId);
            
        } else {
            $('.timer').html(timeLeft).css('font-size', '80px');
            timeLeft--;
        }     
    }
    timerId = setInterval(startTimer, 1000);
}

const stopTimer = () => {
    clearTimeout(timerId);
   
}


//CHECK WIN///

const checkWin = () => {
    if (player1.points >= 200){
        stopTimer();
        $input.val('');
        const $winner = $('<p>').html(`${player1.name} has won with ${player1.points} points!`);
        $('#winner-textbox h1').append($winner);
        $winnerModal.css('display', 'block');
       
    }
    if (player2.points >= 200){
        stopTimer();
        $input.val('');
        const $winner = $('<p>').html(`${player2.name} has won with ${player2.points} points!`);
        $('#winner-textbox h1').append($winner);
        $winnerModal.css('display', 'block');
        
    }
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
    const $deleteButton = $('<img>').addClass('trash').attr('src', 'trashcan.png').css('width', '20%');
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
    generateLetters();
    $input.val('');
    $('.currentPlayer').empty();
    $wordBox.empty();
    currentPlayer === player1? currentPlayer = player2: currentPlayer = player1
    let $currentPlayerName = $('<p>').html(currentPlayer.name);
    $('.currentPlayer').append($currentPlayerName);
    timeLeft = 30;
    $('.timer').html(timeLeft);
}

const closeTimesUpModal = () => {
    $timesUpModal.css('display', 'none');
}

//Close instructions modal function
const closeInstructionsModal = () => {
    $instructionsModal.css('display', 'none');
    $goButton.remove();
    
}

const displayPlayerNameInput = () => {
    $instructionsModal.css('display', 'none');
    $goButton.remove();
    $playerNameModal.css('display', 'block');
}

//Opens instructions modal function
const openInstructionsModal =  () => {
    $instructionsModal.css('display', 'block');
}

setTimeout(openInstructionsModal, 1000);

//Close dispute modal function
const closeDisputeModal = () => {
    $dictionaryModal.css('display', 'none')
}

//Close player name modal function
const closePlayerNameModal = () => {
    $player1Name = $('#player-1-name').val();
    player1.name = $player1Name;
    $player2Name = $('#player-2-name').val();
    player2.name = $player2Name;
    $playerNameModal.css('display', 'none')
    updateScoreBoard();
    updateCurrentPlayerName();
}

const startNewGame = () => {
    $('#winner-textbox h1').empty();
    $winnerModal.css('display', 'none');
    timeLeft = 30;
    $('.timer').html(timeLeft).css('font-size', '80px');
    generateLetters();
    $('.currentPlayer').empty();
    $wordBox.empty();
    player1.points = 0;
    player2.points = 0;
    displayPlayerNameInput();
    updateScoreBoard();
    
}

//EVENT LISTENERS && EVENT HANDLERS//
//Add event listener for ADD button
$addButton.on('click', ()=>{addWord()});

//Enter key press for adding buton
$inputContainer.keypress((event) => {
    if (event.keyCode === 13){
        addWord();
        
    }
});

//Shuffle letters 
$shuffleButton.on('click', ()=>{generateLetters()});

//Start timer 
$timerButton.on('click', ()=>{timer()});


//Modal close button for instructions
$closeInstructionsButton.on('click', closeInstructionsModal);
$goButton.on('click', displayPlayerNameInput);
$instructionsButton.on('click', openInstructionsModal);

$closeDisputeButton.on('click', closeDisputeModal);

//When switch player is clicked, player is updated
$switchPlayerButton.on('click', ()=>{switchPlayer()});

$letsPlayButton.on('click', closePlayerNameModal);

$timesUpButton.on('click', closeTimesUpModal);

$playAgainButton.on('click', startNewGame);

$closeWinnerButton.on('click', () => {
$winnerModal.css('display', 'none');
})

});