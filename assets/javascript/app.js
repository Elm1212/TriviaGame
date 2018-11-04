
//event listeners  start game page
//$(document).ready(function(){
   //("remaining-time").hide();
  // $("start").on("click", game.startGame);
  //  $(document).on("click", ".option", game.guessChecker);
 // })


//variables


    //game settings ---- what game is reset to each time.
    



//make into objects... choices into array
    $(document).ready(function () {
    var options = [
      {
        question: "Which Texas city was the first Blockbuster opened in?",
        choice:['Dallas', 'Midland', 'Austin', 'Houston'],
        answer: 0,
        photo:"",
      },
      {
        question: "How many U.S.States border the Gulf of Mexico?",
        choice:['4', '5', '8', '6'],
        answer: 1,
        photo:"",
      },
      {
        question: "What is the largest city to connect two continents?",
        choice:['Pakistan', 'Istanbul', 'Tokyo', 'Brazil'],
        answer: 1,
        photo:"",
      },
      {
        question: "What is the only Sea on Earth with no coastline?",
        choice:['Sargasso Sea', 'Red Sea', 'Arabian Sea', 'Baltic Sea' ],
        answer: 0,
        photo:"",
      },
      {       
        question: "What is the longest river in the world?",
        choice:['Nile', 'Amazon', 'Mississippi', 'Mekong'],
        answer: 1,
        photo:"",
      },
      {       
        question: "What Country has the largest land mass?",
        choice:['Asia', 'Russia', 'United States', 'Canada'],
        answer: 1,
        photo:"",
      },
      {       
        question: "The Black Forest is located in which European Country?",
        choice:['England', 'France', 'Germany', 'Poland'],
        answer: 2,
        photo:"",
      },
      {       
        question: "The duck billed platypus is native to what country?",
        choice:['Antarctica', 'Australia', 'Argentina', 'China'],
        answer: 1,
        photo:"",
      },
      {       
        question: "Which Lake is the worlds largest Lake?",
        choice:['Lake Travis', "Lake Superior", "Lake Malawi", "Lake Toba"],
        answer: 1,
        photo:"",
      }];

      var correctCount = 0;
      var wrongCount = 0;
      var unanswerCount = 0;
      var timer = 20;
      var intervalId;
      var userGuess ="";
      var running = false;
      var qCount = options.length;
      var pick;
      var index;
      var newArray = [];
      var holder = [];
      
      
      
      $("#reset").hide();
      //click start button to start game
      $("#start").on("click", function () {
          $("#start").hide();
          displayQuestion();
          runTimer();
          for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
      }
        })
      //timer start
      function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
      }
      //timer countdown
      function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
      
        //stop timer if reach 0
        if (timer === 0) {
          unanswerCount++;
          stop();
          $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
        }	
      }
      
      //timer stop
      function stop() {
        running = false;
        clearInterval(intervalId);
      }
      //randomly pick question in array if not already shown
      //display question and loop though and display possible answers
      function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
      
      //	if (pick.shown) {
      //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
      //		displayQuestion();
      //	} else {
      //		console.log(pick.question);
          //iterate through answer array and display
          $("#questionblock").html("<h2>" + pick.question + "</h2>");
          for(var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
      //		}
      }
      
      
      
      //click function to select answer and outcomes
      $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
      
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
          stop();
          correctCount++;
          userGuess="";
          $("#answerblock").html("<p>Correct!</p>");
          hidepicture();
      
        } else {
          stop();
          wrongCount++;
          userGuess="";
          $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
          hidepicture();
        }
      })
      }
      
      
      function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
      
        var hidpic = setTimeout(function() {
          $("#answerblock").empty();
          timer= 20;
      
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
          $("#questionblock").empty();
          $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
          $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
          $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
          $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
          $("#reset").show();
          correctCount = 0;
          wrongCount = 0;
          unanswerCount = 0;
      
        } else {
          runTimer();
          displayQuestion();
      
        }
        }, 3000);
      
      
      }
      
      $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
          options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
      
      })
      
      })