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
    		->select(DB::raw('habtipos.nombre, count(habtipos.nombre) as user_count'))
            ->join('registros', 'registros.habitacion_id', '=', 'habitacions.id')
            ->join('habtipos', 'habitacions.habtipo_id', '=', 'habtipos.id')
            ->groupBy('habtipos.nombre')
        	->get();

        $diasReservas = \DB::table('reservas')
                          ->select(DB::raw('DAY(fecha_inicio) , count(fecha_inicio)'))
                          ->whereRaw('fecha_inicio BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -7 DAY)) AND NOW()')
                          ->groupBy(DB::raw('DAY(fecha_inicio)'))
                          ->get();

        $mesesReservas = \DB::table('reservas')
                          ->select(DB::raw('YEAR(fecha_inicio), MONTH(fecha_inicio) , count(fecha_inicio)'))
                          ->whereRaw('fecha_inicio BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -6 MONTH)) AND NOW()')
                          ->groupBy(DB::raw('YEAR(fecha_inicio), MONTH(fecha_inicio)'))
                          ->get();

        $yearsReservas = \DB::table('reservas')
                          ->select(DB::raw('YEAR(fecha_inicio) , count(fecha_inicio)'))
                          ->whereRaw('fecha_inicio BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -6 YEAR)) AND NOW()')
                          ->groupBy(DB::raw('YEAR(fecha_inicio)'))
                          ->get();

        $diasRegistros = \DB::table('registros')
                          ->select(DB::raw('DAY(fechaentrada) , SUM(total)'))
                          ->whereRaw('fechaentrada BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -7 DAY)) AND NOW()')
                          ->groupBy(DB::raw('DAY(fechaentrada)'))
                          ->get();

        $mesesRegistros = \DB::table('registros')
                          ->select(DB::raw('YEAR(fechaentrada), MONTH(fechaentrada) , SUM(total)'))
                          ->whereRaw('fechaentrada BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -6 MONTH)) AND NOW()')
                          ->groupBy(DB::raw('YEAR(fechaentrada), MONTH(fechaentrada)'))
                          ->get();

        $yearsRegistros = \DB::table('registros')
                          ->select(DB::raw('YEAR(fechaentrada) , SUM(total)'))
                          ->whereRaw('fechaentrada BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -6 YEAR)) AND NOW()')
                          ->groupBy(DB::raw('YEAR(fechaentrada)'))
                          ->get();

        $report = array();
        
        $report['habitaciones'] = $cnt;
        $report['diasReservas'] = $diasReservas;
        $report['mesesReservas'] = $mesesReservas;
        $report['yearsReservas'] = $yearsReservas;
        $report['diasRegistros'] = $diasRegistros;
        $report['mesesRegistros'] = $mesesRegistros;
        $report['yearsRegistros'] = $yearsRegistros;

        return response()->json($report);
    }
    public function diasReservas($fechaini, $fechafin)
    {
        
    }
    public function mesesReservas($fechaini, $fechafin)
    {
        
    }
/*

$diasReservas = \DB::table('reservas')
                          ->select(DB::raw('YEAR(fecha_inicio), DAY(fecha_inicio) , sum(total)'))
                          ->whereRaw('fecha_inicio BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -7 DAYS)) AND NOW()')
                          ->groupBy('DAY(fecha_inicio)')
                          ->get();


    Select YEAR(fechaentrada), MONTH(fechaentrada) , sum(total) 
from registros
WHERE fechaentrada BETWEEN DATE(DATE_ADD(NOW(), INTERVAL -6 MONTH)) AND NOW()
GrOUP by YEAR(fechaentrada), MONTH(fechaentrada)*/
}
