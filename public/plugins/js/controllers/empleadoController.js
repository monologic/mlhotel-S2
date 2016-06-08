app.controller('empleadoController', function($scope,$http) {

    $scope.enviar = function () {
        if ($scope.password == $scope.password2) {
        $http.post('admin/empleado',
            {   
                'usuario':$scope.usuario,
                'password':$scope.password,
                'usuariotipo_id':$('#usuariotipo_id').val(),
                'nombres':$scope.nombre,
                'apellidos':$scope.apellido,
                'sexo':$('input[name="sexo"]:checked', '#myForm').val(),
                'fecha_nac':$scope.nacimiento,
                'dni':$scope.dni,
                'direccion':$scope.direccion,
                'celular':$scope.celular,
                'emptipo_id':2
                //'hotel_id':$('#hotel_id').text()
            }).then(function successCallback(response) {
                swal("Excelente!", "Usuario Creado exitosamente.", "success");
                window.location.href = 'admin#/Empleados/ver';
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
        else {
            swal("Error!", "El Password no coincide", "error");
        }
    }

    $scope.getEmptipos = function () {
        $http.get('admin/getEmptipos').then(function successCallback(response) {
            //console.log(response.data);
            $scope.emptipos = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getUsuarioTipos = function () {
        $http.get('admin/getUsuarioTipos')
        .then(function successCallback(response) {

            $scope.usuarioTipos = response.data;

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.getEmpleadosFull = function () {
        $http.get('admin/getEmpleadosFull').then(function successCallback(response) {
            //console.log(response.data);
            $scope.empleados = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.dataCrearUsuario = function (data) {
        $scope.empleado = data.nombres + " " + data.apellidos;
        $scope.empleado_id = data.id;
    }
    $scope.dataEditarUsuario = function (data) {
        $scope.usuarioEditar = data.usuario;
        $('#usuariotipo_id').val(data.usuariotipo_id); 
        $scope.usuario_id = data.usuario_id;
    }

    $scope.crearUsuario = function () {
        $http.post('admin/usuario',
            {   'empleado_id': $scope.empleado_id,
                'usuario':$scope.usuario,
                'password':$scope.password,
                'usuariotipo_id':$('#usuariotipo_id').val()
            }).then(function successCallback(response) {
                $scope.empleados = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.actualizarUsuario = function (id) {
        $http.put('admin/usuario/'+id,
        {
            'usuario':$scope.usuarioEditar,
            'usuariotipo_id':$('#usuariotipo_id').val()
        })
        .then(function successCallback(response) {
            swal("Excelente!", "Se ha modificado información del Usuario.", "success");
            $scope.empleados = response.data;
        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.actualizarPassword = function (id) {
        if ($scope.passwordE == $scope.password2E) {
            $http.put('admin/usuario/'+id,
            {
                'password':$scope.passwordE
            })
            .then(function successCallback(response) {
                swal("Excelente!", "Se ha modificado tu Password.", "success");
                $scope.empleados = response.data;

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
        else {
            swal("Error!", "El Password no coincide", "error");
        }
        
    }
    $scope.activarDesactivar = function (id) {
        swal({   
            title: "¿ Estas seguro ?",
            text: "Este usuario sera cambiado.",
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "Sí, estoy seguro!",   
            closeOnConfirm: false, 
            cancelButtonText:"Cancelar",
        }, 
            function(){
                swal("Excelente!", 
                    "Se ha cambiado el usuario.", 
                    "success"); 

                $http.get('admin/activarDesactivar/' + id)
                .then(function successCallback(response) {
                    $scope.empleados = response.data;
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });

            });
    }

    $scope.dataEditar = function (data) {
        $scope.idEmpleado = data.id;
        $scope.nombre = data.nombres;
        $scope.apellido = data.apellidos;
        $("#"+data.sexo).prop("checked", true);
        $scope.nacimiento = data.fecha_nac;
        $scope.dni = data.dni;
        $scope.direccion = data.direccion;
        $scope.celular = data.celular;
    }

    $scope.editarEmpleado = function () {
        $http.put('admin/empleado/'+$scope.idEmpleado,
            {   
                'nombres':$scope.nombre,
                'apellidos':$scope.apellido,
                'sexo':$('input[name="sexo"]:checked', '#myForm').val(),
                'fecha_nac':$scope.nacimiento,
                'dni':$scope.dni,
                'direccion':$scope.direccion,
                'celular':$scope.celular,
                
                //'hotel_id':$('#hotel_id').text()
            }).then(function successCallback(response) {
                $('#alertCambio').css('display','block');
                $scope.empleados = response.data;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

});