<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;
use App\Hotel;

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
}
