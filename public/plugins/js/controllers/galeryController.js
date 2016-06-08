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
                $('#alertCambio').css('display','block');
                $scope.fotos = response.data;
            }, function errorCallback(response) {
                
            });
    }

     $scope.eliminar = function (id) {

        swal({   title: "¿ Estas seguro ?",
            text: "Se eliminara esta foto de la galeria",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",   
            closeOnConfirm: false,
            cancelButtonText:"Cancelar", 
        }, 

            function(){

                swal("Eliminado!", 
                    "El ha eliminado la foto de la galeria.", 
                    "success"); 

                $http.delete( 'admin/galeria/'+id ).then(function successCallback(response) {
                    $('#alertDelete').css('display','block');
                    $scope.fotos = response.data;
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