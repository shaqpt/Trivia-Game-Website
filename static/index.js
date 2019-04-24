/* This program was created and written by Shaqueir Tardif

  Team Leader: Shaqueir Tardif
  Team Member: Egbunike Chamberlain
  Date Submitted: April 24, 2019
  ECE 369 - Project
  Trivia Quiz Website

*/

//let numCorrect = 0
(function() {
  const myQuestions = [
    {
      //hideVideo();,
      question: "What does K.I.S.S. stand for?",
      answers: {
        a: "A popular Rock band where grown men wear lots of makeup",
        b: "Keep It Silly Stupid",
        c: "Keep It Stupid Simple",
        d: "Keep It Super Special"
      },
      correctAnswer: "c"
    },
    {
      //hideVideo();,
      question: "Is TCP or UDP better for gaming?",
      answers: {
        a: "TCP",
        b: "UDP",
        c: "Doesn't Matter",
        d: "Both will work but there are pros and cons to both; depends on the game and the connection type"
      },
      correctAnswer: "d"
    },
    {
      //hideVideo();,
      question: "What does TCP mean?",
      answers: {
        a: "Transmission Control Protocol",
        b: "Transmission Command Protocol",
        c: "Transmission Control Program",
        d: "Total Control Program"
      },
      correctAnswer: "a"
    },
    {
      //hideVideo();,
      question: "What does UDP mean?",
      answers: {
        a: "User Data Port",
        b: "Universal Data Port",
        c: "User Datagram Protocol",
        d: "User Datagram Port"
      },
      correctAnswer: "c"
    },
    {
      //showVideo();,
      question: "Are you excited to see Avengers: Endgame?",
      answers: {
        a: "What's Avengers?",
        b: "I CAN'T WAIT!!!",
        c: "It's for nerds, I'm good",
        d: "Haven't caught up yet"
      },
      correctAnswer: "b"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    //let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[questionNumber].style.color = "darkgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    $.ajax({
      url: '/api',
      contentType: 'application/json;charset=UTF-8',
      data: JSON.stringify({'Score':numCorrect}),
      type: 'POST',
      sucess: function(response){
      console.log(response);
      },
      error: function(error){
        console.log(error);
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    sendlabel.style.display = "block"
    //numCorrect.showGif();

    
  }

  /*function hideVideo(){
    var iframe=document.getElementById('AvgVid');
    iframe.style.display = 'none';
  }

  function showVideo(){
    var iframe=document.getElementById('AvgVid');
    iframe.style.display = 'block';
  }
*/
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
      //sendlabel.style.display = "block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
      sendlabel.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const sendlabel= document.getElementById("send");



  // display quiz right away 
  //hideVideo();
  buildQuiz();

 
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  let numCorrect = 0;
  
  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults, showGif, showVid);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  document.querySelector("#submit").addEventListener("click", showGif);
  document.querySelector("#submit").addEventListener("click", showVid);
  
var pictures = ["win.gif", "meh.jpeg", "penguin.gif"];
var messages = ["Great job!", "You can do better", "Well, that sucked"];

function showGif() { 
  if (numCorrect === myQuestions.length){
    document.getElementById("picture").src = "/static/" + pictures[0];
    document.getElementById("message").innerHTML = messages[0];
  }
else if (numCorrect === 0){
    document.getElementById("picture").src = "/static/" + pictures[2];
    document.getElementById("message").innerHTML = messages[2];
  }
else {
      document.getElementById("picture").src = "/static/" + pictures[1];
      document.getElementById("message").innerHTML = messages[1];
  }
  document.getElementById("after_submit").style.visibility = "visible";
}

function showVid() {
  document.getElementById("video").style.visibility = "visible";
}

})();