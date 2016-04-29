app.controller('monedaController', function($scope,$http) {
	$scope.enviar = function () {
        $http.post('admin/moneda',
            {   'moneda':$scope.moneda,
                'siglas':$scope.siglas,
                'tipocambio':$scope.tipocambio
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    
    $scope.getMonedas = function () {
        $http.get('admin/moneda').then(function successCallback(response) {
                $scope.monedas = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.dataEditar = function (data) {

        $scope.id = data.id;
        $scope.moneda = data.moneda;
        $scope.siglas = data.siglas;
        $scope.tipocambio = data.tipocambio;
    }

    $scope.editar = function () {
        $http.put('admin/moneda/'+$scope.id,
            {   'moneda':$scope.moneda,
                'siglas':$scope.siglas,
                'tipocambio':$scope.tipocambio
            }).then(function successCallback(response) {
                $scope.monedas = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminar = function (id) {
        r = confirm("¿Deseas eliminar esta Moneda?");

        if (r) {
            $http.delete( 'admin/moneda/'+id ).then(function successCallback(response) {
                $scope.monedas = response.data;
            }, function errorCallback(response) {
                alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
            });
        }
    }
    
});