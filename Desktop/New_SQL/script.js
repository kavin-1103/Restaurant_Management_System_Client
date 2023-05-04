
//counter for displaying time
var intervalID;
var counter = 0;


//MyData

// Define quiz data
const quizData = [
  {
    question: ' What is the implicit return type of constructor?',
    answers: ['No return type', 'A class object in which it is defined', 'void', 'None'],
    correctAnswerIndex: 1,
    required: true

  },
  {
    question: 'Which OOPS concept means exposing only necessary information to the calling functions?',
    answers: ['Polymorphism', 'Encapsualtion', 'Inheritence', 'Abstraction'],
    correctAnswerIndex: 1,
    required: true
  },
  {
    question: 'In which method changes made to the parameter inside the function have no effect on the argument?',
    answers: ['Call by Value', 'Call by Reference', 'Call by function'],
    correctAnswerIndex: 0,
    required: true
  },
  {
    question: 'Which of the following type of class allows only a single instance of itself to be created?',
    answers: ['Singleton class', 'Virtual class', 'Friend class', 'Abstract class'],
    correctAnswerIndex: 0,
    required: true
  },
  {
    question: 'Which oops concept is used as reuse mechanism?',
    answers: ['Abstraction', 'Dynamic binding', 'Inheritance', 'Enscapsulation'],
    correctAnswerIndex: 2
  },
  {
    question: 'Which of the following is not a type of constructor?',
    answers: ['Copy constructor', 'Friend constructor', 'Default constructor', 'Parameterized constructor'],
    correctAnswerIndex: 1
  },
  {
    question: 'Main method can be overridden:',
    answers: ['True', 'False'],
    correctAnswerIndex: 1,
    required: true
  },
  {
    question: 'Which is also known as late binding or run-time binding?',
    answers: ['Data hiding', 'Dynamic Typing', 'Dynamic binding', 'Dynamic loading'],
    correctAnswerIndex: 2,
    required: true
  },
  {
    question: 'Which of the following is not a type of inheritance?',
    answers: ['Multiple', 'Multilevel', 'Distributed', 'Hierarchical'],
    correctAnswerIndex: 2,
    required: true
  },
  {
    question: 'On what basis is it determined, when a variable comes into existence in memory?',
    answers: ['Data type', 'Storage class', 'Scope', 'All of the above'],
    correctAnswerIndex: 1,
    required: true
  }
];

function renderQuiz() {
  $("#message").hide();
  var output = '<div class=main_container>';
  quizData.forEach((question, questionIndex) => {
    output += `<label class="question";><h5>${question.question}</h5>`;

    //Rendering 
    question.answers.forEach((answer, answerIndex) => {
      output += `<input type="radio" name="question-${questionIndex}" value="${answerIndex}">
            <span">${answer}</span><br>`;
    });
    output += `</label>`;
    output += `</div>`;

    var out = `<button type="submit" id="submit_1" onclick="calculate()">Submit</button>`;

    $('#head_title').html('OOPS');
    $('#quiz').html(output);
    $("#quiz").fadeIn();
    $('.but_space').html(out);
    $('.body_1').css("background-color", "#85adad");
    $('.question').css("background-color", "#c2d6d6");
  });
}


// Handle submission of quiz
function calculate() {
  clearInterval(intervalID);
  let score = 0;
  quizData.forEach((question, questionIndex) => {
    const selectedAnswerIndex = $(`input[name="question-${questionIndex}"]:checked`).val();
    if (selectedAnswerIndex !== undefined && parseInt(selectedAnswerIndex) === question.correctAnswerIndex) {
      score++;
    }
  });


  //alert(`You scored ${score} out of ${quizData.length}`);
  var message = `Your Score : ${score}`;
  $("#message").html("<div class=\"alert alert-success\">" + message + "</div>");
  $("#message").removeClass("d-none").toggle().fadeIn();
}



//API
var res;
var params;
var curr_api;


$(document).ready(function () {
  function render(param, head, diff) {

    //storing the api end point 
    params=param;

    // API endpoint URL
    var apiUrl;
    $("#message").hide();
    if(diff==='any')
    {
      apiUrl = `https://quizapi.io/api/v1/questions?apiKey=JK0JwVMst6SzgZdgdpfaMigtE4HSmBoBhuoybIca&category=${param}&limit=10`;
    }
    else
    {
      apiUrl = `https://quizapi.io/api/v1/questions?apiKey=JK0JwVMst6SzgZdgdpfaMigtE4HSmBoBhuoybIca&category=${param}&difficulty=${diff}&limit=10`;
    }

    // Send AJAX request
    $.ajax({
      url: apiUrl,
      type: 'GET',
      success: function (response) {
        //console.log(response);
        res = response;
        var output = '';
        for (var i = 0; i < response.length; i++)
        {
          var questions = response[i].question;
          var answersLength = response[i].answers;
          output += `<label class="question";><h5>${questions}</h5>`;
          var answerIndex = 0;
          for (const [key, value] of Object.entries(answersLength)){
            if (value != null) {
              output += `<input type="radio" name="question-${i}" value="${answerIndex++}"><span">${value}</span><br>`;
            }
          }
          output += `</label>`;
          output += `</div>`;
          var out = `<button type="submit" id="submit" onclick="calculate_1()">Submit</button>`;
          $('#head_title').html(head);
          $('#quiz').html(output);
          $('.but_space').html(out);
          $("#quiz").fadeIn();

          if (param == 'sql') {
            $('.body_1').css("background-color", "black");
            $('.question').css("background-color", "#bfbfbf");
          }
          else if (param == 'devops') {
            $('.body_1').css("background-color", "rgb(85, 2, 108)");
            $('.question').css("background-color", "#ffe6ff");
          }
          else if(param == 'linux'){
            $('.body_1').css("background-color", "#003d99");
            $('.question').css("background-color", "#99c2ff");
          }
          else if(param=='oops')
          {
            $('.body_1').css("background-color", "#a8dcf0");
            $('.question').css("background-color", "#d3edf8");
          }
          
        }
      },
      // Handle error
      error: function (jqXHR, textStatus, errorThrown)
      { 
          console.log(textStatus + ': ' + errorThrown);
      }
    });
  }


  //Function to update timer
  function UpdateCounter() {
    let hours = Math.floor(counter / 3600);
    let minutes = Math.floor((counter % 3600) / 60);
    let seconds = counter % 60;

    let timeString = `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    $(".time-elapsed-container").text(timeString);
      counter++;
  }


  //perform action when sql is selected
  $(".sql").click(function () {
    $(".new-container").show();
    curr_api='SQL';
    clearInterval(intervalID);
    render('sql', 'SQL','any');
    Timecontroller();
  });

  //perform action when devops is selected
  $(".devops").click(function ()
  {
    $(".new-container").show();
    curr_api='DevOps';
    clearInterval(intervalID);
    render('devops', 'DevOps','any');
    Timecontroller();
  });


  ////perform action when linux is selected
  $(".linux").click(function ()
  {
    $(".new-container").show();
    curr_api='Linux';
    clearInterval(intervalID);
    render("linux", 'Linux','any');
    Timecontroller();
  });

  //perform action when OOPS
  $(".oops").click(function ()
  {
    curr_api='OOPS';
    clearInterval(intervalID);
    renderQuiz();
    Timecontroller();
  })


  // DIfficulty level

  $("#easy_1").click(function(){
    clearInterval(intervalID);
    render(params,curr_api,'Easy');
    Timecontroller();
  })
  $("#medium").click(function(){
    clearInterval(intervalID);
    render(params,curr_api,'Medium');
    Timecontroller();
  })

  $("#hard").click(function(){
    clearInterval(intervalID);
    render(params,curr_api,'Hard');
    Timecontroller();
  })


  //function to display the time counter
  function Timecontroller()
  {
    counter=0;
    $('.time-elapsed-container').show();
    intervalID = setInterval(UpdateCounter, 1000);
  }

})

  


//function to calculate the score
function calculate_1()
{
  clearInterval(intervalID);
  let score = 0;
  for (var l = 0; l < 10; l++) {
    const selectedAnswerIndex = $(`input[name="question-${l}"]:checked`).val();

    var answersL = res[l].answers;
    var st = res[l].correct_answer

    console.log(Object.keys(answersL)[selectedAnswerIndex]);
    if(selectedAnswerIndex != undefined && (st === Object.keys(answersL)[selectedAnswerIndex]))
    {
      score++;
    }
  }

  //Displaying Score
  var message = `Your Score : ${score}`;
  $("#message").html("<div class=\"alert alert-success\">" + message + "</div>");
  $("#message").removeClass("d-none").hide().fadeIn();
};








