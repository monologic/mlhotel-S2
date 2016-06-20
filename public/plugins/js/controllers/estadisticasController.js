app.controller('estadisticasController', function($scope,$http) {
	$scope.enviar = function () {
        $http.post('admin/banco',
            {   'banco':$scope.banco,
                'cuenta':$scope.cuenta,
                'cci':$scope.cci
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.generar = function (){
        $('.tabq').css('visibility','visible')
    }
});