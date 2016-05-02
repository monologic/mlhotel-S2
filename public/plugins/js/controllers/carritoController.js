app.controller('carritoController', function($scope,$http) {

    $scope.enviarhab = function () {
        $http.post('service/carrito',
            {   'nombre':$scope.nombre,
                'capacidad':$scope.capacidad,
                'precio':$scope.precio
            }).then(function successCallback(response) {
                $scope.mensaje = response.data.mensaje;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.guardarCliente = function () {
        
        $http.post('cart/cliente',
            {   'nombres':$scope.nombres,
                'apellidos':$scope.apellidos,
                'dni':$scope.dni,
                'porcentaje':$('#porcentaje').val()
            }).then(function successCallback(response) {
                 $scope.pagar();
            }, function errorCallback(response) {
                
            }
        );
    }
    
    $scope.pagar = function () {
        window.location.href = 'payment';
    }

    $scope.getPorcentajes = function () {
        $http.get('admin/getPorcentajes').then(function successCallback(response) {
                //
                $scope.porcentajes = response.data;
                
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.getTipoCambio = function () {
        $http.get('admin/getTipoCambio').then(function successCallback(response) {
                $scope.tipoCambio = response.data.tipocambio;
            }, function errorCallback(response) {
            });
    }
    $scope.example=1;
    $scope.inicializarCombo = function () {
        $('#porcentaje').material_select();
    }
    
});