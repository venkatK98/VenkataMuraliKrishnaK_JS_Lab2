
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
  if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function loadQuestions() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionByIndex().text;

      // show options
      var choices = quiz.getQuestionByIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          handleOptionButton("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function handleOptionButton(id, choice) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.checkOptionWithAnswer(choice);
      loadQuestions();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your score is: " + quiz.score + " and mark percentage is: "+(quiz.score/questions.length*100)+"%"+"</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
  new Question("JavaScript is a _____", ["Language", "Programming Language", "Development", "All"], "Programming Language"),
  new Question("What is JavaScript?", ["Scripting language","Assembly language","Compiled language","None of the mentioned"], "Scripting language"),
  new Question("Which of the following is not javascript data types?", [" Null type", "Undefined type", "Number type", "All of mentioned"], "All of mentioned"),
  new Question("Which of the following is not an error in JavaScript?", ["Missing of Bracket","Division by zero", "Syntax error", "Missing of semicolons"], "Division by zero"),
  new Question("How many default number methods are available in JavaScript?", ["6","7","5","8"], "7"),
];

// create quiz
var quiz = new Quiz(questions);

// display quiz
loadQuestions();