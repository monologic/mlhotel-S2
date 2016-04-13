app.controller('registroController', function($scope,$http , $routeParams) {

    $scope.ponerFecha = function () {
        var f = new Date();
        $scope.fechaini = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +f.getDate();
        $scope.fechafin = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +(f.getDate() + 1);
        alert($scope.fechaini);
        /*
        var fechaini1 = new Date($scope.fechaini);
        var fechafin1 = new Date($scope.fechafin);

        alert((fechafin1 - fechaini1)/86400000);
        */
    }
	$scope.buscar = function () {
        $http.get('admin/buscar/'+$scope.fechaini+'/'+$scope.fechafin).then(function successCallback(response) {
            $scope.tipoPerHabs = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    $scope.getHabtipos = function () {
        $http.get('admin/AddHab').then(function successCallback(response) {
            $scope.habtipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    var habsSeleccionadas = new Array();
    $scope.clickOnCheck = function (habitacion) {
        
        if ($('#'+habitacion.numero).prop('checked'))
            habsSeleccionadas.push(habitacion);
        else
            habsSeleccionadas.splice(habsSeleccionadas.indexOf(habitacion),1);

        if (habsSeleccionadas.length > 0)
            $("#guardarChecks").css("display","block");
        else
            $("#guardarChecks").css("display","none");
    }

    $scope.guardarRegistros = function () {
        for (var i = 0; i < habsSeleccionadas.length; i++) {
            $http.post('admin/registro',
            {   'fechaini':$scope.fechaini,
                'fechafin':$scope.fechafin,
                'habitacion_id':habsSeleccionadas[i].id
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
        }
    }
    $scope.getReservaInfo = function () {
        $scope.idReserva = $routeParams.idReserva;

        $http.get('admin/getReserva/' + $scope.idReserva).then(function successCallback(response) {
            $scope.Reservas = response.data[0];
            var fi = $scope.Reservas.fecha_inicio;
            fi = fi.split(" ");
            $scope.fechaini = fi[0];
            var ff = $scope.Reservas.fecha_fin;
            ff = ff.split(" ");
            $scope.fechafin = ff[0];
    
            $scope.buscar();
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });   
        
    }
    $scope.buscarRegistro = function () {
        $scope.idRegistro = $routeParams.idRegistro;

        $http.get('admin/buscarRegistro/' + $scope.idRegistro).then(function successCallback(response) {
            
            $scope.registro = response.data[0];
            
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
});