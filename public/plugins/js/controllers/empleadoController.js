app.controller('empleadoController', function($scope,$http) {

    $scope.enviar = function () {
        $http.post('admin/empleado',
            {   'nombres':$scope.nombre,
                'apellidos':$scope.apellido,
                'sexo':$('#sexo').val(),
                'fecha_nac':$scope.nacimiento,
                'dni':$scope.dni,
                'direccion':$scope.direccion,
                'celular':$scope.celular,
                'emptipo_id':$('#emptipo_id').val()
                //'hotel_id':$('#hotel_id').text()
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
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
            'usuario':$scope.usuarioEditar
        })
        .then(function successCallback(response) {
            alert('Se ha modificado tu nombre de Usuario')
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
                alert('Se ha modificado tu Password')
                $scope.empleados = response.data;

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
        else {
            alert("El Password no coincide");
        }
        
    }
});