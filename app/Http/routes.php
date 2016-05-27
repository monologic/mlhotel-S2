<?php
/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::get('/', function () {
    return view('home.index');
});


Route::group(['prefix'=> 'admin', 'middleware' => ['web', 'auth']], function(){

    Route::get('/', 'PanelController@index');

	Route::resource('emptipo', 'EmptipoController');
	
	Route::resource('empleado', 'empleadoController');
	Route::resource('usuariotipo', 'UsuariotipoController');
	Route::resource('usuario', 'UsuarioController');
	Route::resource('hotel', 'HotelController');
	Route::resource('banner', 'bannerController');
	Route::resource('habtipo', 'HabtipoController');
	Route::resource('habtipoF', 'habtipogaleryController');
	Route::resource('habitacion', 'HabitacionController');
	Route::resource('registro', 'RegistroController');
	Route::resource('icono', 'IconController');
	Route::resource('cliente', 'ClienteController');
	Route::resource('regcliente', 'RegclienteController');
	Route::resource('moneda', 'CambioMonedaTipoController');
	Route::resource('porcentaje', 'PorcentajeController');
	Route::resource('servicio', 'ServicioController');
	Route::resource('categoria', 'categoriaController');
	Route::resource('galeria', 'galeryController');
	Route::resource('noticia', 'NoticiaController');
	Route::resource('pago', 'PagotipoController');
	Route::resource('mainservice', 'MainserviceController');

	
	Route::get('getmainservices', 'MainserviceController@getMain');
	Route::get('getclientess', 'ClienteController@getclientes');
	Route::get('getEmptipos', 'EmptipoController@getEmptipos');
	Route::get('getEmpForUsers', 'empleadoController@getEmpleadosParaUsuarios');
	Route::get('getEmpleadosFull', 'empleadoController@getEmpleadosFull');
	Route::get('getUsuarioTipos', 'UsuariotipoController@getUsuarioTipos');
	Route::get('getHoteles', 'HotelController@getHoteles');
	Route::get('getHotelesSimple', 'HotelController@getHotelesSimple');
	Route::get('getContactos', 'ContactoController@getContactos');
	Route::get('getHabtipos', 'HabtipoController@getHabitaciones');
	Route::get('getHabtipos2', 'HabtipoController@getHabtipos');
	Route::get('getEstados', 'EstadoController@getEstados');
	Route::get('getHabitacions', 'HabitacionController@getHabitacions');
	Route::get('getHabitacionsDetallado', 'HabitacionController@getHabitacionsDetallado');
	Route::get('buscarReservasNoAsignadas', 'ReservaController@getReservasNoAsignadas');
	Route::get('getHotel', 'HotelController@getHotel');
	Route::get('getUsuario', 'UsuarioController@getUsuario');
	
	Route::get('getReserva/{idReserva}', 'ReservaController@getReserva');
	Route::get('buscarRegistro/{idRegistro}', 'RegistroController@getRegistro');
	Route::get('getRegistros/{fechaini}/{fechafin}', 'RegistroController@getRegistros');
	Route::get('grillaDisponibilidad/{fechaini}/{fechafin}', 'RegistroController@grillaDisponibilidad');

	Route::get('getReservasPorConfirmar', 'ReservaController@getReservasPorConfirmar');
	Route::get('confirmarReserva/{idReserva}', 'ReservaController@confirmarReserva');
	Route::get('cancelarReserva/{idReserva}', 'ReservaController@cancelarReserva');

	Route::get('activarDesactivar/{idUsuario}', 'UsuarioController@activarDesactivar');

	Route::get('buscarHuesped/{dni}', 'ClienteController@buscarHuesped');
	
	Route::post('crearAdminHotel', 'HotelController@crearAdminHotel');
	Route::post('guardarAdminHotel', 'HotelController@guardarAdminHotel');
	Route::post('dataEditarHotel', 'HotelController@dataEditar');

	Route::post('buscarPersonal', 'PersonalController@buscar');

	Route::post('configHoraHotel', 'HotelController@configHoraHotel');
	
	Route::get('finalizarRegistro/{idRegistro}', 'RegistroController@finalizar');

	Route::delete('regClienteEliminar/{id}', 'ClienteController@eliminarRegCliente');

	Route::get('report', 'graficas@ghabitaciones');
	

	Route::get('admin/report/{fechaini}/{fechafin}', ['uses' => 'graficas@buscar', function ($fechaini, $fechafin) {
	}]);
});
	Route::get('admin/getAllReservas', 'ReservaController@getallreservas');
	Route::get('admin/buscarCliente/{tipo}/{valor}', ['uses' => 'ClienteController@buscart', function ($tipo, $valor) {
	}]);
	Route::get('admin/getPorcentajes', 'PorcentajeController@index');
	Route::get('admin/getTipoCambio', 'CambioMonedaTipoController@getTipoCambioDolar');

	Route::get('admin/getBanners', 'bannerController@getBanners');
	Route::get('admin/getBanners2', 'bannerController@getBanners2');

	Route::post('admin/SlidCreate', 'bannerController@sliderCreateIndex');
	Route::post('admin/ServiceCreate', 'categoriaController@ServiceCreateIndex');
	Route::post('admin/AddSubHab', 'HabtipoController@HabitacionesStore');
	Route::get('admin/AddHab', 'HabtipoController@getHabtipo');
	Route::post('admin/createhabgalery', 'habtipogaleryController@HabTipoFotoStore');
	Route::get('admin/loadhabgalery/{habtipo_id}','habtipogaleryController@getFotoHabTipo');

	Route::post('admin/AddFoto', 'GaleryController@AddGaleryPhoto');
	Route::get('admin/getGaleryPhoto', 'GaleryController@getGaleriaFotos');

	Route::post('admin/ServiceCreate', 'categoriaController@ServiceCreateIndex');
	Route::post('admin/EditarMainService', 'categoriaController@editarMainService');
	Route::post('admin/ServiceCreateCategory', 'categoriaController@ServiceCreateforCategory');
	Route::get('admin/getServicios', 'categoriaController@getServices');


	
	Route::get('admin/gethabitaciones/{id}', ['uses' => 'HabtipoController@getHabitaciones', function ($id) {}]);
	Route::get('admin/CategoriaServicio/{id}', ['uses' => 'categoriaController@getServicesompletoC', function ($id) {}]);
	Route::get('admin/buscar/{fechaini}/{fechafin}', ['uses' => 'RegistroController@buscar', function ($fechaini, $fechafin) {
	}]);

	Route::get('admin/report/{fechaini}/{fechafin}', ['uses' => 'graficas@diasReservas', function ($fechaini, $fechafin) {
	}]);
	Route::get('admin/report/meses/{fechaini}/{fechafin}', ['uses' => 'graficas@mesesReservas', function ($fechaini, $fechafin) {
	}]);

	Route::get('admin/getNoticias', 'NoticiaController@getNoticias');
	Route::post('admin/NoticiaCreate', 'NoticiaController@NoticiaCreateIndex');

	Route::post('enviarmsj', 'ContactoController@NewContacto');

	Route::get('getHotelF', 'HotelController@getHotelesFooter');

	Route::post('send', ['as' => 'send', 'uses' => 'MailController@send'] );

	Route::get('admin/getTiposPago', 'PagotipoController@index');

	Route::resource('admin/banco', 'BancoController');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/
Route::bind('habtipo', function($id){
	return App\Habtipo::where('id', $id)->first();
});

Route::group(['middleware' => 'web'], function () {
    Route::auth();
    
    Route::get('/home', 'HomeController@index');

    // Carrito -------------

    Route::get('cart/buscarHabitaciones/{fechaini}/{fechafin}', ['uses' => 'carritoController@buscarHabitaciones', function ($fechaini, $fechafin) {
	}]);

	Route::get('cart/show', [
		'as' => 'cart-show',
		'uses' => 'carritoController@show'
	]);

	Route::get('cart/getDias', [
		'as' => 'cart-dias',
		'uses' => 'carritoController@getDias'
	]);

	Route::get('cart/add/{habtipo}/{max}', [
		'as' => 'cart-add',
		'uses' => 'carritoController@add'
	]);

	Route::get('cart/delete/{habtipo}',[
		'as' => 'cart-delete',
		'uses' => 'carritoController@delete'
	]);

	Route::post('cart/cliente',[
		'as' => 'cart-cliente',
		'uses' => 'carritoController@guardarCliente'
	]);

	Route::get('cart/trash', [
		'as' => 'cart-trash',
		'uses' => 'carritoController@trash'
	]);

	Route::get('cart/update/{habtipo}/{quantity}', [
		'as' => 'cart-update',
		'uses' => 'carritoController@update'
	]);

	Route::get('order-detail', [
		'middleware' => 'auth:user',
		'as' => 'order-detail',
		'uses' => 'carritoController@orderDetail'
	]);
	
	Route::get('payment', array(
		'as' => 'payment',
		'uses' => 'PaypalController@postPayment',
	));
	Route::get('operacionPagoCero', 'PaypalController@operacionPagoCero');
	Route::get('operacionPagoDeposito', 'PaypalController@operacionPagoDeposito');
	// Después de realizar el pago Paypal redirecciona a esta ruta
	Route::get('payment/status', array(
		'as' => 'payment.status',
		'uses' => 'PaypalController@getPaymentStatus',
	));
});

// Paypal

// Enviamos nuestro pedido a PayPal






