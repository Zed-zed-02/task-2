
(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

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
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = 'none';
    }
    else{
      previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    }
    else{
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "How is COVID-19 passed on?",
      answers: {
        a: "through droplets coming from mouth and nose",
        b: "through mosquitos",
        c: "by drinking unclean water"
      },
      correctAnswer: "a"
    },
    {
      question: "What are the common symptoms of COVID-19? ?",
      answers: {
        a: "fever",
        b: "cough",
        c: "both"
      },
      correctAnswer: "c"
    },
    {
      question: "Does COVID-19 repeat itself for the same person?",
      answers: {
        a: "no, it comes only once",
        b: "yes,it repeats",
        c: "none of these",
        
      },
      correctAnswer: "b"
    },
    {
      question: "Does COVID-19 always comes with symptoms ?",
      answers: {
        a: "yes",
        b: "no",
        c: "both symotomatic and symptomatic cases are there"
      },
      correctAnswer: "c"
    },{
      question: "Vaccine for COVID-19 is found ?",
      answers: {
        a: "yes",
        b: "not exactly ",
        c: "no, patients die due to non avalability of any vacccine"
      },
      correctAnswer: "b"
    },{
      question: "Washing your hands protects u from COVID-19 ?",
      answers: {
        a: "yes always",
        b: "no",
        c: "partially depends on other preventive measure a person takes"
      },
      correctAnswer: "c"
    },{
      question: "COVID-19 affects which age ?",
      answers: {
        a: "5-10",
        b: "60-70",
        c: "affects all age group"
      },
      correctAnswer: "c"
    },{
      question: "Wearing masks is important to avoid COVID-19?",
      answers: {
        a: "yes 100%",
        b: "not so important",
        c: "not at all important"
      },
      correctAnswer: "a"
    },{
      question: "Is COVID-19 fatal ?",
      answers: {
        a: "100%",
        b: "not at all",
        c: "depends on the persons immune system"
      },
      correctAnswer: "c"
    },{
      question: "whats meant by social distancing ?",
      answers: {
        a: "avoiding the person completely",
        b: "treat them as a stranger",
        c: "none of these"
      },
      correctAnswer: "c"
    }
  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
