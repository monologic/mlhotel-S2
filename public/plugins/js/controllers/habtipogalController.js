var IdHab=0
app.controller('habtipogalController', function($scope,$http, $routeParams) {
    var IdHab=0;
	$scope.habId =$routeParams.habtipoId;
	IdHab=$scope.habId;
     $scope.getHabTipoGal= function () { 
            $http.get('admin/habtipoF/'+ IdHab).then(function successCallback(response) {
            	$scope.habfotos=response.data;  
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }
    var iconos;
    $scope.gethabitacionG= function () { 
            $http.get('admin/gethabitaciones/'+IdHab).then(function successCallback(response) {
                $scope.habfotos = response.data;
                $scope.galeria = response.data[0].habtipofotos;
                iconos=response.data[0].habtipo_serviciointernos;
            }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            });
           
        }

    $scope.GuardarIcon= function () { 
            for (var i = 0; i < iconos.length; i++) {
                if ($('#'+iconos[i].id).prop('checked')){
                    //alert('entro')
                    iconos[i].estado='true';
                }
                else
                    iconos[i].estado='false';
                $http.put('admin/icono/'+iconos[i].id,{   
                    'serviciointerno_id':iconos[i].serviciointerno_id,
                    'habtipo_id':iconos[i].habtipo_id,
                    'estado':iconos[i].estado
                    }).then(function successCallback(response) {
                    }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
            }          
        }
    $scope.eliminar = function (id) {
        $http.delete( 'admin/habtipoF/'+id ).then(function successCallback(response) {
            window.location.reload()
        }, function errorCallback(response) {
            alert("Ha ocurrido un error, No se puede borrar datos utilizados para otros registros");
        });
    }
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
         var galleryTop = new Swiper('.gallery-top', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          spaceBetween: 10,
          effect: 'fade',
      });
      var galleryThumbs = new Swiper('.gallery-thumbs', {
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true
      });
      galleryTop.params.control = galleryThumbs;
      galleryThumbs.params.control = galleryTop;  
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
      });
   
    });


    $scope.buscarHab = function () {
        if ($('#fechaini').val() == '' || $('#fechaini').val() == '') {
            alert('Debes seleccionar 2 fechas');
        }
        else
        {   var fini = $scope.formatDate($('#fechaini').val());
            var ffin = $scope.formatDate($('#fechafin').val());
        
            $http.get('cart/buscarHabitaciones/'+fini+'/'+ffin ).then(function successCallback(response) {
                    for(x in response.data){
                        if(response.data[x].id == $scope.habfotos[0].id)
                            $scope.busqueda = response.data[x];
                    }
                    $scope.getDias();
                    $('#buscar').css({'display':'none'});
                    $('#reservar').css({'display':'block'});
                }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
        
                $('.hab').css({'display':'none'});
            }
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
        $scope.getDias();
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
    $scope.formatDate = function (date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

});