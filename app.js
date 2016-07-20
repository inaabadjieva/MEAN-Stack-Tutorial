var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainController'
		})
		.state('posts', {
			url: '/posts/{id}',
			templateUrl: '/posts.html',
			controller: 'PostsController'
		})

		$urlRouterProvider.otherwise('home');
	}]);

app.controller('PostsController', [
	'$scope', 
	'$stateParams', 
	'posts',
	function($scope, $stateParams, posts){
		$scope.post = posts.posts[$stateParams.id];
		$scope.addComment = function(){
			if($scope.body === ' ') { return; }
			$scope.post.comment.push({
				body: $scope.body,
				author: 'user',
				upvotes: 0
			});
			$scope.body = ' ';
		};
	}
]);

app.controller('MainController', [
	'$scope', 
	'posts',
	function($scope, posts){
		$scope.posts = posts.posts;
		$scope.addPost = function(){
			if(!$scope.title || $scope.title === ' ') { return; }
			$scope.posts.push({
				title: $scope.title, 
				link: $scope.link,
				upvotes: 0,
				comments: [
				{author: 'Joe', body: 'Cool post!', upvotes: 0},
				{author: 'Bob', body: 'Great idea!', upvotes: 0},
				]
			});
			$scope.title = ' ';
			$scope.link = ' ';
		};	
		$scope.incrementUpvotes = function(post){
			post.upvotes += 1;
		}
	}]);

app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o; 
}]);