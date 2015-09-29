app.factory('testmakers', ['$http', function($http){

  var obj = {
    testmakers: [{first_name: 'nic', last_name: 'small', questions:[], testtakers:[]}]
  };

  var score = 0;

  saveScore = function(userScore){
    console.log("saved score", userScore)
    score = userScore;
  }

  getScore = function(){
    console.log("returning score of ", score)
    return score;
  }

  obj.getAll = function() {
    return $http.get('/testmakers').success(function(data){
      angular.copy(data, obj.testmakers);
      //angular.copy() creates a deep copy of the returned data. This ensures that the $scope.posts variable in MainCtrl will also be updated, ensuring the new values are reflected in our view
      //it copies the data pulled from the DB into the Angular model/service
    })
  }

  obj.create = function(testmaker){
    return $http.post('/testmakers', testmaker).success(function(data){
      obj.tesmakers.push(testmaker);
      //grab the post that was just saved to the DB in the post call and add that to the angular model/service
    })
  }

  obj.getOne = function(id) {
    return $http.get('/testmakers/' + id).then(function(res){
      return res.data;
    })
  }

  obj.addQuestion = function(id, question){
    console.log("gonna add a question - service")
    console.log("id", id)
    console.log("question", question)
    return $http.post('/testmakers/' + id + '/questions', question);
  }

  obj.addTesttaker = function(id, testtaker){
    console.log("gonna add a testtaker - service")
    console.log("id", id)
    console.log("testtaker", testtaker)

    return $http.post('/testmakers/' + id + '/testtakers', testtaker);
  }



  return obj
}])
