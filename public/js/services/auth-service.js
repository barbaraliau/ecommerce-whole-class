var app = angular.module('fsCommerce');

app.service('authService', function($http){

	this.user = {};

	this.updateUser = function(){
		return $http({
			method: 'GET',
			url: '/api/me'
		}).then(function(res){
			this.user = res.data;
			return this.user
		})
	}

	this.logout = function(){
		return $http({
			method: 'GET',
			url: '/auth/logout'
		}).then(function(res){
			console.log(res)
			this.updateUser();
			return res.data
		})
	}

})//end