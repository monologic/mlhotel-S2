<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class MailController extends Controller
{
	public $from;
	public $subject;
   	public function send(Request $request){
   		$data = $request->all();
   		$this->from = $request->email;
   		$this->subject = $request->subject;
   		Mail::send('contacto.contacto', $data, function ($message) {
		    $message->from($this->from, $this->from);
		    $message->subject($this->subject);
		    $message->to('redlein7@gmail.com');
		});
		return redirect('/#/mensajeenviado');

   }
}
