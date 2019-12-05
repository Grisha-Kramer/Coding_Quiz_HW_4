(function() {
    var questions = [{
      question: "What kind of music do you like?",
      choices: ["Breakup songs", "Bops", "Radiohead slowed down until Thom Yorke sounds like James Earl Jones","Funk"],
      correctAnswer: ["Breakup songs", "Bops", "Radiohead slowed down until Thom Yorke sounds like James Earl Jones","Funk"],
    }, {
      question: "What is Millenials best contribution to society?",
      choices: ["Parkour", "Neck/Face Tattoo Normalization", "Dubstep", "Getting the whole 'blue hair thing' to actually look good", "Popstars that actually write their own songs"],
      correctAnswer: ["Parkour", "Neck Tattoo Normalization", "Getting the whole 'blue/green hair thing' to actually look good", "Popstars that actually write their own songs"],
    }, {
      question: "I know you haven't seen Titanic in a while, but what part do you for sure remember?",
      choices: ["I'm the king of the world!!!","At the end when the boat is sinking and that dude falls and hits the propellor","Loogies being central to a romance"],
      correctAnswer: ["I'm the king of the world!!!","At the end when the boat is sinking and that dude falls and hits the propellor","Loogies being central to a romance"],
    }, ];

    var questionCounter = 0; 
    var selections = []; 
    var quiz = $('#quiz'); 
    
  
    displayNext();
    
  
    $('#next').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {        
        return false;
      }
      choose();
      
    
      if (isNaN(selections[questionCounter])) {
        alert('Please make a selection!');
      } else {
        questionCounter++;
        displayNext();
      }
    });
    
    
    $('#prev').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      choose();
      questionCounter--;
      displayNext();
    });
    
    
    $('#start').on('click', function (e) {
      e.preventDefault();
      
      if(quiz.is(':animated')) {
        return false;
      }
      questionCounter = 0;
      selections = [];
      displayNext();
      $('#start').hide();
    });
    
    $('.button').on('mouseenter', function () {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function () {
      $(this).removeClass('active');
    });

    function createQuestionElement(index) {
      var qElement = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      qElement.append(header);
      
      var question = $('<p>').append(questions[index].question);
      qElement.append(question);
      
      var radioButtons = createRadios(index);
      qElement.append(radioButtons);
      
      return qElement;
    }
    

    function createRadios(index) {
      var radioList = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        radioList.append(item);
      }
      return radioList;
    }
 
    function choose() {
      selections[questionCounter] = +$('input[name="answer"]:checked').val();
    }
    

    function displayNext() {
      quiz.fadeOut(function() {
        $('#question').remove();
        
        if(questionCounter < questions.length){
          var nextQuestion = createQuestionElement(questionCounter);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[questionCounter]))) {
            $('input[value='+selections[questionCounter]+']').prop('checked', true);
          }
          
        
          if(questionCounter === 1){
            $('#prev').show();
          } else if(questionCounter === 0){
            
            $('#prev').hide();
            $('#next').show();
          }
        }else {
          var scoreElem = displayScore();
          quiz.append(scoreElem).fadeIn();
          $('#next').hide();
          $('#prev').hide();
          $('#start').show();
        }
      });
    }
    
    
    function displayScore() {
      var score = $('<p>',{id: 'question'});
      
      var numCorrect = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].correctAnswer) {
          numCorrect++;
        }
      }
      
      score.append('You got 3' + ' questions out of ' +
                   questions.length + ' right!!!');
      return score;
    }
  })();