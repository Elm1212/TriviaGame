
//event listeners  start game page
$(document).ready(function(){
    $("remaining-time").hide();
    $("start").on("click", trivia.startGame);
    $(document).on("click", ".option", trivia.guessChecker);
})


//variables

var game = {

    //game settings ---- what game is reset to each time.
    timer = 0,
    correct = 0,
    incorrect = 0,
    unanswered = 0,


//make into objects... choices into array
    questions: {
    q1: "what is this",
    q2: "what is that",
    q3: "who is that",
    q4: "",
    q5: "",
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    },

    choices: {
        q1: [],
        q2: [],
        q3: [],
        q4: [],
        q5: [],
        q6: [],
        q7: [],
        q8: [],
        q9: [],

    },

    answers: {
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
        q7: "",
        q8: "",
        q9: "",
    }

}
 
//Start Game Page display.... push "start" button and then go to game page.


/// make a function that loops through questions and display one question with correspoding choices.

// only one answer can be selected.

// Display countdown timer. when timer runs out go to score page


