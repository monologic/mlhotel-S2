app.controller('registroController', function($scope,$http) {

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
});