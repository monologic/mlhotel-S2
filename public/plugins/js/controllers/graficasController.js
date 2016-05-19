app.controller('graficasController', function($scope,$http) {
     $scope.getgrafCircle = function () {
        $http.get('admin/report').then(function successCallback(response) {
            $scope.habit = response.data;
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
        }, function errorCallback(response) {
        });
    }
     $scope.getgrafBarr1 = function () {
        $http.get('admin/report').then(function successCallback(response) {
            $scope.habit = response.data;
            Morris.Bar({
                element: 'reservas',
                data: [
                    {x: 'Lunes', y: 3},
                    {x: 'Martes', y: 2},
                    {x: 'Miercoles', y: 4},
                    {x: 'Jueves', y: 6},
                    {x: 'Viernes', y: 12},
                    {x: 'Sabado', y: 4},
                    {x: 'Domingo', y: 15},
                ],
                xkey: 'x',
                ykeys: ['y'],
                labels: ['Soles']
            }).on('click', function(i, row){
              console.log(i, row);
            })
        }, function errorCallback(response) {
        });
    }

     $scope.interval=function(){
            dias=$scope.ve;
            dia='dia';
            mes='meses';
            año='años';
            if ($scope.ve == dia)
                $scope.dia(-5);
            else
                if ($scope.ve == mes)
                    $scope.meses();
                else
                    $scope.años();



    }
    $scope.dia=function(days){
            alert(days);
            milisegundos=parseInt(35*24*60*60*1000);
         
            fecha=new Date();
            day=fecha.getDate();
            // el mes es devuelto entre 0 y 11
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();
            var fa=day+"/"+month+"/"+year;
            //Obtenemos los milisegundos desde media noche del 1/1/1970
            tiempo=fecha.getTime();
            //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
            milisegundos=parseInt(days*24*60*60*1000);
            //Modificamos la fecha actual
            total=fecha.setTime(tiempo+milisegundos);
            day=fecha.getDate();
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();
            ff =day+"/"+month+"/"+year;
            alert(fa);
            alert(ff);
    }
    $scope.meses = function(){
        alert('funcion de meses')
    }
    $scope.años = function(){
        alert('funcion de años')
    }
});