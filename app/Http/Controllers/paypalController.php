<?php 

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesCommands;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;

use PayPal\Rest\ApiContext;
use PayPal\Auth\OAuthTokenCredential;
use PayPal\Api\Amount;
use PayPal\Api\Details;
use PayPal\Api\Item;
use PayPal\Api\ItemList;
use PayPal\Api\Payer;
use PayPal\Api\Payment;
use PayPal\Api\RedirectUrls;
use PayPal\Api\ExecutePayment;
use PayPal\Api\PaymentExecution;
use PayPal\Api\Transaction;

use App\Reserva;
use App\Habtiporeserva;
use App\Hotel;
use App\Cambiomonedatipo;

class PaypalController extends BaseController
{
	private $_api_context;

	public function __construct()
	{
		// setup PayPal api context
		$paypal_conf = \Config::get('paypal');
		$this->_api_context = new ApiContext(new OAuthTokenCredential($paypal_conf['client_id'], $paypal_conf['secret']));
		$this->_api_context->setConfig($paypal_conf['settings']);
	}

	public function postPayment()
	{
		$monedas = Cambiomonedatipo::where('siglas','USD')->get();
		$moneda = $monedas[0];

		$payer = new Payer();
		$payer->setPaymentMethod('paypal');

		$items = array();
		$subtotal = 0;
		$cart = \Session::get('cart');
		$porcentaje = \Session::get('porcentaje');
		$fechas = \Session::get('fechas');

		//dd($cart);

		$currency = 'USD';

		foreach($cart as $producto){
			//dd($producto->nombre);

			$precioProducto = $producto->precio * $porcentaje['porcentaje'] / 100 * $fechas['dias'];
			$precioDolar = round(($precioProducto / $moneda->tipocambio), 2);


			$item = new Item();
			$item->setName($producto->nombre)
			->setCurrency($currency)
			->setDescription($producto->descripcion)
			->setQuantity($producto->quantity)
			->setPrice($precioDolar);

			$items[] = $item;
			$subtotal += $producto->quantity * $precioDolar;
		}

		$item_list = new ItemList();
		$item_list->setItems($items);

		$details = new Details();	
		$details->setSubtotal($subtotal);

		$total = $subtotal;

		$amount = new Amount();
		$amount->setCurrency($currency)
			->setTotal($total)
			->setDetails($details);
		
		$transaction = new Transaction();
		$transaction->setAmount($amount)
			->setItemList($item_list)
			->setDescription('Pedido de prueba en mi Laravel App Store');
		//dd($transaction);
		$redirect_urls = new RedirectUrls();
		$redirect_urls->setReturnUrl(\URL::route('payment.status'))
			->setCancelUrl(\URL::route('payment.status'));

		$payment = new Payment();
		$payment->setIntent('Sale')
			->setPayer($payer)
			->setRedirectUrls($redirect_urls)
			->setTransactions(array($transaction));

		try {
			$payment->create($this->_api_context);
		}  catch (\PayPal\Exception\PayPalConnectionException $ex) {
    		if (\Config::get('app.debug')) {
				echo "Exception: " . $ex->getMessage() . PHP_EOL;
				$err_data = json_decode($ex->getData(), true);
				exit;
			} else {
				die('Ups! Algo salió mal');
			}

		}


		foreach($payment->getLinks() as $link) {
			if($link->getRel() == 'approval_url') {
				$redirect_url = $link->getHref();
				break;
			}
		}

		// add payment ID to session
		\Session::put('paypal_payment_id', $payment->getId());

		if(isset($redirect_url)) {
			// redirect to paypal
			return \Redirect::away($redirect_url);
		}

		return \Redirect::route('cart-show')
			->with('error', 'Ups! Error desconocido.');

	}

	public function getPaymentStatus()
	{
		// Get the payment ID before session clear
		$payment_id = \Session::get('paypal_payment_id');

		// clear the session payment ID
		\Session::forget('paypal_payment_id');

		$payerId = \Input::get('PayerID');
		$token = \Input::get('token');

		//if (empty(\Input::get('PayerID')) || empty(\Input::get('token'))) {
		if (empty($payerId) || empty($token)) {
			return \Redirect::route('home')
				->with('message', 'Hubo un problema al intentar pagar con Paypal');
		}

		$payment = Payment::get($payment_id, $this->_api_context);

		// PaymentExecution object includes information necessary 
		// to execute a PayPal account payment. 
		// The payer_id is added to the request query parameters
		// when the user is redirected from paypal back to your site
		$execution = new PaymentExecution();
		$execution->setPayerId(\Input::get('PayerID'));

		//Execute the payment
		$result = $payment->execute($execution, $this->_api_context);

		//echo '<pre>';print_r($result);echo '</pre>';exit; // DEBUG RESULT, remove it later

		if ($result->getState() == 'approved') { // payment made
			// Registrar el pedido --- ok
			// Registrar el Detalle del pedido  --- ok
			// Eliminar carrito 
			// Enviar correo a user
			// Enviar correo a admin
			// Redireccionar

			$this->saveOrder(\Session::get('cart'),\Session::get('fechas'),\Session::get('cliente'));

			\Session::forget('cart');


			
		}
		
	}


	private function saveOrder($cart, $fechas, $cliente)
	{
	    $subtotal = 0;
	    foreach($cart as $item){
	        $subtotal += $item->precio * $item->quantity;
	    }

	    $hoteles = Hotel::orderBy('id', 'asc')->get();
		$hotel = $hoteles[0];
		$fechaInicio = $fechas['fecha_inicio'] . " " . $hotel->checkin;
		$fechaFin = $fechas['fecha_fin'] . " " . $hotel->checkout;

	    $reserva = Reserva::create([
	        'total' => $subtotal,
	        'reservaestado_id' => 2,
	        'fecha_reserva' => date('Y-m-d'),
	        'fecha_inicio' => $fechaInicio,
	        'fecha_fin' => $fechaFin,
	        'cliente_id' => $cliente['id']
	    ]);
	    
	    foreach($cart as $item){
	        $this->saveOrderItem($item, $reserva->id);
	    }

	    return redirect('/#/comprarealizada');

	}
	
	private function saveOrderItem($item, $reserva_id)
	{
		for ($i = 0; $i < $item['quantity']; $i++) { 
			Habtiporeserva::create([
				'habtipo_id' => $item->id,
				'reserva_id' => $reserva_id
			]);
		}
		
	}
}