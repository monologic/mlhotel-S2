app.controller('reservaController', function($scope,$http) {

	$scope.getReservasPorAsignar = function () {
		$http.get('admin/buscarReservasNoAsignadas').then(function successCallback(response) {
            $scope.reservas = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
	}
});