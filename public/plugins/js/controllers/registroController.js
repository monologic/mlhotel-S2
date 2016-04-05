app.controller('registroController', function($scope,$http) {

	$scope.buscar = function () {
        $http.get('admin/buscar/'+$scope.fechaini+'/'+$scope.fechafin).then(function successCallback(response) {
            $scope.tipoPerHabs = response.data;

            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    var htipos;

    function ordenarPorTipo(data) {

        var ord = new Array();
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < htipos.length; j++) {
                if (htipos[j].id == data[i].habtipo_id)
                    htipos[j].push(data[i]);
            }
        }
        console.log(htipos);
    }

    $scope.getHabtipos = function () {
        $http.get('admin/AddHab').then(function successCallback(response) {
            $scope.habtipos = response.data;
            htipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
});