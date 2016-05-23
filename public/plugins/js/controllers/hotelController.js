app.controller('hotelController', function($scope,$http) {

    $scope.enviar = function () {
        $http.post('admin/hotel',
            {   'nombre':$scope.nombre,
                'pais':$scope.pais,
                'region_estado':$scope.region,
                'ciudad':$scope.ciudad,
                'direccion':$scope.direccion,
                'telefono':$scope.telefono,
                'correo':$scope.correo
            }).then(function successCallback(response) {
                $('#alertCambio').css('display','block');
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.getHoteles = function () {
        $http.get('admin/getHoteles').then(function successCallback(response) {
            $scope.hoteles = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

     $scope.getHotelesF= function () {
        $http.get('/getHotelF').then(function successCallback(response) {
            $scope.infos = response.data;
            console.log($scope.infos);
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    var dataAdmin;
    $scope.dataCrearAdmin = function (hotel_id) {
        $scope.hotel_id = hotel_id;
    }
    $scope.crearAdminHotel = function () {
        $http.post('admin/crearAdminHotel',
            {   'usuario':$scope.usuario,
                'password':$scope.password,
                'nombres':$scope.nombre,
                'apellidos':$scope.apellido,
                'sexo':$('input[name="sexo"]:checked', '#myForm').val(),
                'fecha_nac':$scope.nacimiento,
                'dni':$scope.dni,
                'direccion':$scope.direccion,
                'celular':$scope.celular,
                'emptipo_id':1,
                'hotel_id':$scope.hotel_id
            }).then(function successCallback(response) {
                $scope.hoteles = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    /**
     * Al hacer click en Editar admin 
     */
    $scope.dataEditarAdmin = function (data, hotel_id) {
        $scope.hotel_id = hotel_id;
        dataAdmin = data;

        $scope.nombre = data.nombres;
        $scope.apellido = data.apellidos;
        $scope.nacimiento = data.fecha_nac;
        $scope.dni = data.dni;
        $scope.direccion = data.direccion;
        $scope.celular = data.celular;
    }

    $scope.guardarAdminHotel = function () {
        $http.post('admin/guardarAdminHotel',
            {   'usuario':$scope.usuario,
                'password':$scope.password,
                'nombres':$scope.nombre,
                'apellidos':$scope.apellido,
                'sexo':$('input[name="sexo"]:checked', '#myForm2').val(),
                'fecha_nac':$scope.nacimiento,
                'dni':$scope.dni,
                'direccion':$scope.direccion,
                'celular':$scope.celular,
                'emptipo_id':1,
                'hotel_id':$scope.hotel_id,
                'empleado':dataAdmin.id 
            }).then(function successCallback(response) {
                $scope.hoteles = response.data;
            }, function errorCallback(response) {
            });
    }

    var idHotel;
    $scope.dataEditar = function (data) {

        idHotel = data.id;

        $scope.nomHotel = data.nombre;
        $scope.paisHotel = data.pais;
        $scope.regHotel = data.region_estado;
        $scope.ciuHotel = data.ciudad;
        $scope.dirHotel = data.direccion;
        $scope.fonoHotel = data.telefono;
        $scope.correo = data.correo;
    }
    $scope.editarHotel = function () {

        $http.put('admin/hotel/'+idHotel,
            {   'nombre':$scope.nomHotel,
                'pais':$scope.paisHotel,
                'region_estado':$scope.regHotel,
                'ciudad':$scope.ciuHotel,
                'direccion':$scope.dirHotel,
                'telefono':$scope.fonoHotel,
                'correo':$scope.correo
            }).then(function successCallback(response) {
                 $scope.hoteles = response.data;
            }, function errorCallback(response) {
                
            });
    }

    $scope.eliminar = function (id) {
        $http.delete( 'admin/hotel/'+id ).then(function successCallback(response) {
            $scope.hoteles = response.data;
        }, function errorCallback(response) {
            alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
        });
    }
    
    $scope.configCheckout = function () {
        $http.post('admin/configHoraHotel',
            {   'checkin':$scope.checkin,
                'checkout':$scope.checkout
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            });
    }
    $scope.getHotel = function () {
        $http.get('admin/getHotel').then(function successCallback(response) {
            $scope.checkin = response.data.checkin;
            $scope.checkout = response.data.checkout;

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    } 
});