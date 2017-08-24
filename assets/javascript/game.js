function startGame(){
	//game variable init
	puzzleArray = [];
	wrongLetterGuessArray = [];
	puzzleString = "";
	chosenWord = "";
	guessCount = 0;
	totalMoves = 8;
	console.log(wordArray);
	console.log("in function but before changes " + chosenWord);

	// Randomly chooses a choice from the options array. This is the Computer's guess.
    var computerGuess = wordArray[Math.floor(Math.random() * wordArray.length)];
    chosenWord = computerGuess;
    console.log("in function after changes " + chosenWord);

    //write an _ for each letter in randomly chosen word
    for(var i = 0; i < chosenWord.length; i++){
		if(chosenWord[i] == " "){
			puzzleArray.push("  ");
			puzzleString = puzzleString + "  ";
		} else {
			puzzleArray.push("_ ");
			puzzleString = puzzleString + "_ ";
		}
	}

    document.getElementById("puzzleText").innerHTML = puzzleString;
    document.getElementById("totalMovesLeft").innHTML = "You have, 8 remaining guesses.";
    document.getElementById("previousWordsWrapper").innerHTML = "<span></span>";

}

var userStartGameChoice = confirm("Do you want to play a game?");
console.log(userStartGameChoice);
if (userStartGameChoice == true){
	//Global variables decl.
	var chosenWord = "";
	var guessCount = 0;
	var winsCount =0;
	var maxGuessCount = 14;
	var totalMoves = 8;
	var wordArray = ["plumpy butter", "brian is the coolest", "onion routing"];
	var puzzleArray = [];
	var puzzleString = "";
	var wrongLetterGuessArray = [];
	
	console.log("Start of game " + chosenWord);
	var para = document.createElement("span");
    var node = document.createTextNode(puzzleString);
    para.appendChild(node);
    para.setAttribute("id", "puzzleText");
    var element = document.getElementById("puzzleWrapper");
    element.appendChild(para);

    // para = document.createElement("span");
    // node = document.createTextNode(" ");
    // para.appendChild(node);
    // para.setAttribute("id", "guessedLetters");
    // element = document.getElementById("previousWordsWrapper");
    // element.appendChild(para);
    // test = "You have, " + totalMoves + " remaining guesses.";
    // para = document.createElement("span");
    // node = document.createTextNode(test);
    // para.appendChild(node);
    // para.setAttribute("id", "movesText");
    element = document.getElementById("totalMovesLeft");
    element.innHTML = "You have, " + totalMoves + " remaining guesses."; //appendChild(para);

    //Start the game
	startGame();
}

function checkLetter(letterGuess){
	//first check if they entered only an ABC/ abc character
	if(letterGuess.match(/^[a-zA-Z]+$/) && chosenWord != "@@"){
		//check to ensure they have not guessed the letter before
		if(wrongLetterGuessArray.indexOf(letterGuess) == -1){

			//since strings are immutable, i re-create the puzzle string (_ _ _   _h_) every check
			puzzleString = "";
			var wrongFlag = 0;

			//since we are guessing just one letter at a time, a brute force algorithm for string comparison is used
			for(var i = 0; i < chosenWord.length; i++){
				if(chosenWord[i] === letterGuess){
					//correct guess
					wrongFlag = 1;
					puzzleArray[i] = letterGuess + " ";
				} 
				puzzleString = puzzleString + puzzleArray[i];
			}

			//append the guessed letter to an array
			wrongLetterGuessArray.push(letterGuess);
			document.getElementById("previousWordsWrapper").innerHTML = "<span>" + wrongLetterGuessArray + "</span>";

			//if the guess was wrong, add one to count, change the picture, and check if the they lost
			if(wrongFlag === 0){
				if(guessCount < 7){
					guessCount = guessCount + 1;
					totalMoves = 8 - guessCount;
					document.getElementById("totalMovesLeft").innerHTML = "You have, " + totalMoves + " remaining guesses.";
					console.log("assets/images/hangman" + guessCount + ".png");
					document.getElementById("imageEleContainer").src = "assets/images/hangman" + guessCount + ".png"
				} else {
					//the person lost
					guessCount = guessCount + 1;
					totalMoves = 8 - guessCount;
					document.getElementById("totalMovesLeft").innerHTML = "You have, " + totalMoves + " remaining guesses.";
					document.getElementById("imageEleContainer").src = "assets/images/hangman" + guessCount + ".png"
					userStartGameChoice = false;
					console.log("user game choice " + userStartGameChoice);
					
					setTimeout(function(){
						userStartGameChoice = confirm("You lost the game, please go cry, but first do you want to play again?");
						chosenWord = "@@";
						console.log("user game choice after the confirm " + userStartGameChoice);
						if(userStartGameChoice == true){
							document.getElementById('puzzleText').innerHTML = "";
							document.getElementById("imageEleContainer").src = "assets/images/hangman0.png"
							document.getElementById("totalMovesLeft").innHTML = "You have, 8 remaining guesses.";
							startGame();
						}
					}, 500);
					// setTimeout(function(){userStartGameChoice = confirm("You lost the game, please go cry, but first do you want to play again?");}, 1000);
					
				}
			} else {
				//we know their guess was correct, so lets write the guess to the screen
				document.getElementById('puzzleText').innerHTML= puzzleString;
			}

			
			if(puzzleString.replace(/\s/g, '') === chosenWord.replace(/\s/g, '')){
				//game is complete ask if they want to play again
				chosenWord = "@@";
				winsCount = winsCount + 1;
				var audio = new Audio('assets/javascript/victory_music.mp3');
				audio.play();
				document.getElementById("winsCountDisplay").innerHTML = "Your wins: " + winsCount;
				userStartGameChoice = confirm("YOU WIN WOW Do you want to play again?");
				if(userStartGameChoice == true){
					document.getElementById('puzzleText').innerHTML = "";
					startGame();
				}
			}
		}
	}
}

document.onkeyup = function() {
	var triggerString = String.fromCharCode(event.which).toLowerCase();
	console.log(triggerString);
	checkLetter(triggerString.toLowerCase());
}




