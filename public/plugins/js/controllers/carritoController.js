app.controller('carritoController', function($scope,$http) {

    $scope.enviarhab = function () {
        $http.post('service/carrito',
            {   'nombre':$scope.nombre,
                'capacidad':$scope.capacidad,
                'precio':$scope.precio
            }).then(function successCallback(response) {
                $scope.mensaje = response.data.mensaje;
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
                $scope.getDias();
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
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
    $scope.guardarCliente = function () {
        $('#modalBlanco').css( "display", "block" );

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
        if(test1.checked == true){
            $scope.PagoCero();
        }
        if(test2.checked == true){
            $scope.PagoPaypal();
        }
        if(test3.checked == true){
            $scope.PagoDeposito();
        }
    }
    $scope.PagoCero = function (){
        $http.get('operacionPagoCero').then(function successCallback(response) {
            window.location.href = '#/operacionPagoCero';
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.PagoPaypal = function (){
        window.location.href = 'payment';
    }
    $scope.PagoDeposito = function (){
        $http.get('operacionPagoDeposito').then(function successCallback(response) {
            window.location.href = '#/operacionPagoDeposito';
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
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

    $scope.getTipoCambio = function () {
        $http.get('admin/getTipoCambio').then(function successCallback(response) {
                $scope.tipoCambio = response.data.tipocambio;
            }, function errorCallback(response) {
            });
    }

    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        $('#porcentaje').material_select();
    });

    $('#porcentajePago').change(function() {
        var porcentaje = $('#porcentajePago').val();
        totalR = $scope.Total * porcentaje;
        totalRDolares = totalR / $scope.tipoCambio;
        $('#TotalR').text('Total: S/' + totalR.toFixed(2) + ' ó $' + totalRDolares.toFixed(2)) ;

    });

    $scope.getDias = function () {
        $http.get('cart/getDias',
            {
            }).then(function successCallback(response) {
                $scope.fechas = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
    $scope.getTiposPago = function () {
        $http.get('admin/getTiposPago').then(function successCallback(response) {
                $scope.pagoCero = response.data[0];
                var j = false;
                for (i in response.data) {
                    /*
                    if(response.data[i].id == 1)
                        response.data[i].funcion = 'porcen()';
                    if(response.data[i].id == 2)
                        response.data[i].funcion = 'paypal()';
                    if(response.data[i].id == 3)
                        response.data[i].funcion = 'boucher()';
                    */
                    if (response.data[i].activo == 0){
                        $('#pagoCeroDiv').css('display','none');
                    }
                        
                }
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }
});