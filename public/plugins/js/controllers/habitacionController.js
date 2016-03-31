app.controller('habitacionController', function($scope,$http) {

    $scope.enviar = function () {
        $http.post('admin/habitacion',
            {   'numero':$scope.numero,
                'habtipo_id':$('#habtipo_id').val(),
                'estado_id':$('#estado_id').val(),
                //'hotel_id':$('#hotel_id').text()
            }).then(function successCallback(response) {
                $scope.mensaje = response.data.mensaje;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.getHabtipos = function () {
        $http.get('admin/AddHab').then(function successCallback(response) {
            console.log(response.data);
            $scope.habtipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getEstados = function () {
        $http.get('admin/getEstados').then(function successCallback(response) {
            $scope.estados = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getHabitaciones = function () {
        $http.get('admin/getHabitacions').then(function successCallback(response) {
            console.log(response.data);
            $scope.habitaciones = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

});