<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class MailController extends Controller
{
   public function send(Request $request){
   		$data = $request->all();
   		Mail::send('contacto.contacto', $data, function ($message) {
		    $message->from('chalex_777@hotmail.com', 'Daniel Flores');
		    $message->subject('Preguntas de los contactos');
		    $message->to('redlein7@gmail.com');
		});

   }
}
