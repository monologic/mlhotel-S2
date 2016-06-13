app.controller('reservaController', function($scope,$http) {
    $scope.getAllreserva = function (){
        $http.get('admin/getAllReservas').then(function successCallback(response) {
            $scope.allreservas = response.data;
            for (var i = 0; i < $scope.allreservas.length; i++) {

                if ($scope.allreservas[i].fecha_inicio != null) {
                    $scope.fe = $scope.allreservas[i].fecha_inicio.split(" ");
                    $scope.allreservas[i].soloFecha = $scope.fe[0];
                }
                else{
                    $scope.allreservas[i].soloFecha = null;
                }
                if ($scope.allreservas[i].fecha_fin != null) {
                    $scope.fe2 = $scope.allreservas[i].fecha_fin.split(" ");
                    $scope.allreservas[i].soloFecha2 = $scope.fe2[0];
                }
                else{
                    $scope.allreservas[i].soloFecha = null;
                }
            }


            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.verCliente = function (data) {
        $scope.idcliente = data.id;
        $scope.codigo_reserva = data.codigo_reserva;
        $scope.nombre = data.cliente.nombres;
        $scope.apellido = data.cliente.apellidos;
        $scope.dni = data.cliente.dni;
        $scope.estado = data.reservaestado.estado;
        $scope.fecha_reserva = data.fecha_reserva;
        $scope.fecha_inicio = data.soloFecha;
        $scope.fecha_fin = data.soloFecha2;
        $scope.pagotipo = data.pagotipo.pagotipo;
        $scope.comentario = data.comentario;
        $scope.total = data.total;
        $scope.grupo = data.habtiposcount;
    }
	$scope.getReservasPorAsignar = function () {
		$http.get('admin/buscarReservasNoAsignadas').then(function successCallback(response) {
            $scope.reservas = response.data;
            for (var i = 0; i < $scope.reservas.length; i++) {
                $scope.fe = $scope.reservas[i].fecha_inicio.split(" ");
                $scope.fe2 = $scope.reservas[i].fecha_fin.split(" ");
                $scope.reservas[i].soloFecha2 = $scope.fe2[0];
                $scope.reservas[i].soloFecha = $scope.fe[0];

                $scope.reservas[i].soloHora2 = $scope.fe2[1];
                $scope.reservas[i].soloHora = $scope.fe[1];
            }
            if ($scope.reservas.length == 0) {
                $('#nh').css('display','block');
                $('#bsq').css('display','none');
            }

            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
	}

    $scope.getReservasPorConfirmar = function (){
        $http.get('admin/getReservasPorConfirmar').then(function successCallback(response) {
            $scope.reservas = response.data;
            for (var i = 0; i < $scope.reservas.length; i++) {
                $scope.fe = $scope.reservas[i].fecha_inicio.split(" ");
                $scope.fe2 = $scope.reservas[i].fecha_fin.split(" ");
                $scope.reservas[i].soloFecha = $scope.fe[0];
                $scope.reservas[i].soloFecha2 = $scope.fe2[0];

                $scope.reservas[i].soloHora = $scope.fe[1];
                $scope.reservas[i].soloHora2 = $scope.fe2[1];
            }
            if ($scope.reservas.length == 0) {
                $('#nh').css('display','block');
                $('#bs').css('display','none');
            }
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

	$scope.buscarHab = function () {
        var fini = $('#fechaini').val();
        fini = fini.split("-");
        fini = fini[2] + "-" + fini[1] + "-" + fini[0];

        var ffin = $('#fechafin').val();
        ffin = ffin.split("-");
        ffin = ffin[2] + "-" + ffin[1] + "-" + ffin[0];

        $http.get('cart/buscarHabitaciones/'+fini+'/'+ffin ).then(function successCallback(response) {
        	window.location.href = '#/habitaciones';
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

    }

    $scope.ReservaAConfirmar = function (id) {
        $scope.reservaIdConf = id;
    }

    $scope.confirmar = function () {

        $http.put('admin/reserva/' + $scope.reservaIdConf, {
            'reservaestado_id' : 2,
            'total_pagado' : $('#total_pagado').val()
        }).then(function successCallback(response) {
            $scope.reservas = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.cancelar = function (id) {
        swal({   title: "¿ Estas seguro ?",
            text: "Se cacelará esta reserva.",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",
            cancelButtonText: "Cancelar",   
            closeOnConfirm: false }, 
            function(){

                swal("Eliminado!", 
                    "La reserva se ha cancelado.", 
                    "success"); 

                $http.get('admin/cancelarReserva/' + id).then(function successCallback(response) {
                    window.location.reload();
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
            }
        );
    }
    $scope.dataEditar = function (data) {
        swal("", "Verifique disponibilidad antes de editar", "warning");
        $scope.idReserva = data.id;
        $scope.nom = data.cliente.nombres + " " + data.cliente.apellidos;
        $scope.dni = data.cliente.dni;
        $scope.pagotipo = data.pagotipo.pagotipo;
        $scope.habtiposcount = data.habtiposcount;
        $('#fechaini').val(data.fecha_inicio);
        $('#fechafin').val(data.fecha_fin);
    }
    $scope.editar = function () {
        $http.post('admin/editarFechas', {
            'fechaini': $('#fechaini').val(),
            'fechafin': $('#fechafin').val(),
            'idReserva': $scope.idReserva
        }).then(function successCallback(response) {
            if (response.data.mensaje == 1) {
                swal("Excelente!", "Se han editado las fechas de la Reserva.", "success");
                window.location.reload();
            }
            else {
                swal("", "No se puede editar las fechas de la Reserva para ese periodo de días.", "error");
            }

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    var habsSeleccionadas = new Array();
    $scope.buscarHabs = function (data) {

        $("#guardarChecks").css("display","none");
        $scope.Reservas = data;
        habsSeleccionadas.splice(0, habsSeleccionadas.length);

        fi = data.fecha_inicio;
        fi = fi.split(" ");
        $scope.hallarFechaHoy();
        $scope.reservaFutura(fi[0]);
        var ff = data.fecha_fin;
        ff = ff.split(" ");


        $http.get('admin/registrosBusqueda/'+$scope.hoy+'/'+ff[0]).then(function successCallback(response) {
            if ((response.data).hasOwnProperty('mensaje')) {
                $('#alertCambio').css('display','block');
            }
            else
                $scope.tipoPerHabs = response.data;

            habsSeleccionadas = new Array();
            //ordenarPorTipo(response.data);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.reservaFutura = function (fechaReserva) {
        var f = new Date(fechaReserva);
        f = f.getTime();
        var fa = new Date($scope.hoy);
        fa = fa.getTime();
        if (f > fa)
            swal("Cuidado!", "Está intentando asignar habitaciones a una reserva de fecha futura.", "warning");
    }
    function twoDigits(d) {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }
    $scope.hallarFechaHoy = function () {
        var f = new Date();
        $scope.hoy = f.getFullYear() + "-" + twoDigits(f.getMonth()+1) + "-" + twoDigits(f.getDate())
    }

    
    $scope.clickOnCheck = function (habitacion) {
        
        if ($('#'+habitacion.numero).prop('checked'))
            habsSeleccionadas.push(habitacion);
        else
            habsSeleccionadas.splice(habsSeleccionadas.indexOf(habitacion),1);

        $scope.paraAsignar();
        $scope.countChecked();
        $scope.buttonAsignar();
    }
    $scope.paraAsignar = function () {
        for(i in $scope.tipoPerHabs){
            $scope.tipoPerHabs[i].paraAsignar = 0;
            for(j in $scope.Reservas.habtiposcount){
                if ($scope.tipoPerHabs[i].id == $scope.Reservas.habtiposcount[j].id) {
                    $scope.tipoPerHabs[i].paraAsignar = $scope.Reservas.habtiposcount[j].count;
                }
            }
        }
    }
    $scope.countChecked = function () {

        count = $scope.tipoPerHabs;
        for(j in count) {
            c = 0
            for(i in habsSeleccionadas) {
                if (habsSeleccionadas[i].habtipo_id == count[j].id) {
                    c++;
                }
            }
            count[j].checkedCount = c;
        }
        $scope.countHabschecked = count;
    }
    $scope.buttonAsignar = function () {
        //console.log($scope.countHabschecked);
        ct = ($scope.countHabschecked).length; //total de elementos (tipos de habitaciones)
        c = 0;
        for(j in $scope.countHabschecked) {
            if ($scope.countHabschecked[j].paraAsignar == $scope.countHabschecked[j].checkedCount)
                c++;
            else
                c--;
        }
        if (ct == c) 
            $("#guardarChecks").css("display","block");
        else
            $("#guardarChecks").css("display","none");
    }

    $scope.guardarRegistros = function () {
        $http.put('admin/reserva/' + $scope.Reservas.id,
            {   'reservaestado_id': 1
            }).then(function successCallback(response) {

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
        fi = $scope.Reservas.fecha_inicio;
        fi = fi.split(" ");
        var ff = $scope.Reservas.fecha_fin;
        ff = ff.split(" ");

        for (var i = 0; i < habsSeleccionadas.length; i++) {
            $http.post('admin/registro',
            {   'fechaini':fi[0],
                'fechafin':ff[0],
                'habitacion_id':habsSeleccionadas[i].id,
                'codigo_reserva': $scope.Reservas.codigo_reserva
            }).then(function successCallback(response) {
              $('#asignar').modal('toggle');
              $('.modal-backdrop').css('display','none');
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
        }
        swal("Excelente!", "Se han asignado las habitaciones.", "success");
        window.location.href = 'admin#/DetalleHabitaciones';
    }
    $scope.editarComentario = function (id,coment){
        
        $http.put('admin/reserva/' + id,
            {   'comentario': coment
            }).then(function successCallback(response) {
                swal("Excelente!", "Se han guardado el comentario.", "success");
                $scope.getAllreserva();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            }); 
    }
    $scope.eliminarComentario = function (id,coment){
        $scope.comentario = "";
        swal({   title: "¿ Estas seguro ?",
            text: "El comentario se eliminara.",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",
            cancelButtonText: "Cancelar",   
            closeOnConfirm: false }, 
            function(){

                swal("Eliminado!", 
                    "El comentario se ha eliminado.", 
                    "success");
                 $http.put('admin/reserva/' + id,
                {   'comentario': $scope.comentario
                }).then(function successCallback(response) {
                    $scope.getAllreserva();
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });  
            }
        );
    }
});