var Gather = angular.module('Gather', []);

function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/emails')
		.success(function(data) {
			$scope.emails = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createSubmission = function() {
		$http.post('/api/emails', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.message = 'Thanks! We will keep you posted';
				$('#myModal').modal('toggle');
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}