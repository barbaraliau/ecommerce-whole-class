var app = angular.module('fsCommerce');

app.controller('HomeController', function(authService){
	var Home = this;

	authService.updateUser()
		.then(function(data){
			Home.user = data;
		})

	Home.logout = function(){
		
	}



})//end
