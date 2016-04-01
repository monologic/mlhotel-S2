<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Registro;
use App\Habitacion;

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

    	$habs = Habitacion::whereNotIn('id', $hab_id_array)->get();

    	dd($habs->toArray());

    	

    }
}