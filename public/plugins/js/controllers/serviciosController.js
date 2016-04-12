app.controller('serviciosController', function($scope,$http, $routeParams) {
    var IdSer=0;
	$scope.habId =$routeParams.habtipoId;
	IdHab=$scope.habId;

     $scope.getServicios= function () { 
            $http.get('admin/getServicios').then(function successCallback(response) {
                $scope.ser=response.data;  
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }


     $scope.getHabTipoGal= function () { 
            $http.get('admin/habtipoF/'+ IdHab).then(function successCallback(response) {
            	$scope.habfotos=response.data;  
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }

    $scope.gethabitacionG= function () { 
            $http.get('admin/gethabitaciones/'+IdHab).then(function successCallback(response) {
                $scope.habfotos=response.data;
                $scope.galeria = response.data[0].habtipofotos;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }
});