app.controller('usuarioController', function($scope,$http) {

    $scope.enviar = function () {
        $http.post('admin/usuario',
            {   'empleado_id':$('#empleado_id').val(),
                'usuario':$scope.usuario,
                'password':$scope.password,
                'usuariotipo_id':$('#usuariotipo_id').val()
            }).then(function successCallback(response) {
                alert(response.data.mensaje);
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
    }

    $scope.getEmpleados = function () {
        $http.get('admin/getEmpForUsers')
        .then(function successCallback(response) {

            $scope.empleados = response.data;

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

    $scope.getUsuarios = function () {
        $http.get('admin/usuario')
        .then(function successCallback(response) {

            $scope.usuarios = response.data;

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }

    $scope.activarDesactivar = function (id) {
        r = confirm("¿Deseas cambiar el estado a este Usuario?");

        if (r) {
            $http.get('admin/activarDesactivar/' + id)
            .then(function successCallback(response) {

                $scope.usuarios = response.data;

            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
        }
    }

    $scope.getUsuarioActual = function () {
        $http.get('admin/getUsuario')
        .then(function successCallback(response) {
            $scope.idUsuario = response.data.id;
            $scope.usuario = response.data.usuario;

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.actualizarUsuario = function (id) {
        $http.put('admin/usuario/'+id,
        {
            'usuario':$scope.usuario
        })
        .then(function successCallback(response) {
            alert('Se ha modificado tu nombre de Usuario')
            $scope.idUsuario = response.data.id;
            $scope.usuario = response.data.usuario;

        }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        });
    }
    $scope.actualizarPassword = function (id) {
        if ($scope.password == $scope.password2) {
            $http.put('admin/usuario/'+id,
            {
                'password':$scope.password
            })
            .then(function successCallback(response) {
                alert('Se ha modificado tu Password')
                $scope.idUsuario = response.data.id;
                $scope.usuario = response.data.usuario;

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