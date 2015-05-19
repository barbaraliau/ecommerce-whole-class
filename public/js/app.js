var app = angular.module('fsCommerce', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'templates/home-view.html',
		controller: 'HomeController',
		controllerAs: 'Home'
	})
	.state('products', {
		url: '/products',
		templateUrl: 'templates/products-view.html',
		controller: 'ProductsController',
		controllerAs: 'products'
	})
	.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'templates/dashboard-view.html',
		controller: 'DashBoardController',
		controllerAs: 'dashboard'
	})



})//end