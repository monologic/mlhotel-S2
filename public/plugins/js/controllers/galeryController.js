app.controller('galeryController', function($scope,$http) {
     $scope.getfoto = function () {
        $http.get('admin/getGaleryPhoto').then(function successCallback(response) {
            $scope.fotos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
	
	 var idFoto;

    $scope.dataEditar = function (data) {

        idFoto = data.id;
        $scope.idFoto=data.id;
        $scope.mltitulo = data.titulo;
        $scope.mldescripcion = data.descripcion;
        $scope.mlestado = data.estado;
    }
     $scope.editarfoto = function () {

        $http.put('admin/galeria/'+idFoto,
            {   'titulo':$scope.mltitulo,
                'descripcion':$scope.mldescripcion,
                'estado':$scope.mlestado,
            }).then(function successCallback(response) {
                 $scope.getfoto = response.data;
            }, function errorCallback(response) {
                
            });
    }

     $scope.eliminar = function (id) {
        $http.delete( 'admin/galeria/'+id ).then(function successCallback(response) {
            $scope.getfoto = response.data;
        }, function errorCallback(response) {
            alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
        });
    }    
});