<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;
use App\Hotel;
use App\Reserva;

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

   public function sendMailPagos($id, $email, $plantilla)
   {
        $reserva = $this->getReserva($id);

        $user = User::findOrFail($id);

        Mail::send($plantilla, ['user' => $user], function ($m) use ($user) {
            $m->from('hello@app.com', 'Your Application');
            $m->to($user->email, $user->name)->subject('Your Reminder!');
        });
    }
    public function getReserva($id)
    {
        $reserva = find($id);
        $reserva->habtiporeservas;
        $reserva->cliente;
        $habReserva = $reserva->habtiporeservas;
        $reserva->habtiporeservas->each(function($habReserva){
            $habReserva->habtipo;
        });


    }
}
