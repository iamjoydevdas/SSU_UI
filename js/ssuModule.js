angular.module('ssu',['ngRoute','ui.bootstrap','ngAnimate', 'toaster'])
.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = !0;
    cfpLoadingBarProvider.includeSpinner = !1;
    cfpLoadingBarProvider.latencyThreshold = 400;
}]);