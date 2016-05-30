app.controller('graficasController', function($scope,$http) {
     $scope.getgrafCircle = function () {

        $http.get('admin/report').then(function successCallback(response) {
            $scope.habit = response.data['habitaciones'];
            var totoal=0;
            for (var i = 0; i < $scope.habit.length; i++) {
                totoal+=$scope.habit[i].user_count;
            }
            for (var i = 0; i < $scope.habit.length; i++) {
                $scope.habit[i].value = ($scope.habit[i].user_count * 100 / totoal).toFixed(1);
                $scope.habit[i].label = $scope.habit[i].nombre;
                $scope.habit[i].formatted = 'aprox. ' + $scope.habit[i].value + '%';
            }
            Morris.Donut({
                element: 'graph',
                data:$scope.habit,
                  formatter: function (x, data) { return data.formatted; }
            });

            $scope.diasReservas = response.data['diasReservas'];
            $scope.mesesReservas = response.data['mesesReservas'];
            $scope.yearsReservas = response.data['yearsReservas'];

            for (var i = 0; i < $scope.diasReservas.length; i++) {
                    $scope.diasReservas[i].x = $scope.diasReservas[i].fecha_inicio;
                    $scope.diasReservas[i].y = $scope.diasReservas[i].cantidad;
                }

                Morris.Bar({
                  element: 'reservasdias',
                  data:$scope.diasReservas,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Cantidad']
                }).on('click', function(i, row){
                  console.log(i, row);
                })

            for (var i = 0; i < $scope.mesesReservas.length; i++) {
                    $scope.mesesReservas[i].x = $scope.mesesReservas[i].fecha_inicio;
                    $scope.mesesReservas[i].y = $scope.mesesReservas[i].cantidad;
                }

                Morris.Bar({
                  element: 'reservasmeses',
                  data:$scope.mesesReservas,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Cantidad']
                }).on('click', function(i, row){
                  console.log(i, row);
                })

            for (var i = 0; i < $scope.yearsReservas.length; i++) {
                    $scope.yearsReservas[i].x = $scope.yearsReservas[i].fecha_inicio;
                    $scope.yearsReservas[i].y = $scope.yearsReservas[i].cantidad;
                }

                Morris.Bar({
                  element: 'reservasaños',
                  data:$scope.yearsReservas,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Cantidad']
                }).on('click', function(i, row){
                  console.log(i, row);
                })
            $scope.diasRegistros = response.data['diasRegistros'];
            $scope.mesesRegistros = response.data['mesesRegistros'];
            $scope.yearsRegistros = response.data['yearsRegistros'];

             for (var m = 0; m < $scope.diasRegistros.length; m++) {
                    $scope.diasRegistros[m].x = $scope.diasRegistros[m].fecha;
                    $scope.diasRegistros[m].y = $scope.diasRegistros[m].total
                }

                Morris.Bar({
                  element: 'ganaciasdias',
                  data:$scope.diasRegistros,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Soles']
                }).on('click', function(i, row){
                  console.log(i, row);
                })

            for (var n = 0; n < $scope.mesesRegistros.length; n++) {
                    $scope.mesesRegistros[n].x = $scope.mesesRegistros[n].fecha;
                    $scope.mesesRegistros[n].y = $scope.mesesRegistros[n].total
                }

                Morris.Bar({
                  element: 'ganaciasmeses',
                  data:$scope.mesesRegistros,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Soles']
                }).on('click', function(i, row){
                  console.log(i, row);
                })
                for (var b = 0; b < $scope.yearsRegistros.length; b++) {
                    $scope.yearsRegistros[b].x = $scope.yearsRegistros[b].fecha;
                    $scope.yearsRegistros[b].y = $scope.yearsRegistros[b].total
                }

                Morris.Bar({
                  element: 'ganaciasaños',
                  data:$scope.yearsRegistros,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Soles']
                }).on('click', function(i, row){
                  console.log(i, row);
                })

        }, function errorCallback(response) {
        });
    }
});