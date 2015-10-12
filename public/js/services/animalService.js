angular.module('animalService', [])

    // super simple service
    // each function returns a promise object
    .factory('Animals', ['$http',function($http) {
        return {
            get : function() {
                return $http.get('/api/animals');
            },
            create : function(animalData) {
                return $http.post('/api/animals', animalData);
            },
            delete : function(id) {
                return $http.delete('/api/animals/' + id);
            }
        }
    }]);