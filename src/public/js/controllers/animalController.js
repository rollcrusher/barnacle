angular.module('animalMainController', [])

	// inject the Animal service factory into our controller
	.controller('animalController', ['$scope','$http','Animals',($scope, $http, Animals) => {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all Animals and show them
		// use the service to get all the Animals
		Animals.get()
			.success((data) => {
				$scope.animals = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = () => {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Animals.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success((data) => {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = (id) =>{
			$scope.loading = true;

			Animals.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success((data) => {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};
	}]);
