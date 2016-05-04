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

	$scope.buscarHab = function () {
        var fini = $scope.formatDate($('#fechaini').val());
        var ffin = $scope.formatDate($('#fechafin').val());

        $http.get('cart/buscarHabitaciones/'+fini+'/'+ffin ).then(function successCallback(response) {
        	window.location.href = '#/habitaciones';
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

    }
    $scope.formatDate = function (date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
});