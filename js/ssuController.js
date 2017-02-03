angular.module("ssu").controller('homeController', function(){

})
.controller('signUpController', function($scope){
	$scope.firstName = "";
	$scope.middleName = "";
	$scope.lastName = "";
	$scope.userName = "";
	$scope.sex = "";
	$scope.email = "";
	$scope.pwd = "";
	$scope.rePwd = "";
	$scope.seqQ = "";
	$scope.seqA = "";
})
.controller('headerController', function($scope){
	$rootScope.header = "";
	$scope.isValidUser = false;
	$rootScope.$watch('header', function(newVal, oldVal){
		$rootScope.header = newVal;
		$scope.isValidUser = true;
	});
})

.controller('loginController', function($scope){
	
	$scope.usernm = "";
	$scope.pass="";
	$scope.login = function(){
		
		if ($scope.usernm == "runa" && $scope.pass == "1234"){
			$rootscope.header= $scope.usernm;
		}
		
	};
	
	
	
})

;