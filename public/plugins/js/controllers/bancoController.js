app.controller('bancoController', function($scope,$http) {
	$scope.enviar = function () {
        $http.post('admin/banco',
            {   'banco':$scope.banco,
                'cuenta':$scope.cuenta,
                'cci':$scope.cci
            }).then(function successCallback(response) {
                window.location.href = '#/Banco/ver';
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    
    $scope.getBancos = function () {
        $http.get('admin/banco').then(function successCallback(response) {
                $scope.bancos = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.dataEditar = function (data) {

        $scope.id = data.id;
        $scope.banco = data.banco;
        $scope.cuenta = data.cuenta;
        $scope.cci = data.cci;
    }

    $scope.editar = function () {
        $http.put('admin/banco/'+$scope.id,
            {   'banco':$scope.banco,
                'cuenta':$scope.cuenta,
                'cci':$scope.cci
            }).then(function successCallback(response) {
                $scope.bancos = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminar = function (id) {
        r = swal({   title: "¿ Estas seguro ?",
            text: "Este banco se eliminara indefinidamente",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",   
            closeOnConfirm: false }, 
            function(){

                swal("Eliminado!", 
                    "El banco se ha eliminado.", 
                    "success"); 

                $http.delete( 'admin/banco/'+id ).then(function successCallback(response) {
                    $scope.bancos = response.data;
                }, function errorCallback(response) {
                    swal({   
                        title: "Ha ocurrido un error!",   
                        text: "No se puede borrar datos utilizados para otros registros.",   
                        timer: 3000,   
                        showConfirmButton: false 
                    });
                });

            });
    }

});