/*eslint-disable */
'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function() {

	describe('animalController', function(){

	   beforeEach(module('barnacleApp'));

		it('should ...', inject(function($controller) {
			var scope = {},
				ctrl = $controller('animalController', {$scope:scope});

			expect(scope.animals.length).toBe(2);
		}));

	});
});