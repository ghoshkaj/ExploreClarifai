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
      $scope.$apply();
    };

    var token = "Pyb6Hf4tUp7LVthH6X4I8uhmIKIken";

    var header =  "Authorization: Bearer" + token;

    var tagRequest = header + "https://api.clarifai.com/v1/tag/?url=" + $scope.image_url;

    $scope.Tags = ["No Tags Yet"];
    $scope.getTags = function(){
      $http({
        method: 'GET',
        url: tagRequest
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(data);
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    }



  });
