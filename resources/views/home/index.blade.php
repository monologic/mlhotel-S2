<!DOCTYPE html>
<html lang="en" ng-app="homeApp">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Hotel,Moquegua,Residencial Moquegua,Servicios">
    <meta name="description" content="Residencial moquegua, uno de los mejores hoteles de la cuidad de Moquegua">
    <meta name="author" content="Javier Coaila">

    <title>@{{infos.nombre}}</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
    <!-- Styles -->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="plugins/materialize/css/materialize.css"  media="screen,projection"/>
    <link rel="stylesheet" href="plugins/slider/css/swiper.min.css"  media="screen,projection"/>
    <link rel="stylesheet" href="index/css/reset.css">
    <link rel="stylesheet" href="index/css/style.css">
    <link rel="stylesheet" href="index/css/animate.css">
    <link rel="stylesheet" href="index/css/habitaciones.css">
    <link rel="stylesheet" href="plugins/iconos/flaticon.css">
    

     <!-- text tarea-->
    <link rel="stylesheet" href="index/css/owl.transitions.css">
    <!-- galery-->
   

    <link rel='stylesheet' href='plugins/galery/css/jquery.fancybox.min.css'/>

    <link rel="stylesheet" href="plugins/datepicker/jquery-ui.css">
    <link rel="stylesheet" href="plugins/datepicker/jquery-ui.theme.css">
    <script src="plugins/SweetAlert/sweetalert.min.js"></script> 
    <link rel="stylesheet" type="text/css" href="plugins/SweetAlert/sweetalert.css">
    
  
</head>
<style>
.gallery
{
    display: inline-block;
    margin-top: 20px;
}
</style>



<body ng-controller="hotelController" ng-init="getHotelesF();" class="kit">
  <div class="navbar-fixed">
    <nav class="white nav-p">
      <div class="nav-wrapper" style="width:90%;margin-left:auto;margin-right:auto;margin-top:0">
        <a  class="btns" href="/login">Sign in</a>
        <a class="btn-floating btns2" onclick="divLogin()"><i  class="fa fa-cart-plus" style="margin-top:-13px;font-size: 1.4rem"></i></a>

        <a href="#" class="brand-logo center" style="color: black;margin-top: 15px">@{{infos.nombre}} </a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons" style="color:black;margin-left:-15px;margin-top:5px">menu</i></a>
        <ul id="nav-mobile" class=" row hide-on-med-and-down center">
          <li class="nav-txt col m3 s2"><a href="#/habitaciones"><div>HABITACIONES</div></a></li>
          <li class="nav-txt col m2 s2"><a href="#/servicios"><div>SERVICIOS</div></a></li>
          <li class="nav-txt col m2 s2"><a href="#/galeria"><div>GALERÍA</div></a></li>  
          <li class="nav-txt col m2 s2"><a href="#/noticias"><div>NOTICIAS</div> </a></li>
          <li class="nav-txt col m2 s2"><a href="#/contacto"><div>CONTACTO</div> </a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><a href="#/" onclick="cloMenu()">Inicio </a></li>
          <li><a href="#/habitaciones" onclick="cloMenu()">Habitaciones</a></li>
          <li><a href="#/servicios" onclick="cloMenu()">Servicios</a></li>
          <li><a href="#/galeria" onclick="cloMenu()">Galeria</a></li>
          <li><a href="#/noticias" onclick="cloMenu()">Noticias</a></li>
          <li><a href="#/contacto" onclick="cloMenu()">Contacto</a></li>
          <li><a href="#/micarrito" onclick="cloMenu()">Mi carrito</a></li>
        </ul>
      </div>
    </nav>
  </div>
</div>
 <div ng-view style="margin-top:-20px"></div>
 <footer class="page-footer black" style="padding-bottom: 20px">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Nuestras Redes Sociales</h5><br>
                 <a class="btn-floating btn-large waves-effect waves-light  blue darken-4" style="margin-right:20px"><i class="fa fa-facebook"></i></a>
                 <a class="btn-floating btn-large waves-effect waves-light blue" style="margin-right:20px"><i class="fa fa-twitter"></i></a>
                 <a class="btn-floating btn-large waves-effect waves-light red" style="margin-right:20px"><i class="fa fa-youtube-play"></i></a>
              </div>
              <div class="col l4 offset-l2 s12 white-text">
                <div >
                  <h5 class="white-text">Información</h5>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;" >@{{infos.nombre}}</p>
                   <p style="font-size:0.9rem;margin-top:5px;color:white;">Dirección: @{{infos.direccion}}</p>
                  <p id="correo" style="font-size:0.9rem;margin-top:5px;color:white;">E-mail: @{{infos.correo}}</p>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;">Telf.: @{{infos.telefono}}</p>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;">@{{infos.ciudad}}</p>
                </div>
              </div>
            </div>
          </div>
        </footer>   

     <!-- Llamado a angular-->
    <script src="http://code.jquery.com/jquery-latest.js"></script>

    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.18/angular-route.min.js"></script>

    <script src="index/js/wow.min.js"></script>  


     <!-- JavaScripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

    <script src="plugins/materialize/js/materialize.js"></script>
    <script src="plugins/materialize/js/angular-materialize.js"></script>
    <script src="plugins/slider/js/swiper.min.js"></script>  
    <script src="plugins/slider/js/swiper.jquery.min.js"></script>  

    <script src="index/js/owl.carousel.js"></script> 

    <script src="plugins/uiRoute/angular-ui-router.js"></script> 
     

    <!--JS principal -->
    <script src="{{ asset('plugins/js/mainHome.js') }}"></script>

    <!--Controladores conectados a la web -->

    <script src="plugins/js/controllers/bannerController.js"></script>  
    <script src="plugins/js/controllers/habtipoController.js"></script>
    <script src="plugins/js/controllers/galeryController.js"></script>
    <script src="plugins/js/controllers/noticiaController.js"></script>
    <script src="plugins/js/directivas/textHtml.js"></script>
    <script src="plugins/js/controllers/habtipogalController.js"></script>
    <script src="plugins/js/controllers/hotelController.js"></script>
    <script src="plugins/js/controllers/serviciosController.js"></script>
    <script src="plugins/js/controllers/buscarController.js"></script>
    <script src="plugins/js/controllers/carritoController.js"></script>
    <script src="plugins/js/controllers/reservaController.js"></script>
    <script src="plugins/js/directivas/onFinishRender.js"></script>

    <script src="plugins/galery/js/jquery.fancybox.min.js"></script>

    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="https://raw.github.com/HPNeo/gmaps/master/gmaps.js"></script>
    <script src="plugins/datepicker/jquery-ui.js"></script>

   <script>
    $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
    $('.parallax').parallax();
    $(".button-collapse").sideNav(); 
    //FANCYBOX
    //https://github.com/fancyapps/fancyBox
    $(".fancybox").fancybox({
        openEffect: "none",
        closeEffect: "none"
    });
});
   </script> 
    
    
    <script>
    function cloMenu(){
      $( "#sidenav-overlay" ).remove();
      $( ".side-nav" ).css('left','-500px');
      $( ".side-nav" ).css('transition','all 0.9s');
      $( ".kit" ).removeAttr( 'style' );
      window.scrollTo(0, 0);
    }
    function badCar(){
      document.getElementById("caja").style.right = "-400px";  
      document.getElementById("caja").style.transition = "all 0.4s"; 
      clic = 1;
    }
      var clic = 1;
      function divLogin(){ 
         if(clic==1){
         document.getElementById("caja").style.height = "100%";
         document.getElementById("caja").style.right = "0";
         document.getElementById("caja").style.transition = "all 0.4s";
         clic = clic + 1;
         } else{
             document.getElementById("caja").style.right = "-400px";  
             document.getElementById("caja").style.transition = "all 0.4s";    
          clic = 1;
         }   
      }
    
    </script>
    <script>
      new WOW().init();

      function initMap() {
      // Create a map object and specify the DOM element for display.
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        scrollwheel: false,
        zoom: 8
      });
    }
    </script>
</body>
</html>
