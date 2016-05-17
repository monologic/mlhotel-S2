<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;

use App\Registro;
use App\Habitacion;
use App\Habtipo;
use App\Reserva;
use App\Habtiporeserva;

use App\Serviciointerno;
use App\Habtipo_serviciointerno;

use DB;

class RegistroController extends Controller {

    public $fechainicio;
    static $fechaInicio;

    public function buscar($fechaini, $fechafin)
    {
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

        $habtipos = Habtipo::where('activo', 1)->get();

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

    public function store(Request $request)
    {
        $registro = new Registro();
        $registro->usuario_id = Auth::user()->id;
        $registro->habitacion_id = $request->habitacion_id;
        $registro->fechaentrada = $request->fechaini . " " . date('H:i:s');
        $registro->fechasalida = $request->fechafin. " " . Auth::user()->empleado->hotel->checkout;

        $registro->save();

        $this->cambiarEstadoHabs($registro->habitacion_id);

        return response()->json([
            "mensaje" => 'Registro Creado'
        ]);

    }
    public function cambiarEstadoHabs($id)
    {
        $hab = Habitacion::find($id);
        $hab->estado_id = 2;
        $hab->save();
        
    }

    public static function registrosDeHoy()
    {   self::$fechaInicio = date("Y-m-d H:i:s");
        $fechafin = date("Y-m-d")." 11:59:59";
        $r = Registro::whereBetween('fechaentrada', [ self::$fechaInicio, date("Y-m-d")." 11:59:59"])
                     ->orWhere(function($query){
                        $query->whereRaw(DB::raw("'".self::$fechaInicio."' between fechaentrada and fechasalida"));
                        })
                     ->get();

                     

        $r->each(function($r){
            $r->regclientes;
            $regclientes = $r->regclientes;
            $r->regclientes->each(function($regclientes){
                $regclientes->cliente;
            });
        });

        $r = $r->toArray();

        return $r;
    }
    public function getRegistro($id)
    {
        $registro = Registro::where('id', $id)
                            ->get();
        $registro->each(function($registro){
            $registro->regclientes;
            $regclientes = $registro->regclientes;
            $registro->regclientes->each(function($regclientes){
                $regclientes->cliente;
            });

        });
        $registro->each(function($registro) {
            $registro->habitacion;
            $registro->habitacion->habtipo;
        });

        return response()->json($registro);
    }
    public function finalizar($id)
    {
        $registro = Registro::find($id);
    
        $registro->fechasalida = date("Y-m-d H:i:s");
        $registro->save();

        $registro->habitacion;

        $hab = Habitacion::find($registro->habitacion->id);
        $hab->estado_id = 1;
        $hab->save();

        return response()->json([
            "mensaje" => 'Admin#/Habitaciones'
        ]);
    }
}