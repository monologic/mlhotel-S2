<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Reserva;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getReservasNoAsignadas()
    {
        $reservas = Reserva::where('reservaestado_id',2)
                           ->get();

        $reservas->each(function($reservas){
            $reservas->cliente;
        });

        $reservas->each(function($reservas){
            $reservas->pagotipo;
        });

        $reservas->each(function($reservas){
            $reservas->habtiporeservas;
            $habReserva = $reservas->habtiporeservas;
            $reservas->habtiporeservas->each(function($habReserva){
                $habReserva->habtipo;
            });
        });

        $reservas = $reservas->toArray();

        foreach ($reservas as $j => $reserva) {
            $habtipos = $reserva['habtiporeservas'];
            $ht = array();
            foreach ($habtipos as $key => $habtipo) {    
                if (count($ht) > 0) {
                    foreach ($ht as $k => $htt) {
                        if ( $habtipo['habtipo']['id'] == $htt['id']) {
                            $ht[$k]['count']++;
                        }
                        else {
                            $habtipo['habtipo']['count'] = 1;
                            $ht[] = $habtipo['habtipo'];
                        }

                    }
                }
                else {
                    $habtipo['habtipo']['count'] = 1;
                    $ht[] = $habtipo['habtipo'];
                    
                }

                $reservas[$j]['habtiposcount'] = $ht;

            }
        }
        

        return response()->json( $reservas );
    }

    public function getReserva($id)
    {
        $reservas = Reserva::where('id', $id)
                           ->get();

        $reservas->each(function($reservas){
            $reservas->cliente;
        });

        $reservas->each(function($reservas){
            $reservas->pagotipo;
        });

        $reservas->each(function($reservas){
            $reservas->habtiporeservas;
            $habReserva = $reservas->habtiporeservas;
            $reservas->habtiporeservas->each(function($habReserva){
                $habReserva->habtipo;
            });
        });
        
        $reservas = $reservas->toArray();

        foreach ($reservas as $j => $reserva) {
            $habtipos = $reserva['habtiporeservas'];
            $ht = array();
            foreach ($habtipos as $key => $habtipo) {    
                if (count($ht) > 0) {
                    foreach ($ht as $k => $htt) {
                        if ( $habtipo['habtipo']['id'] == $htt['id']) {
                            $ht[$k]['count']++;
                        }
                        else {
                            $habtipo['habtipo']['count'] = 1;
                            $ht[] = $habtipo['habtipo'];
                        }

                    }
                }
                else {
                    $habtipo['habtipo']['count'] = 1;
                    $ht[] = $habtipo['habtipo'];
                    
                }

                $reservas[$j]['habtiposcount'] = $ht;

            }
        }
        return response()->json( $reservas );
    }
    public function getReservasPorConfirmar()
    {
        $reservas = Reserva::where('reservaestado_id',3)
                           ->get();

        $reservas->each(function($reservas){
            $reservas->cliente;
        });

        $reservas->each(function($reservas){
            $reservas->pagotipo;
        });
        
        $reservas->each(function($reservas){
            $reservas->habtiporeservas;
            $habReserva = $reservas->habtiporeservas;
            $reservas->habtiporeservas->each(function($habReserva){
                $habReserva->habtipo;
            });
        });

        $reservas = $reservas->toArray();

        foreach ($reservas as $j => $reserva) {
            $habtipos = $reserva['habtiporeservas'];
            $ht = array();
            foreach ($habtipos as $key => $habtipo) {    
                if (count($ht) > 0) {
                    foreach ($ht as $k => $htt) {
                        if ( $habtipo['habtipo']['id'] == $htt['id']) {
                            $ht[$k]['count']++;
                        }
                        else {
                            $habtipo['habtipo']['count'] = 1;
                            $ht[] = $habtipo['habtipo'];
                        }

                    }
                }
                else {
                    $habtipo['habtipo']['count'] = 1;
                    $ht[] = $habtipo['habtipo'];
                    
                }

                $reservas[$j]['habtiposcount'] = $ht;

            }
        }
        

        return response()->json( $reservas );
    }
    public function confirmarReserva($id)
    {
        $reserva = Reserva::find($id);
        $reserva->reservaestado_id = 2; // id 2 reserva por asignar;
        $reserva->save();

        return $this->getReservasPorConfirmar();
    }
    public function cancelarReserva($id)
    {
        $reserva = Reserva::find($id);
        $reserva->fecha_inicio = null;
        $reserva->fecha_fin = null;
        $reserva->reservaestado_id = 4; // id 4 cancelar reserva;
        $reserva->save();

        //return $this->getReservasPorConfirmar();
    }
}
                        