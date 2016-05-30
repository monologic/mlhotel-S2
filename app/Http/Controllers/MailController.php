<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;
use App\Hotel;
use App\Reserva;
use App\Banco;
use App\Cambiomonedatipo;

class MailController extends Controller
{
	public $from;
	public $subject;
	public $to;

   	public function send(Request $request){
   		$data = $request->all();
   		$this->from = $request->email;
   		$this->subject = $request->subject;
   		$hotel = Hotel::all();
        $this->to = $hotel[0]->correo;
   		Mail::send('contacto.contacto', $data, function ($message) {
		    $message->from($this->from, $this->from);
		    $message->subject($this->subject);
		    $message->to( $this->to);
		});
		return redirect('/#/mensajeenviado');

   }

   public function sendMailPagos($id, $cliente, $plantilla)
   {
        $hotel = Hotel::all();
        $correo = $hotel[0]->correo;
        //ddd($correo);
        $reserva = $this->getReserva($id, $cliente);
        
        $cliente = $reserva['cliente'];

        Mail::send($plantilla, $reserva, function ($m) use ($cliente, $correo) {
            $m->from($correo, 'Confirmación de Reserva');
            $m->to( $cliente['email'], $cliente['nombres'] . " " . $cliente['apellidos'] )->subject('Confirmación de Reserva');
        });
    }
    public function getReserva($id, $cliente)
    {
        $reserva = Reserva::find($id);
        $reserva->habtiporeservas;
        $reserva->cliente;
        $reserva->cliente->email = $cliente['email'];

        $banco = Banco::find($cliente['banco_id']);
        $reserva->banco = $banco;

        $hotel = Hotel::all();
        $monedas = Cambiomonedatipo::where('siglas','USD')->get();
        $moneda = $monedas[0];
        $reserva->moneda = $moneda;
        $reserva->hotel = $hotel[0];

        $habReserva = $reserva->habtiporeservas;
        $reserva->habtiporeservas->each(function($habReserva){
            $habReserva->habtipo;
        });
        $reserva = $reserva->toArray();
        $habtipos = $reserva['habtiporeservas'];
            $ht = array();
            foreach ($habtipos as $key => $habtipo) {    
                if (count($ht) > 0) {
                    foreach ($ht as $k => $htt) {
                        if ( $habtipo['habtipo']['id'] == $htt['id']) {
                            $element = $ht[$k];
                            $el = $element['count'];
                            $el++;
                            $element['count'] = $el;
                            $ht[$k] = $element;
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
                $reserva['habtiposcount'] = $ht;
            }

        return $reserva;

    }
}
