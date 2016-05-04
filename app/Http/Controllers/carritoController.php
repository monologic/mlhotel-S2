<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use DB;

use App\Registro;
use App\Habitacion;
use App\Habtipo;
use App\Reserva;
use App\Habtiporeserva;
use App\Cliente;

class carritoController extends Controller
{
    public $fechainicio;
    static $fechaInicio;

    public function __construct()
    {
        if(!\Session::has('fechas')) \Session::put('fechas', array());
        if(!\Session::has('cart')) \Session::put('cart', array());
        if(!\Session::has('cliente')) \Session::put('cliente', array());
        if(!\Session::has('porcentaje')) \Session::put('porcentaje', array());
    }
   
    public function buscarHabitaciones($fechaini, $fechafin)
    {
        $dias = (strtotime($fechaini)-strtotime($fechafin))/86400;
        $dias = abs($dias); 
        $dias = floor($dias);

        $fechas = \Session::get('fechas');
        $fechas['fecha_inicio'] = $fechaini;
        $fechas['fecha_fin'] = $fechafin;
        $fechas['dias'] = $dias;
        \Session::put('fechas', $fechas);   

        $this->fechainicio = $fechaini. " " . date('H:i:s');
        $r = Registro::select('habitacion_id')
                    ->whereBetween('fechaentrada', [$this->fechainicio, $fechafin. " 12:00:00"])
                    ->orWhere(function($query){
                        $query->whereRaw(DB::raw("'$this->fechainicio' between `fechaentrada` and `fechasalida`"));
                        })
                    ->get();

        
        $r = $r->toArray();

        if (count($r) != 0) {
            $hab_id_array = array();

            foreach ($r as $key => $regs) {
                foreach ($regs as $k => $habitacion_id)
                    array_push($hab_id_array, $habitacion_id);
            }

            $habs = Habitacion::whereNotIn('id', $hab_id_array)
                              ->orderBy('habtipo_id', 'asc')
                              ->get();
        }
        else {
            $habs = Habitacion::orderBy('habtipo_id', 'asc')
                              ->get();
        }
        
        
        $habs->each(function($habs){
            $habs->estado;
        });
        $habs->each(function($habs){
            $habs->habtipo;
        });

        $habs = $habs->toArray();

        $habtipos = Habtipo::all();

        $habtipos->each(function($habtipos){
            $iconos=$habtipos->habtipo_serviciointernos;
            $habtipos->habtipo_serviciointernos->each(function($iconos){
                $iconos->serviciointerno;
            });

        });

        $habtipos = $habtipos->toArray();

        foreach ($habs as $key => $hab) {
            foreach ($habtipos as $k => $habtipo) {
                if ($habtipo['id'] == $hab['habtipo_id']) {
                    $habtipos[$k]['habitaciones'][] = $hab;
                }
            }
        }
        //dd($habtipos);
        $reservas = Reserva::where('reservaestado_id', '2')
                          ->whereBetween('fecha_inicio', [$fechaini, $fechafin])
                          ->orWhere(function($query){
                            $query->whereRaw(DB::raw("'$this->fechainicio' between `fecha_inicio` and `fecha_fin`"));
                            })
                          ->get();


        

        $reservas->each(function($reservas){
            $reservas->habtiporeservas;
        });     
        
        $reservas = $reservas->toArray();
        if (count($reservas) != 0) {
            foreach ($reservas as $h => $reserva) {
                foreach ($reserva['habtiporeservas'] as $i => $habtipo) {
                    foreach ($habtipos as $k => $ht) {
                        if ( $ht['id'] == $habtipo['habtipo_id']) {
                            $habtipos[$k]['habtiporeservas'][] = $habtipo;
                        }
                        if (!isset($habtipos[$k]['habtiporeservas'])) {
                            $habtipos[$k]['habtiporeservas'] = null;
                        }
                    }
                }
            }
        }
        //dd($habtipos);
        foreach ($habtipos as $k => $habtipo) {
            if (count($reservas) != 0) {
                $r = count($habtipo['habtiporeservas']);
                $habtipos[$k]['habtiporeservascount'] = $r;
            }
            else
                $habtipos[$k]['habtiporeservascount'] = 0   ;
            
            $r2 = count($habtipo['habitaciones']);
            $habtipos[$k]['habitacionescount'] = $r2;

        }
        //dd($habtipos);
        return response()->json($habtipos);
    }

    // Show cart
    public function show()
    {
        $cart = \Session::get('cart');
        //$total = $this->total();
        //return view('store.cart', compact('cart', 'total'));
        //dd($cart);
        $cartRet = $cart;
        return response()->json( $cartRet );
    }

    public function getDias()
    {
        $cart = \Session::get('fechas');
        //$total = $this->total();
        //return view('store.cart', compact('cart', 'total'));
        //dd($cart);
        $fechas = $cart;
        return response()->json( $fechas );
    }

    // Add item
    public function add(Habtipo $Habtipo)
    {
        $cart = \Session::get('cart');
        $Habtipo->quantity = 1;
        $cart[$Habtipo->id] = $Habtipo;
        \Session::put('cart', $cart);

        //return redirect()->route('cart-show');
    }

    // Delete item
    public function delete(Habtipo $Habtipo)
    {
        $cart = \Session::get('cart');
        unset($cart[$Habtipo->id]);
        \Session::put('cart', $cart);

        //return redirect()->route('cart-show');
    }

    // Update item
    public function update(Habtipo $Habtipo, $quantity)
    {
        $cart = \Session::get('cart');
        $cart[$Habtipo->id]->quantity = $quantity;
        \Session::put('cart', $cart);

        //return redirect()->route('cart-show');
    }

    // Trash cart
    public function trash()
    {
        \Session::forget('cart');

        //return redirect()->route('cart-show');
    }

    // Total
    private function total()
    {
        $cart = \Session::get('cart');
        $total = 0;
        foreach($cart as $item){
            $total += $item->price * $item->quantity;
        }

        return $total;
    }

    // Detalle del pedido
    public function orderDetail()
    {
        if(count(\Session::get('cart')) <= 0) return redirect()->route('home');
        $cart = \Session::get('cart');
        $total = $this->total();

        return view('store.order-detail', compact('cart', 'total'));
    }

    //Guardar Cliente en BD y Session
    public function guardarCliente(Request $request)
    {
        $c = Cliente::where('dni', $request->dni)->get();
        if ($c->count() == 0) {
            $cli = new Cliente($request->all());
            $cli->save();
        }
        else
            $cli = $c[0];

        $cliente = \Session::get('cliente');
        $cliente['id'] = $cli->id;
        \Session::put('cliente', $cliente);

        $porcentaje = \Session::get('porcentaje');
        $porcentaje['porcentaje'] = $request->porcentaje;
        \Session::put('porcentaje', $porcentaje);
    }

    /*
    public function addCarrito(Request $request){

        $carrito = $request->all();
            $arreglo=Session::get('car.items');
            $encontro=false;
            $numero=0;

            for($i=0;$i<count($arreglo);$i++){
                if ($arreglo[$i]['id']==$request->id) {
                    $encontro=true;
                    $numero=$i;
                }
            }
            if (!$encontro) {
                Session::push('car.items',$carrito);
            }
        
    }
    public function getCar(){

        return response()->json( Session::get('car') );
    }
    */
}
