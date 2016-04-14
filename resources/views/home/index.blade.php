<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

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
    <nav class=" white">
      <div class="nav-wrapper white" style="width:80%;margin-left:auto;margin-right:auto">
        <a href="#" class="brand-logo center" style="height:100%;z-index:20; padding:0px 10px 0 15px;margin:15px 25px 0px 10px;color:black">Residencial Moquegua </a>
        <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons" style="color:black;margin-left:-30px;margin-top:5px">menu</i></a>
        <ul id="nav-mobile" class=" hide-on-med-and-down">
          <li class="nav-txt"><a href="#/galeria">GALERIA</a></li>
          <li class="nav-txt"><a href="#/habitaciones">HABITACIONES</a></li>    
        </ul>
         <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li  style="margin-top:20px"><a class="btn-floating tooltipped"onclick="divLogin()" data-position="bottom" data-delay="50" data-tooltip="Mis Reservas"><i class="fa fa-ticket" style="margin-top:-13px"></i></a></li>   
        </ul>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="nav-txt"><a href="#/noticias">NOTICIAS</a></li>
          <li class="nav-txt"><a href="#/contacto">CONTACTO</a></li>    
        </ul>
       
        <ul class="side-nav" id="mobile-demo">
          <li><a href="#/">Inicio </a></li>
          <li><a href="#/habitaciones">Habitaciones</a></li>
          <li><a href="#/galeria">Galeria</a></li>
          <li><a href="#/noticias">Noticias</a></li>
          <li><a href="#/contacto">Contacto</a></li>
        </ul>
      </div>
    </nav>
  </div>
 
</div>      
<br>
<div id="caja">

  <form>
    <table>
      
    </table>
    <a href="" type="submit" value:Reservar></a>
  </form>
  
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
                </div>
                <h5 class="white-text">Informacion</h5>
                <p style="font-size:0.9rem;margin-top:5px;color:white;">{{infos.ciudad}}</p>
                <p style="font-size:0.9rem;margin-top:5px;color:white;">E-mail: reservas@residencialmoquegua.com</p>
                <p style="font-size:0.9rem;margin-top:5px;color:white;">Telf.: 46-2316</p>
                <p style="font-size:0.9rem;margin-top:5px;color:white;">Cel. Movistar 953970565 </p>
                <p style="font-size:0.9rem;margin-top:5px;color:white;">Rpm #953970565.</p>
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
    <script src="plugins/slider/js/swiper.min.js"></script>  
    <script src="plugins/slider/js/swiper.jquery.min.js"></script>  

    <script src="index/js/owl.carousel.js"></script> 
     

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
  
    <script src="plugins/galery/js/jquery.fancybox.min.js"></script>

   <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" src="https://raw.github.com/HPNeo/gmaps/master/gmaps.js"></script>

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
      function divLogin(){ 
         if(clic==1){
         document.getElementById("caja").style.height = "100px";
         clic = clic + 1;
         } else{
             document.getElementById("caja").style.height = "0px";      
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
