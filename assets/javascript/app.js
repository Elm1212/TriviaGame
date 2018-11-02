
//event listeners  start game page
//$(document).ready(function(){
   // $("remaining-time").hide();
  //  $("start").on("click", trivia.startGame);
  //  $(document).on("click", ".option", trivia.guessChecker);
//})


//variables

var game = {

    //game settings ---- what game is reset to each time.
    
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 0,
    timerOn: false,
    timerId : '',


//make into objects... choices into array
    questions: {
    q1: "Which Texas city was the first Blockbuster opened in?",
    q2: "How many U.S. States border the Gulf of Mexico?",
    q3: "What is the largest city to connect two continents?",
    q4: "What is the only Sea on Earth with no coastline?",
    q5: "What is the longest river in the world?",
    q6: "What Country has the largest land mass?",
    q7: "",
    q8: "",
    q9: "",
    },

    choices: {
        q1: ['Dallas', 'Midland', 'Austin', 'Houston'],
        q2: ['4', '5', '8', '6'],
        q3: ['Pakistan', 'Istanbul', 'Tokyo', 'Brazil'],
        q4: ['Sargasso Sea', 'Red Sea', 'Arabian Sea', 'Baltic Sea' ],
        q5: ['Nile', 'Amazon', 'Mississippi', 'Mekong'],
        q6: ['Asia', 'Russia', 'United States',],
        q7: [],
        q8: [],
        q9: [],

    },

    answers: {
        q1: "Dallas",
        q2: "5",
        q3: "Istanbul",
        q4: "Sargasso Sea",
        q5: "Amazon",
        q6: "",
        q7: "",
        q8: "",
        q9: "",
    },


 
//Start Game Page display.... push "start" button and then go to game page.


/// make a function that loops through questions and display one question with correspoding choices.

// only one answer can be selected.

// Display countdown timer. when timer runs out go to score page
startGame: function(){
    // restarting game results
    game.currentSet = 0;
    game.correct = 0;
    game.incorrect = 0;
    game.unanswered = 0;
    clearInterval(game.timerId);
    
    //game section appear
    $('#game').show();
    
    //  empty last results
    $('#results').html('');
    
    // show timer
    $('#timer').text(game.timer);
    
    // make start button go away
    $('#start').hide();

    $('#remaining-time').show();
    
    // ask question
    trivia.nextQuestion();
    
  },
  // method to loop through and display questions and options 
  nextQuestion : function(){
    
    // set timer to 20 seconds each question
    game.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(game.timer);
    
    // to prevent timer speed up
    if(!game.timerOn){
      game.timerId = setInterval(game.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(game.questions)[game.currentSet];
    $('#question').text(questionContent);
    
    // an array of all the user options for the current question
    var questionOptions = Object.values(game.options)[game.currentSet];
    
    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(game.timer > -1 && game.currentSet < Object.keys(game.questions).length){
      $('#timer').text(game.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(game.timer === -1){
      game.unanswered++;
      game.result = false;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(game.answers)[game.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(game.currentSet === Object.keys(game.questions).length){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ game.correct +'</p>'+
        '<p>Incorrect: '+ game.incorrect +'</p>'+
        '<p>Unaswered: '+ game.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  // method to evaluate the option clicked
  guessChecker : function() {
    
    // timer ID for gameResult setTimeout
    var resultId;
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(game.answers)[game.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');
      
      game.correct++;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      game.incorrect++;
      clearInterval(game.timerId);
      resultId = setTimeout(game.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    // increment to next question set
    game.currentSet++;
    
    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();
    
    // begin next question
    game.nextQuestion();
     
  }

}


