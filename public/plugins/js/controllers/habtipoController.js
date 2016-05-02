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
            fechas=$scope.fechaini;
            fechas2=$scope.fechafin;
            $scope.mayor
            $scope.menor

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
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
    $scope.actualizar= function(id, idObjeto, data){
        idval = $('#'+id).val();
        for (x in data) {
            if (x == idObjeto)
                data[x].quantity = idval;
        }
        $scope.car = data;
    }
    $scope.actualizarTotal= function(id, idObjeto, data){
        var total=0;
        for (x in data) {
            subp=data[x].precio*data[x].quantity;
            total+=subp;
        }
        $scope.totalq=total+'.00'
    }

    $scope.actualizarCarrito = function (data) {
        $('#porcentaje').material_select();
        for (x in data) {
            $http.get('cart/update/'+data[x].id + '/' + data[x].quantity,
            {
            }).then(function successCallback(response) {
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
    }

    $scope.guardarCliente = function () {
        
        $http.post('cart/cliente',
            {   'nombres':$scope.nombres,
                'apellidos':$scope.apellidos,
                'dni':$scope.dni,
                'porcentaje':$('#porcentaje').val()
            }).then(function successCallback(response) {
                 $scope.pagar();
            }, function errorCallback(response) {
                
            });
    }
    $scope.pagar = function () {
        window.location.href = 'payment';
    }

    $scope.getPorcentajes = function () {
        $http.get('admin/getPorcentajes').then(function successCallback(response) {
                //
                $scope.porcentajes = response.data;
                
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.example=1

    $scope.getTotal = function(){
    var total = 0;
    for(var i = 0; i < $scope.car.length; i++){
        var product = $scope.car[i];
        total += (car.precio * car.quantity);
    }
    return total;
}


});