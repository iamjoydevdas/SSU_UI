angular.module("ssu").controller('homeController', function(){

})
.controller('signUpController', function($scope){
	$scope.firstName = "";
	$scope.middleName = "";
	$scope.lastName = "";
	$scope.displayName = "";
	$scope.sex = "";
	$scope.email = "";
	$scope.pwd = "";
	$scope.rePwd = "";
	$scope.seqQ = "";
	$scope.seqA = "";
});