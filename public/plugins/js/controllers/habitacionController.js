app.controller('habitacionController', function($scope,$http) {
    var fechaHoy
    function twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    $scope.ponerFecha = function () {
        var f = new Date();
        fechaHoy = f.getFullYear() + "-" + twoDigits(f.getMonth()+1) + "-" + twoDigits(f.getDate());
       
    }
    $scope.enviar = function () {
        $http.post('admin/habitacion',
            {   'numero':$scope.numero,
                'habtipo_id':$('#habtipo_id').val(),
                'estado_id':$('#estado_id').val(),
                //'hotel_id':$('#hotel_id').text()
            }).then(function successCallback(response) {
                swal("Excelente!", "Se ha creado la habitación", "success")
               window.location.href = 'admin#/Habitaciones';
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.getHabtipos = function () {
        $http.get('admin/getHabtipos2').then(function successCallback(response) {
            console.log(response.data);
            $scope.habtipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getEstados = function () {
        $http.get('admin/getEstados').then(function successCallback(response) {
            $scope.estados = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getHabitaciones = function () {
        $http.get('admin/getHabitacions').then(function successCallback(response) {
            console.log(response.data);
            $scope.habitaciones = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getHabitacionesDetallado = function () {
        $http.get('admin/getHabitacionsDetallado').then(function successCallback(response) {
            $scope.habitaciones = response.data;
            for(o in $scope.habitaciones)
            {   if (($scope.habitaciones[o].registro).length == undefined) {
                    f = ($scope.habitaciones[o].registro.fechasalida).split(" ");
                    if (f[0] == fechaHoy)
                        $scope.habitaciones[o].registro.hoy = 1;
                    else
                        $scope.habitaciones[o].registro.hoy = 0;
                } 
            }
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.dataEditar = function (data) {

        $scope.id = data.id;

        $scope.numero = data.numero;
        $('#habtipo_id').val(data.habtipo_id);
        $('#estado_id').val(data.estado_id);
        
    }
    $scope.editar = function () {
        $http.put('admin/habitacion/'+$scope.id,
            {   'numero':$scope.numero,
                'habtipo_id':$('#habtipo_id').val(),
                'estado_id':$('#estado_id').val()
            }).then(function successCallback(response) {
                $('#alertCambio').css('display','block');
                $scope.habitaciones = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.eliminar = function (id) {
        swal({   title: "¿ Estas seguro ?",
            text: "La habitación se eliminará.",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",   
            closeOnConfirm: false,
            cancelButtonText:"Cancelar",    
            }, 

            function(){

                swal("Eliminado!", 
                    "La habitación se ha eliminado.", 
                    "success"); 
                $http.delete( 'admin/habitacion/'+id ).then(function successCallback(response) {
                    $scope.habitaciones = response.data;
                }, function errorCallback(response) {
                    swal({   
                        title: "Ha ocurrido un error!",   
                        text: "No se puede borrar datos utilizados para otros registros.",   
                        timer: 3000,   
                        showConfirmButton: false 
                        });
                });
            });
    }
});