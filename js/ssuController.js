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
	$scope.$on('loginEvent', function (event, data) {
		console.log(data.header); // 'Some data'
		$scope.header = data.header;
		$scope.isValidUser = true;
	});
	$scope.$on('closeLoginPopover',function(evt,attr){
		$scope.isOpen = false;
	})
}])
.controller('loginController',["$rootScope","$scope", '$uibModal', function($rootScope, $scope, $modal){
	$scope.usernm = "";
	$scope.pass="";
	$scope.login = function(){
		if ($scope.usernm == "runa" && $scope.pass == "1234"){
			$rootScope.$broadcast('loginEvent', {
				header:$scope.usernm 
			});
		}
	};
	$scope.forgotPassword = function(){
		$rootScope.$broadcast('closeLoginPopover');
		$rootScope.modalInstance = $modal.open({
			templateUrl: './view/login/forgetPassword.html',
			controller: 'forgotPasswordController',
			backdrop: 'static',
			modalFade: true,
			size: 'lg'
		});
	};
	
}])
.controller('forgotPasswordController',['$rootScope', '$http', '$scope', function($rootScope, $http, $scope){
	console.log('helooo')
	$scope.seqA="";
	$scope.usernm="";
	$scope.isUserNameBlank = false;
	$scope.isUserNameIncorrect = false;
	$scope.isSeqQVisible= false;
	$scope.resetValue = true;
	$scope.usernameVisibility = false;
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
	$scope.close = function(){
		$rootScope.modalInstance.dismiss('cancel');
	}
}]);