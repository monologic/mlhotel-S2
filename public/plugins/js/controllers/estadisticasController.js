app.controller('estadisticasController', function($scope,$http) {
    $scope.buscarE = function ()
    {   
        a = $('#year').val();
        m = $('#mes').val();
        $http.get('admin/estadisticas/'+m+'/'+ a).then(function successCallback(response) {
                    $scope.estadisticas = response.data;
                    $scope.arribosTipo = response.data.arribosPorTipo;
                    console.log($scope.arribosTipo );
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
    }
    $scope.generar = function (){
        $('.tabq').css('visibility','visible')
    }
});