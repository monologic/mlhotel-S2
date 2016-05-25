app.controller('registroController', function($scope,$http , $routeParams) {

    $scope.ponerFecha = function () {
        var f = new Date();
        $scope.fechaini = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +f.getDate();
        $scope.fechafin = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +(f.getDate() + 1);
        //alert($scope.fechaini);
        /*
        var fechaini1 = new Date($scope.fechaini);
        var fechafin1 = new Date($scope.fechafin);

        alert((fechafin1 - fechaini1)/86400000);
        */
    }
	$scope.buscar = function () {
        $http.get('admin/buscar/'+$scope.fechaini+'/'+$scope.fechafin).then(function successCallback(response) {
            if ((response.data).hasOwnProperty('mensaje')) {
                $('#alertCambio').css('display','block');
            }
            else
                $scope.tipoPerHabs = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    $scope.getHabtipos = function () {
        $http.get('admin/AddHab').then(function successCallback(response) {
            $scope.habtipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    var habsSeleccionadas = new Array();
    $scope.clickOnCheck = function (habitacion) {
        
        if ($('#'+habitacion.numero).prop('checked'))
            habsSeleccionadas.push(habitacion);
        else
            habsSeleccionadas.splice(habsSeleccionadas.indexOf(habitacion),1);

        if (habsSeleccionadas.length > 0)
            $("#guardarChecks").css("display","block");
        else
            $("#guardarChecks").css("display","none");
    }

    $scope.guardarRegistros = function () {
        for (var i = 0; i < habsSeleccionadas.length; i++) {
            $http.post('admin/registro',
            {   'fechaini':$scope.fechaini,
                'fechafin':$scope.fechafin,
                'habitacion_id':habsSeleccionadas[i].id
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
        }
        alert('Asignaci¨®n de habitaciones exitosa.');
        window.location.href = 'admin#/DetalleHabitaciones';
    }
    $scope.getReservaInfo = function () {
        $scope.idReserva = $routeParams.idReserva;

        $http.get('admin/getReserva/' + $scope.idReserva).then(function successCallback(response) {
            $scope.Reservas = response.data[0];
            var fi = $scope.Reservas.fecha_inicio;
            fi = fi.split(" ");
            $scope.fechaini = fi[0];
            var ff = $scope.Reservas.fecha_fin;
            ff = ff.split(" ");
            $scope.fechafin = ff[0];
    
            $scope.buscar();
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });   
        
    }
    $scope.buscarRegistro = function () {
        $scope.idRegistro = $routeParams.idRegistro;

        $http.get('admin/buscarRegistro/' + $scope.idRegistro).then(function successCallback(response) {
            
            $scope.registro = response.data[0];
            
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.finalizar = function (id) {
        $http.get('admin/finalizarRegistro/' + id).then(function successCallback(response) {
            
            alert("Se ha finalizado la estadÃ­a...");
            window.location.href = 'admin#/DetalleHabitaciones';
            
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.buscarHuesped = function () {
        $http.get('admin/buscarHuesped/' + $scope.dni).then(function successCallback(response) {
            
            if ((response.data).length > 0){
                $scope.huesped = 'true';

                $scope.idHuesped = response.data[0].id; 
                $scope.nombres = response.data[0].nombres;
                $scope.apellidos = response.data[0].apellidos;
                $scope.fechanac = response.data[0].fecha_nac;
                $scope.pais = response.data[0].pais;
                $scope.ciudad = response.data[0].ciudad;
                $scope.celular = response.data[0].celular;
                $scope.prof_ocup = response.data[0].prof_ocup;

            }
            else{
                $('#nom').focus();
                $scope.huesped = 'false';
            }

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.nuevoHuesped = function () {
        $http.post('admin/cliente',
            {   'nombres':$scope.nombres,
                'apellidos':$scope.apellidos,
                'sexo':$('#sexo').val(),
                'fecha_nac':$scope.fechanac,
                'dni':$scope.dni,
                'pais':$scope.pais,
                'ciudad':$scope.ciudad,
                'procedencia':$scope.procedencia,
                'estado_civil':$scope.estadoCivil,
                'destino':$scope.destino,
                'prof_ocup':$scope.prof_ocup,
                'celular':$scope.celular,
                'registro_id':$scope.registro.id,
                
            }).then(function successCallback(response) {
                
                $scope.regClientes = response.data;

                $scope.nombres = "";
                $scope.apellidos = "";
                $scope.fechanac = "";
                $scope.pais = "";
                $scope.ciudad = "";
                $scope.celular = "";
                $scope.prof_ocup = "";
                $scope.procedencia = "";
                $scope.destino = "";

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
    }
    $scope.editarHuesped = function () {
        $http.put('admin/cliente/' + $scope.idHuesped,
            {   'nombres':$scope.nombres,
                'apellidos':$scope.apellidos,
                'sexo':$('#sexo').val(),
                'fecha_nac':$scope.fechanac,
                'dni':$scope.dni,
                'pais':$scope.pais,
                'ciudad':$scope.ciudad,
                'procedencia':$scope.procedencia,
                'estado_civil':$scope.estadoCivil,
                'destino':$scope.destino,
                'prof_ocup':$scope.prof_ocup,
                'celular':$scope.celular,
                'registro_id':$scope.registro.id,
                
            }).then(function successCallback(response) {
                
                $scope.regClientes = response.data;

                $scope.nombres = "";
                $scope.apellidos = "";
                $scope.fechanac = "";
                $scope.pais = "";
                $scope.ciudad = "";
                $scope.celular = "";
                $scope.prof_ocup = "";
                $scope.procedencia = "";
                $scope.destino = "";

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });   
    }
    $scope.eliminarHuesped = function (id) {
        $http.delete( 'admin/regClienteEliminar/'+id ).then(function successCallback(response) {
            $scope.regClientes = response.data;
        }, function errorCallback(response) {
            alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
        });
    }

    $scope.getRegistros = function () {
        $http.get('admin/getRegistros/'+$scope.fechaini+'/'+$scope.fechafin).then(function successCallback(response) {
            $scope.registros = response.data;
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    $scope.getDisponibilidad = function () {
        $http.get('admin/grillaDisponibilidad/'+$scope.desde+'/'+$scope.hasta).then(function successCallback(response) {
            $('#grid').css('display','block');
            $scope.grid = response.data;
            $scope.tipohabs = response.data[$scope.desde];
            //for(x in response.data)
                //$scope.tipohabs = response.data[x];
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
});