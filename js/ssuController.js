angular.module("ssu").controller('homeController', ["$rootScope",function($rootScope){

}])
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
.controller('headerController',["$rootScope","$scope", function($rootScope, $scope){
	$scope.header = "";
	$scope.isValidUser = false;
	/*$rootScope.$watch($rootScope.header, function(newVal, oldVal){
		$rootScope.header = newVal;
		$scope.isValidUser = true;
	});*/
	$scope.$on('loginEvent', function (event, data) {
	    console.log(data.header); // 'Some data'
	    $scope.header = data.header;
	    $scope.isValidUser = true;
	  });
}])

.controller('loginController',["$rootScope","$scope", function($rootScope,$scope){
	
	$scope.usernm = "";
	$scope.pass="";
	$scope.login = function(){
		
		if ($scope.usernm == "runa" && $scope.pass == "1234"){
			//$rootScope.header= $scope.usernm;
			$rootScope.$broadcast('loginEvent', {
				  header:$scope.usernm // send whatever you want
				});
		}
		
	};
	
	
	
	
}])

;