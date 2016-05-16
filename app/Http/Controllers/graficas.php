<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Http\Requests;

class graficas extends Controller
{
    public function ghabitaciones()
    {
    	$cnt = \DB::table('habitacions')
    		->select(DB::raw('habtipos.nombre,count(habtipos.nombre) as user_count'))
            ->join('registros', 'registros.habitacion_id', '=', 'habitacions.id')
            ->join('habtipos', 'habitacions.habtipo_id', '=', 'habtipos.id')
            ->groupBy('habtipos.nombre')
        	->get();
        return response()->json($cnt);
    }
}
