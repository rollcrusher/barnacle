angular.module('animalService', [])

	.factory('Animals', ['$http',($http) => {
		return {
			get: () => {
				return $http.get('/api/animals');
			},
			create: (animalData) => {
				return $http.post('/api/animals', animalData);
			},
			delete: (id) => {
				return $http.delete('/api/animals/' + id);
			}
		};
	}]);
