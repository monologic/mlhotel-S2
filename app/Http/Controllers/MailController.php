<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class MailController extends Controller
{
   public function send(Request $request){
   		$data= $request->all();
   		Mail::send('contacto.contacto', $data, function ($message) {
		    $message->from('love_mauco@hotmail.com', 'Hotel-Contact');
		    $message->subject('Preguntas de los contactos');
		    $message->to('btr_manuel2@hotmail.com');
		});

   }
}
