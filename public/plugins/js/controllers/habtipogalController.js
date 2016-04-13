var IdHab=0
app.controller('habtipogalController', function($scope,$http, $routeParams) {
    var IdHab=0;
	$scope.habId =$routeParams.habtipoId;
	IdHab=$scope.habId;
     $scope.getHabTipoGal= function () { 
            $http.get('admin/habtipoF/'+ IdHab).then(function successCallback(response) {
            	$scope.habfotos=response.data;  
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }
    var iconos;
    $scope.gethabitacionG= function () { 
            $http.get('admin/gethabitaciones/'+IdHab).then(function successCallback(response) {
                $scope.habfotos=response.data;
                $scope.galeria = response.data[0].habtipofotos;
                iconos=response.data[0].habtipo_serviciointernos;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }

    $scope.GuardarIcon= function () { 
            for (var i = 0; i < iconos.length; i++) {
                if ($('#'+iconos[i].id).prop('checked'))
                    iconos[i].estado='true';
            $http.put('admin/gethabitaciones/'+IdHab).then(function successCallback(response) {
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
            }          
        }

});