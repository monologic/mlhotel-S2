app.controller('clienteController', function($scope,$http) {

    $scope.getClientes = function () {
        $http.get('admin/getclientess').then(function successCallback(response) {
            //console.log(response.data);
            $scope.cliente = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    
});