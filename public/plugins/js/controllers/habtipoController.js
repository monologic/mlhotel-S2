app.controller('habtipoController', function($scope,$http,$location) {
	var hotel;
	var datos;
    var gdata;
    var fechas;
    var fechas2;
    $scope.getHabTipo = function () {
        $http.get('admin/AddHab').then(function successCallback(response) {
        	$scope.habtipos=response.data;

            gdata=response.data;
            
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
       
    }
       
      $scope.descrip = function () {
        console.log('entra');
        
        }    

    var details = Array();
    $scope.addDetalleReserva =function (data) {
      details.push(data);
      var total = 0;

      for (var i = 0; i < details.length; i++) {
        total += details[i].precio;
      }
        $scope.detalles = details;
        $scope.total = total;
    } 

    var idHabtipo;

    $scope.dataEditar = function (data) {

        idHabtipo = data.id;

        $scope.mlnombre = data.nombre;
        $scope.mldescripcion = data.descripcion;
        $scope.mlnropersonas = data.nropersonas;
        $scope.mlprecio = data.precio;
    }

       $scope.editarHabtipo = function () {

        $http.put('admin/habtipo/'+idHabtipo,
            {   'nombre':$scope.mlnombre,
                'descripcion':$scope.mldescripcion,
                'nropersonas':$scope.mlnropersonas,
                'precio':$scope.mlprecio,
            }).then(function successCallback(response) {
                 $scope.habtipos = response.data;
            }, function errorCallback(response) {
                
            });
    }
    $scope.eliminar = function (id) {
        $http.delete( 'admin/habtipo/'+id ).then(function successCallback(response) {
            $scope.habtipos = response.data;
        }, function errorCallback(response) {
            alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
        });
    }

    $scope.goTo2 = function(data) {
         idHabtipo = data.id;
    $location.url('/HabGalery/' + idHabtipo);
    };
    $scope.goTo3 = function(data) {
         idHabtipo = data.id;
    $location.url('/habitaciones/' + idHabtipo);
    };

     $scope.ponerFecha = function () {
        var f = new Date();
        $scope.fechaini = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +f.getDate();
        $scope.fechafin = f.getFullYear() + "-" + "0" + (f.getMonth() +1) + "-" +(f.getDate() + 1);
        fechas=$scope.fechaini;
        fechasi=$scope.fechafin;
        /*
        var fechaini1 = new Date($scope.fechaini);
        var fechafin1 = new Date($scope.fechafin);

        alert((fechafin1 - fechaini1)/86400000);
        */
    }
    $scope.buscar = function () {
     
        $http.get('cart/buscarHabitaciones/'+$scope.fechaini+'/'+$scope.fechafin).then(function successCallback(response) {
            $scope.tipoPerHabs = response.data;
            fechas = $scope.fechaini;
            fechas2 = $scope.fechafin;
            $scope.mayor
            $scope.menor

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.buscarHab = function () {
        var fini = $('#fechaini').val()
        var ffin = $('#fechafin').val()

        $http.get('cart/buscarHabitaciones/'+fini+'/'+ffin ).then(function successCallback(response) {
            $scope.tipoPerHabs = response.data;
            fechas=$scope.fechaini;
            fechas2=$scope.fechafin;
            $scope.mayor
            $scope.menor

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });

        $('.hab').css({'display':'none'});
    }
    $scope.addCarrito = function (data) {
        $http.get('cart/add/'+data.id,
            {
            }).then(function successCallback(response) {
                $scope.res();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.res = function () {
        $http.get('cart/show',
            {
            }).then(function successCallback(response) {
                $scope.car = response.data;
                $scope.actualizarTotal(response.data);
                
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.pagar = function () {
        $http.get('payment',
            {
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    /**
     * Actualiza la cantidad en el carrito
     */
    $scope.actualizar = function(id, idObjeto, data){
        cantidad = $('#'+id).val();
        for (x in data) {
            if (x == idObjeto)
                data[x].quantity = cantidad;
        }
        $scope.car = data;
    }
    $scope.actualizarTotal = function(data){
        var total=0;
        for (x in data) {
            subp=data[x].precio*data[x].quantity;
            total+=subp;
        }
        $scope.totalN = total.toFixed(2);
        $scope.totalq = 'S/' + total + '.00';
        $scope.Total = ($scope.totalN * $scope.fechas.dias).toFixed(2);

    }
    $scope.actualizarCarrito = function (data) {
        
        for (x in data) {
            $http.get('cart/update/'+data[x].id + '/' + data[x].quantity,
            {
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
        window.location.href = '#/micarrito';
    }
    $scope.onDateSet = function(){
       console.log($scope.fechaini.timer);
       //outputs '10 Sep' , where i expect to find the date object
    }

    $scope.getDias = function () {
        $http.get('cart/getDias',
            {
            }).then(function successCallback(response) {
                $scope.fechas = response.data;

                $('#fechaini').val(response.data.fecha_inicio);
                $('#fechafin').val(response.data.fecha_fin);
                

                if ((response.data).hasOwnProperty('dias')) {
                    $scope.buscarHab();
                }

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.eliminarItem = function (id) {
        $http.get('cart/delete/'+id,
            {
            }).then(function successCallback(response) {
                $scope.res();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.vaciarCarrito = function () {
        $http.get('cart/trash',
            {
            }).then(function successCallback(response) {
                $scope.res();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
});