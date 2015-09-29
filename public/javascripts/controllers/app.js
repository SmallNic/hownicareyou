app.controller('TestmakersCtrl', [
  '$scope',
  'testmakers', //This is called injecting the posts service (from our factory above). It is equivalent to obj
  'testmaker', //The individual post
  function($scope, testmakers, testmaker){
    //$scope.post = posts.posts[$stateParams.id] //= service.arrayName
    $scope.test = 'Hello world!';

    $scope.testmakers = testmakers.testmakers; //does this set up two way data binding?

    $scope.testmaker = testmaker;

    $scope.addQuestion = function(){
      if(!$scope.content || $scope.content === '') {return}
      testmakers.addQuestion(testmaker._id, {
        content: $scope.content,
        option1: $scope.option1,
        option2: $scope.option2,
        correctAnswer: $scope.correctAnswer
      }).success(function(question){
        $scope.testmaker.questions.push(question);
      });
      $scope.content = '';
      $scope.option1 = '';
      $scope.option2 = '';
      $scope.correctAnswer = '';
    }

    $scope.addTesttaker = function(){
      if(!$scope.name || $scope.name === '') {return}
      testmakers.addTesttaker(testmaker._id, {
        name: $scope.name,
        score: $scope.score
      }).success(function(testtaker){
        $scope.testmaker.testtakers.push(testtaker);
      });
      $scope.name = '';
      $scope.score = '';
    }
  }
])

app.controller('MainCtrl', [
  '$scope',
  'testmakers',
  'testmaker' // this injects the testmaker service into our controller so we can access its data
  function($scope, testmakers, testmaker){
    $scope.test = 'Hello world!';

    $scope.testmakers = testmakers.testmakers; //does this set up two way data binding?
    /*any change or modification made to $scope.posts will be stored in the service and immediately accessible by any other module that injects the posts service.*/

    $scope.addTestmaker = function(){
      if(!$scope.first_name || $scope.title ==='') {return}
      testmakers.create({
        first_name: $scope.first_name,
        last_name: $scope.last_name
      });
      $scope.title=''
      $scope.link=''
    }

  },
])
