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
    public function diasReservas($fechaini, $fechafin)
    {
        $cnt = \DB::table('reservas')
            ->select ( DB::raw('fecha_reserva,count(fecha_reserva) as cantidad' ))
            ->whereBetween('fecha_reserva',[$fechaini, $fechafin])
            ->groupBy('fecha_reserva')
            ->get();
        return response()->json($cnt);
    }
    public function mesesReservas($fechaini, $fechafin)
    {
        $cnt = \DB::table('reservas')
            ->select ( DB::raw('MONTH(fecha_reserva)AS Mes , sum(total)AS  Total' ))
            ->whereBetween('fecha_reserva',[$fechaini, $fechafin])
            //->groupBy(DB::raw('MONTH(fecha_reserva')))
            ->get();
        return response()->json($cnt);
    }
}
