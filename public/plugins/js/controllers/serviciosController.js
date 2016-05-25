app.controller('serviciosController', function($scope,$http, $routeParams,$location) {
    var IdSer=0;
	$scope.Cat =$routeParams.catId;
    $scope.url =$routeParams.idSer;
	IdCat=$scope.Cat;
    Idser=$scope.url;

     $scope.getServicios= function () { 
            $http.get('admin/getServicios').then(function successCallback(response) {
                $scope.ser=response.data;  
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }

    $scope.getServiciosD= function () { 
            $http.get('admin/CategoriaServicio/'+ IdCat).then(function successCallback(response) {
                $scope.infoser=response.data[0];  
                $scope.catser=response.data[0].servicios;  
                console.log($scope.habfotos);
            }, function errorCallback(response) {
            // called asynchronously ialertf an error occurs
            // or server returns response with an error status.
            });
           
        }
    $scope.main = function (){
        $http.get('admin/getmainservices').then(function successCallback(response) {
                $scope.main=response.data[0];  
            }, function errorCallback(response) {
            // called asynchronously ialertf an error occurs
            // or server returns response with an error status.
            });
    }
        $scope.goTo2 = function(data) {
         catId = data.id;
        $location.url('/Servicios/' + catId);
        };

        $scope.geturl = function (data) {
        dataAdmin = data;

        $scope.categoria_id =Idser ;
    }
    $scope.dataEditar = function (data) {

        $scope.id = data.id;
        $scope.servicio = data.servicio;
        $scope.descripcion = data.descripcion;
        
    }
    $scope.editar = function () {
        $http.put('admin/servicio/'+$scope.id,
            {   'servicio':$scope.servicio,
                'descripcion':$scope.descripcion
            }).then(function successCallback(response) {
                window.location.reload();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminar = function (id) {
        r = confirm("¿Deseas eliminar este Servicio?");

        if (r) {
            $http.delete( 'admin/servicio/'+id ).then(function successCallback(response) {
                window.location.reload();
            }, function errorCallback(response) {
                alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
            });
        }
    }
    $scope.dataEditarCat = function (data) {

        $scope.id = data.id;
        $scope.nombre = data.nombre;
        $scope.descripcion = data.descripcion;
        
    }
    $scope.editarCat = function () {
        $http.put('admin/categoria/'+$scope.id,
            {   'nombre':$scope.nombre,
                'descripcion':$scope.descripcion
            }).then(function successCallback(response) {
                window.location.reload();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminarCat = function (id) {
        r = confirm("¿Deseas eliminar este Servicio?");

        if (r) {
            $http.delete( 'admin/categoria/'+id ).then(function successCallback(response) {
                window.location.reload();
            }, function errorCallback(response) {
                alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
            });
        }
    }

    $scope.dataMain = function () {
        $scope.idMain = $scope.main.id;
        $scope.nombreE = $scope.main.nombre;
        $scope.contenidoE = $scope.main.contenido;
    }
    
});