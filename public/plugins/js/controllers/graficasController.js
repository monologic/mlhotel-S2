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
            
        }, function errorCallback(response) {
        });
    }

     $scope.interval=function(){
            dias=$scope.ve;
            dia='dia';
            mes='mes';
            año='años';
            if ($scope.ve == dia)
                $scope.dia(-12);
            else
                if ($scope.ve == mes)
                    $scope.meses(12);
                else
                    $scope.años(12);



    }
    $scope.dia=function(days){
            
            milisegundos=parseInt(35*24*60*60*1000);
         
            fecha=new Date();
            day=fecha.getDate();
            // el mes es devuelto entre 0 y 11
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();
            var fa=year+"-"+month+"-"+day;
            //Obtenemos los milisegundos desde media noche del 1/1/1970
            tiempo=fecha.getTime();
            //Calculamos los milisegundos sobre la fecha que hay que sumar o restar...
            milisegundos=parseInt(days*24*60*60*1000);
            //Modificamos la fecha actual
            total=fecha.setTime(tiempo+milisegundos);
            day=fecha.getDate();
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();
            ff =year+"-"+month+"-"+day;


            $http.get('admin/report/'+ ff +'/'+ fa).then(function successCallback(response) {
                $scope.reservad = response.data;

                for (var i = 0; i < $scope.reservad.length; i++) {
                    $scope.reservad[i].x = $scope.reservad[i].fecha_reserva;
                    $scope.reservad[i].y = $scope.reservad[i].cantidad;
                }
                Morris.Bar({
                  element: 'reservas',
                  data:$scope.reservad,
                  xkey: 'x',
                  ykeys: ['y'],
                  labels: ['Soles']
                }).on('click', function(i, row){
                  console.log(i, row);
                })
        }, function errorCallback(response) {
        });

    }
    $scope.meses = function(mes){
            milisegundos=parseInt(35*24*60*60*1000);
         
            fecha=new Date();
            day=fecha.getDate();
            // el mes es devuelto entre 0 y 11
            month=fecha.getMonth()+1;
            year=fecha.getFullYear();
            var fa=year+"-"+month+"-"+day;
            //Obtenemos los milisegundos desde media noche del 1/1/1970
            day=fecha.getDate();
            month =fecha.getMonth()-mes;
            if (month < 0) {
                year=fecha.getFullYear()-1;
                month=month*(-1);
            }
            else{
                year=fecha.getFullYear();
            }
            
            ff =year+"-"+month+"-"+day;

            alert(ff);
            $http.get('admin/report/meses/'+ ff +'/'+ fa).then(function successCallback(response) {
                $scope.reservaA = response.data;
                for (var i = 0; i < $scope.reservaA.length; i++) {
                    $scope.reservaA[i].e = $scope.reservaA[i].Mes;
                    $scope.reservaA[i].t = $scope.reservaA[i].Total;
                }
                Morris.Bar({
                  element: 'reservas',
                  data:$scope.reservaA,
                  xkey: 'e',
                  ykeys: ['t'],
                  labels: ['Soles']
                }).on('click', function(i, row){
                  console.log(i, row);
                })
        }, function errorCallback(response) {
        });
    }
    $scope.años = function(){
        alert('funcion de años')
    }
});