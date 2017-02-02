angular.module('ssu').config(function($routeProvider){
	$routeProvider
    .when("/", {
        templateUrl : "view/home.html",
        controller: "homeController"
        
    })
    .when("/signUp", {
    	templateUrl : "view/signUp.html",
        controller: "signUpController"
    });
});
