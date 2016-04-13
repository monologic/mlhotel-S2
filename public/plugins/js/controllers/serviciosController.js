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
        $scope.goTo2 = function(data) {
         catId = data.id;
        $location.url('/Servicios/' + catId);
        };

        $scope.geturl = function (data) {
        dataAdmin = data;

        $scope.categoria_id =Idser ;
    }
});