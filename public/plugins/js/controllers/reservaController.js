app.controller('reservaController', function($scope,$http) {
    $scope.getAllreserva = function (){
        $http.get('admin/getAllReservas').then(function successCallback(response) {
            $scope.allreservas = response.data;
            $scope.nombre = data.nombre;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.verCliente = function (data) {
        $scope.idcliente = data.id;
        $scope.nombre = data.nombres;
        $scope.apellido = data.apellidos;
        $scope.dni = data.dni;
        $scope.estado = data.estado;
        $scope.fecha_reserva = data.fecha_reserva;
        $scope.fecha_inicio = data.fecha_inicio;
        $scope.fecha_fin = data.fecha_fin;
        $scope.pagotipo = data.pagotipo;
        $scope.total = data.total;
    }
	$scope.getReservasPorAsignar = function () {
		$http.get('admin/buscarReservasNoAsignadas').then(function successCallback(response) {
            $scope.reservas = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
	}

    $scope.getReservasPorConfirmar = function (){
        $http.get('admin/getReservasPorConfirmar').then(function successCallback(response) {
            $scope.reservas = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

	$scope.buscarHab = function () {
    
        var fini = $('#fechaini').val();
        var ffin = $('#fechafin').val();

        $http.get('cart/buscarHabitaciones/'+fini+'/'+ffin ).then(function successCallback(response) {
        	window.location.href = '#/habitaciones';
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

    }
    $scope.confirmar = function (id) {
        $http.get('admin/confirmarReserva/' + id).then(function successCallback(response) {
            $scope.reservas = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.cancelar = function (id) {
        $http.get('admin/cancelarReserva/' + id).then(function successCallback(response) {
            window.location.reload();
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.dataEditar = function (data) {
        $scope.idReserva = data.id;
        $scope.nom = data.cliente.nombres + " " + data.cliente.apellidos;
        $scope.dni = data.cliente.dni;
        $scope.pagotipo = data.pagotipo.pagotipo;
        $scope.habtiposcount = data.habtiposcount;
        $('#fechaini').val(data.fecha_inicio);
        $('#fechafin').val(data.fecha_fin);
    }
    $scope.editar = function () {
        $http.post('admin/editarFechas', {
            'fechaini': $('#fechaini').val(),
            'fechafin': $('#fechafin').val(),
            'idReserva': $scope.idReserva
        }).then(function successCallback(response) {
            if (response.data.mensaje == 1) {
                alert("Se ha editado las fechas de la Reserva.")
                window.location.reload();
            }
            else {
                alert("No se puede editar las fechas de la Reserva para ese periodo de días.")
            }

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
});