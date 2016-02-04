'use strict';

/**
 * @ngdoc function
 * @name exploreClarifaiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the exploreClarifaiApp
 */
angular.module('exploreClarifaiApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.num = 1000;

    $scope.image_url = "https://unsplash.it/300?image=" + $scope.num;



    $scope.getRandomNumber = function(max, min) {
      return Math.floor(Math.random() * (max - min) + min);
    };

    $scope.getRandomImage = function(){
      $scope.num  = $scope.getRandomNumber(0,1005);
      $scope.image_url = "https://unsplash.it/300?image=" + $scope.num;
      setToken();
    };

    // var header =  "Authorization: Bearer" + token;

    var CLIENT_ID = "QFv4z9eNEKGAGNLl9hHtb7tIZ9iopyuV8bTxavR6";
    var CLIENT_SECRET= "svX3BEQAnH1dw1HFuGIFHLUggs133cO3ff7RrIVI";
    var setTokenUrl = "https://api.clarifai.com/v1/token/?grant_type=client_credentials&client_id=QFv4z9eNEKGAGNLl9hHtb7tIZ9iopyuV8bTxavR6&client_secret=svX3BEQAnH1dw1HFuGIFHLUggs133cO3ff7RrIVI";

    var tagUrl = "https://api.clarifai.com/v1/tag/?url=" + $scope.image_url;

    $scope.tags = ["No Tags Yet"];

    $scope.probabilities = [];

    var access_token = "";

    setToken();

    function setToken(){
      $http({
        method: 'POST',
        url: setTokenUrl
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        access_token = response.data.access_token;
        getTags();
      }, function errorCallback(response) {
        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    };

    function getTags(){
     $http({
        method: 'GET',
        url:'https://api.clarifai.com/v1/tag/?url='+$scope.image_url+'&access_token='+access_token
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        $scope.tags = response.data.results[0].result.tag.classes;
        $scope.probabilities = response.data.results[0].result.tag.probs;
      }, function errorCallback(response) {
        console.log(response);
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }

  });
