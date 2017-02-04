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

	$scope.forgotPassword = function(){
		$rootScope.$broadcast("refreshforgotpass",{
			refresh : true
		});
	};


}])
.controller('forgotPasswordController',['$http', '$scope', function($http, $scope){
	$scope.seqA="";
	$scope.$on('refreshforgotpass', function (event, data) {
		if(data.refresh){
			$scope.usernm="";
			$scope.isUserNameBlank = false;
			$scope.isUserNameIncorrect = false;
			$scope.isSeqQVisible= false;
			$scope.resetValue = true;
			$scope.securityQuestion="";
			$scope.usernameVisibility = false;
			$scope.seqANotMatched = false;
			$scope.seqA="";
		}
	});

	$scope.usernm="";
	$scope.isUserNameBlank = false;
	$scope.isUserNameIncorrect = false;
	$scope.isSeqQVisible= false;
	$scope.resetValue = true;
	$scope.usernameVisibility = true;
	$scope.securityQuestion="";
	$scope.seqANotMatched = false;
	$scope.checkUserName = function(){
		if ($scope.usernm == "" ){
			$scope.isUserNameBlank = true;
			$scope.isSeqQVisible= false;
			$scope.isUserNameIncorrect = false;
			$scope.usernameVisibility = false;
			$scope.seqANotMatched = false;
		}
		else {
			$http({
				method : 'POST',
				url : "http://localhost:8084/ssu_service/rest/ssu/checkUserName"	,
				params : {
					'userName' : $scope.usernm
				}				
			}).then(function succsess(response){
				$scope.securityQues = response.data.securityQues;
				if($scope.securityQues == '-1'){
					$scope.isUserNameIncorrect = true;
					$scope.isUserNameBlank = false;
					$scope.isSeqQVisible = false;
					$scope.usernameVisibility = false;
					$scope.seqANotMatched = false;
				}else{
					$scope.securityQuestion = $scope.securityQues;
					$scope.isSeqQVisible = true;
					$scope.isUserNameIncorrect = false;
					$scope.isUserNameBlank = false;
					$scope.usernameVisibility = true;
					$scope.seqANotMatched = false;
				}
			}).then(function fail(response){

			});

		}

	};

	$scope.reset = function(){
		
		if($scope.seqA !=""){
			$http({
				method : 'POST',
				url : "http://localhost:8084/ssu_service/rest/ssu/resetPass"	,
				params : {
					'userName' : $scope.usernm,
					'seqA' : $scope.seqA
				}				
			}).then(function succsess(response){
				if(response.data.isAnswerMatched){
					$scope.resetValue = false
					
				}else{
					$scope.seqA="";
					$scope.seqANotMatched = true;				}
			}).then(function fail(response){

			});
		}

	};


}])
;