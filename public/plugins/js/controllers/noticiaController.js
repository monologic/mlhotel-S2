app.controller('noticiaController', function($scope,$http) {
     $scope.getNoticias = function () {
        $http.get('admin/getNoticias').then(function successCallback(response) {
            $scope.noticia = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    } 
     $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        for (var i = 0; i < $scope.noticia.length; i++) {
                $('#contenido'+i).html($scope.noticia[i].contenido);
            }
    }); 
     $scope.getNoticiash = function () {
        $http.get('admin/getNoticias').then(function successCallback(response) {
            $scope.noticias = response.data[0];
            var ultima =$scope.noticias.contenido;
            $('#contenidohtml').html(ultima);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    var idNot;
    $scope.dataEditar = function (data) {

        idNot = data.id;
        $scope.idNot=data.id;
        $scope.mltitulo = data.titulo;
        $scope.mlfuente = data.fuente;
        $scope.mlfecha = data.fecha;
        $scope.mlcontenido = data.contenido;
        $scope.mlestado = data.estado;
    }
     $scope.editarNot = function () {

        $http.put('admin/noticia/'+idNot,
            {   'titulo':$scope.mltitulo,
                'contenido':$scope.mlcontenido,
                'fecha':$scope.mlfecha,
                'fuente':$scope.fuente,
                'estado':$scope.mlestado,
            }).then(function successCallback(response) {
                $('#alertCambio').css('display','block');
                 $scope.noticia = response.data;
            }, function errorCallback(response) {
                
            });
    }

     $scope.eliminar = function (id) {
        r = confirm("¿Deseas eliminar esta noticia?");

        if (r) {
            $http.delete( 'admin/noticia/'+id ).then(function successCallback(response) {
                $('#alertDelete').css('display','block');
                $scope.noticia = response.data;
            }, function errorCallback(response) {
                alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
            });
        }
    }       
});