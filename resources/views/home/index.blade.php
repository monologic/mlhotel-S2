<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="Hotel,Moquegua,Residencial Moquegua,Servicios">
    <meta name="description" content="Residencial moquegua, uno de los mejores hoteles de la cuidad de Moquegua">
    <meta name="author" content="Javier Coaila">

    <title>Residencial Moquegua</title>

    <!-- Fonts -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700" rel='stylesheet' type='text/css'>
    <!-- Styles -->
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="plugins/materialize/css/materialize.css"  media="screen,projection"/>
    <link rel="stylesheet" href="plugins/slider/css/swiper.min.css"  media="screen,projection"/>
    <link rel="stylesheet" href="index/css/reset.css">
    <link rel="stylesheet" href="index/css/animate.css">
    <link rel="stylesheet" href="index/css/style.css">
    <link rel="stylesheet" href="index/css/habitaciones.css">
    <link rel="stylesheet" href="plugins/iconos/flaticon.css">
    

     <!-- text tarea-->
    <link rel="stylesheet" href="index/css/owl.transitions.css">
    <!-- galery-->
   

    <link rel='stylesheet' href='plugins/galery/css/jquery.fancybox.min.css'/>

    <link rel="stylesheet" href="plugins/datepicker/jquery-ui.css">
    <link rel="stylesheet" href="plugins/datepicker/jquery-ui.theme.css">
  
</head>
<style>
.gallery
{
    display: inline-block;
    margin-top: 20px;
}
</style>



<body ng-app="homeApp">
  <div class="navbar-fixed">
    <nav class="white" style="background: transparent;height: 110px">
      <div class="nav-wrapper" style="width:90%;margin-left:auto;margin-right:auto;margin-top:0">
        <a  class="btns" href="/login">Sign in</a>
        <a href="#" class="brand-logo center" style="color: black;margin-top: 15px">Residencial Moquegua </a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons" style="color:black;margin-left:-30px;margin-top:5px">menu</i></a>
        <ul id="nav-mobile" class=" row hide-on-med-and-down center">
          <li class="nav-txt col m3 s2"><a href="#/habitaciones"><div>HABITACIONES</div></a></li>
          <li class="nav-txt col m2 s2"><a href="#/servicios"><div>SERVICIOS</div></a></li>
          <li class="nav-txt col m2 s2"><a href="#/galeria"><div>GALERIA</div></a></li>  
          <li class="nav-txt col m2 s2"><a href="#/noticias"><div>NOTICIAS</div> </a></li>
          <li class="nav-txt col m2 s2"><a href="#/contacto"><div>CONTACTO</div> </a></li>
          <li class="col m1" style="margin-top:65px"><a class="btn-floating tooltipped" onclick="divLogin()" data-position="bottom" data-delay="50" data-tooltip="Mis Reservas"><i class="fa fa-ticket" style="margin-top:-13px"></i></a></li>
        </ul>
        <ul class="side-nav" id="mobile-demo">
          <li><a href="#/">Inicio </a></li>
          <li><a href="#/habitaciones">Habitaciones</a></li>
          <li><a href="#/contacto">Servicios</a></li>
          <li><a href="#/galeria">Galeria</a></li>
          <li><a href="#/noticias">Noticias</a></li>
          <li><a href="#/contacto">Contacto</a></li>
          <li><a href="#/micarrito">Mi carrito</a></li>
        </ul>
      </div>
    </nav>
  </div>
</div>
 <div ng-view  style="margin-botton:100px;margin-top:-20px"></div>
 <footer class="page-footer black">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Nuestras Redes Sociales</h5><br>
                 <a class="btn-floating btn-large waves-effect waves-light  blue darken-4" style="margin-right:20px"><i class="fa fa-facebook"></i></a>
                 <a class="btn-floating btn-large waves-effect waves-light blue" style="margin-right:20px"><i class="fa fa-twitter"></i></a>
                 <a class="btn-floating btn-large waves-effect waves-light red" style="margin-right:20px"><i class="fa fa-youtube-play"></i></a>
              </div>
              <div class="col l4 offset-l2 s12 white-text" ng-controller="hotelController" ng-init="getHotelesF();">
                <div >
                  <h5 class="white-text">Informacion</h5>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;" >@{{infos.nombre}}</p>                 
                  <p id="correo" style="font-size:0.9rem;margin-top:5px;color:white;">E-mail: @{{infos.correo}}</p>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;">Telf.: @{{infos.telefono}}</p>
                  <p style="font-size:0.9rem;margin-top:5px;color:white;">@{{infos.ciudad}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container left">
             © 2014 Copyright by Monologic
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

    <script type="text/javascript" src="plugins/materialize/js/materialize.js"></script>
    <script type="text/javascript" src="plugins/materialize/js/angular-materialize.js"></script>
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
    
      var clic = 1;
/*
      $('#caja').live('mouseout',function(){
        $('#contenedorPrincipal').live("click",function(){
        $('#contenedorPrincipal').fadeOut('slow');
      });

*/

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
