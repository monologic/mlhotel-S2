app.controller('porcentajeController', function($scope,$http) {
	$scope.enviar = function () {
        $http.post('admin/porcentaje',
            {   'porcentaje':$scope.porcentaje,
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    
    $scope.getPorcentajes = function () {
        $http.get('admin/porcentaje').then(function successCallback(response) {
                $scope.porcentajes = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.dataEditar = function (data) {

        $scope.id = data.id;
        $scope.porcentaje = data.porcentaje;
        
    }

    $scope.editar = function () {
        $http.put('admin/porcentaje/'+$scope.id,
            {   'porcentaje':$scope.porcentaje
            }).then(function successCallback(response) {
                $scope.porcentajes = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminar = function (id) {
        r = confirm("¿Deseas eliminar esta porcentaje?");

        if (r) {
            $http.delete( 'admin/porcentaje/'+id ).then(function successCallback(response) {
                $scope.porcentajes = response.data;
            }, function errorCallback(response) {
                alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
            });
        }
    }
    
});