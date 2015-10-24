var app = angular.module('hownicareyou', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider){

    /* Here we set up our home route. The state is given a name ('home'), URL ('/home'), and template URL ('/home.html'). We've also told Angular that our new state should be controlled by MainCtrl. Finally, using the otherwise() method we've specified what should happen if the app receives a URL that is not defined */

    $stateProvider
      .state('home',{
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['testmakers', function (testmakers) {
            return testmakers.getAll();
          }]
        }
      })

      .state('take-test',{
        url: '/take-test',
        templateUrl: '/take-test.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['testmakers', function (testmakers) {
            return testmakers.getAll();
          }]
        }
      })

      .state('make-test',{
        url: '/make-test',
        templateUrl: '/make-test.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['testmakers', function (testmakers) {
            return testmakers.getAll();
          }]
        }
      })



      .state('addquestions', {
        url: '/testmakers/{id}/addquestions',  //'id' is actually a route parameter that will be made available to our controller.
        templateUrl: '/addquestions.html',
        controller: 'TestmakersCtrl',
        resolve: {
          testmaker: ['$stateParams', 'testmakers', function($stateParams, testmakers){
            return testmakers.getOne($stateParams.id)
          }]
        }
      })

      .state('taketest', {
        url: '/testmakers/{id}/taketest',  //'id' is actually a route parameter that will be made available to our controller.
        templateUrl: '/taketest.html',
        controller: 'TestmakersCtrl',
        resolve: {
          testmaker: ['$stateParams', 'testmakers', function($stateParams, testmakers){
            return testmakers.getOne($stateParams.id)
          }]
        }
      })

      .state('results', {
        url: '/testmakers/{id}/results/{score}',  //'id' is actually a route parameter that will be made available to our controller.
        templateUrl: '/results.html',
        controller: 'TestmakersCtrl',
        resolve: {
          testmaker: ['$stateParams', 'testmakers', function($stateParams, testmakers){
            console.log("$stateParams.score", $stateParams.score)
            return testmakers.getOne($stateParams.id)
          }]
        }
      })

      .state('leaderboard', {
        url: '/testmakers/{id}/leaderboard',  //'id' is actually a route parameter that will be made available to our controller.
        templateUrl: '/leaderboard.html',
        controller: 'TestmakersCtrl',
        resolve: {
          testmaker: ['$stateParams', 'testmakers', function($stateParams, testmakers){
            console.log("$stateParams.score", $stateParams.score)
            return testmakers.getOne($stateParams.id)
          }]
        }
      })

    $urlRouterProvider.otherwise('home')
  }
])
