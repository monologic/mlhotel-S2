<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Registro;
use App\Habitacion;
use App\Habtipo;
use App\Reserva;
use App\Habtiporeserva;

use DB;

class RegistroController extends Controller {
    
    public function buscar($fechaini, $fechafin)
    {
    	$r = Registro::select('habitacion_id')
    				->whereBetween('fechaentrada', [$fechaini, $fechafin])
    				->orWhere(DB::raw("$fechaini between fechaentrada and fechasalida"))
    				->get();

    	$r = $r->toArray();
    	$hab_id_array = array();

    	foreach ($r as $key => $regs) {
    		foreach ($regs as $k => $habitacion_id)
    			array_push($hab_id_array, $habitacion_id);
    	}

    	$habs = Habitacion::whereNotIn('id', $hab_id_array)
                          ->orderBy('habtipo_id', 'asc')
                          ->get();

        $habs->each(function($habs){
            $habs->estado;
        });
        $habs->each(function($habs){
            $habs->habtipo;
        });

        $habs = $habs->toArray();

        $habtipos = Habtipo::all();
        $habtipos = $habtipos->toArray();

        foreach ($habs as $key => $hab) {
            foreach ($habtipos as $k => $habtipo) {
                if ($habtipo['id'] == $hab['habtipo_id']) {
                    $habtipos[$k]['habitaciones'][] = $hab;
                }
            }
        }

        $reservas = Reserva::where('reservaestado_id', '2')
                          ->whereBetween('fecha_inicio', [$fechaini, $fechafin])
                          ->orWhere(DB::raw("$fechaini between fecha_inicio and fecha_fin"))
                          ->get();

        $reservas->each(function($reservas){
            $reservas->habtiporeservas;
        });

        $reservas = $reservas->toArray();
        foreach ($reservas as $h => $reserva) {
            foreach ($reserva['habtiporeservas'] as $i => $habtipo) {
                foreach ($habtipos as $k => $ht) {
                    if ($ht['id'] == $habtipo['habtipo_id']) {
                        $habtipos[$k]['habtiporeservas'][] = $habtipo;
                    }
                }
            }
        }
        
        foreach ($habtipos as $k => $habtipo) {
            $r = count($habtipo['habtiporeservas']);
            $habtipos[$k]['habtiporeservascount'] = $r;
            $r2 = count($habtipo['habitaciones']);
            $habtipos[$k]['habitacionescount'] = $r2;

        }
        //dd($habtipos);
    	return response()->json($habtipos);
    }
}