app.controller('TestmakersCtrl', [
  '$scope',
  '$state',
  '$stateParams',
  'testmakers', //This is called injecting the testmakers service (from our factory). It is equivalent to obj
  'testmaker', //The individual post

  function($scope, $state, $stateParams, testmakers, testmaker){
    //$scope.post = posts.posts[$stateParams.id] //= service.arrayName
    $scope.testmaker = testmaker;

    $scope.addQuestion = function(){
      console.log("gonna add a question - controller")
      if(!$scope.content || $scope.content === '') {return}
      testmakers.addQuestion(testmaker._id, {
        content: $scope.content,
        options: [$scope.option1, $scope.option2],
        correctAnswer: $scope.correctAnswer
      }).success(function(question){
        $scope.testmaker.questions.push(question);
      });
      $scope.content = '';
      $scope.option1 = '';
      $scope.option2 = '';
      $scope.correctAnswer = '';
    }

    // $scope.deleteQuestion = function(){
    //   console.log("gonna add a question - controller")
    //   if(!$scope.content || $scope.content === '') {return}
    //   testmakers.addQuestion(testmaker._id, {
    //     content: $scope.content,
    //     options: [$scope.option1, $scope.option2],
    //     correctAnswer: $scope.correctAnswer
    //   }).success(function(question){
    //     $scope.testmaker.questions.push(question);
    //   });
    //   $scope.content = '';
    //   $scope.option1 = '';
    //   $scope.option2 = '';
    //   $scope.correctAnswer = '';
    // }

    $scope.addTesttaker = function(){
      console.log("gonna add a testtaker")

      if(!$scope.name || $scope.name === '') {return}
      testmakers.addTesttaker(testmaker._id, {
        name: $scope.name,
        score: $scope.score
      }).success(function(testtaker){
        $scope.testmaker.testtakers.push(testtaker);
        $state.go('leaderboard', {'id':$scope.testmaker._id, 'score':$scope.score})
      });
      // $scope.name = '';
      // $scope.score = '';
    }

    $scope.index = 0;
    $scope.currentQuestion = $scope.testmaker.questions[$scope.index];
    $scope.numCorrect = 0;
    $scope.numQuestions = $scope.testmaker.questions.length
    $scope.score = getScore();

    $scope.makeChoice = function(option){
      console.log("makeChoice - option:", $scope.currentQuestion.options[option]);
      console.log("correctChice", $scope.currentQuestion.correctAnswer);
      if ($scope.currentQuestion.options[option] == $scope.currentQuestion.correctAnswer){
        //when they get the answer correct
        $scope.numCorrect++;
      }

      if($scope.index == $scope.numQuestions - 1){
        // if($scope.index == 5)
        //They've answered every question
        // $scope.score = parseFloat($scope.testmaker.questions.length * 100/$scope.numCorrect)
        $scope.score = ($scope.numCorrect * 100)/$scope.numQuestions;
        console.log("$scope.numCorrect", $scope.numCorrect)
        console.log("$scope.score", $scope.score)
        console.log("$state.params", $state.params)
        console.log("$stateParams", $stateParams)
        saveScore($scope.score)
        $state.go('results', {'id':$scope.testmaker._id, 'score':$scope.score});
        $scope.index = 0;
      }
      else {
        $scope.index++
        $scope.currentQuestion = $scope.testmaker.questions[$scope.index]
      }
    }

    $scope.formIsVisible = false;
    $scope.lederboardVisible = false;
    $scope.restartTest = function(option){
      // $location.path('#/testmakers/'+$scope.testmaker.id+'/taketest')
    }

  }
])

app.controller('MainCtrl', [
  '$scope',
  'testmakers', // this injects the testmaker service into our controller so we can access its data
  function($scope, testmakers){
    $scope.test = 'Hello world!';

    $scope.testmakers = testmakers.testmakers; //does this set up two way data binding?
    /*any change or modification made to $scope.posts will be stored in the service and immediately accessible by any other module that injects the posts service.*/

    $scope.addTestmaker = function(){
      if(!$scope.first_name || $scope.first_name ==='') {return}
      testmakers.create({
        first_name: $scope.first_name,
        last_name: $scope.last_name
      });
      $scope.first_name=''
      $scope.last_name=''
    }




  }
])
