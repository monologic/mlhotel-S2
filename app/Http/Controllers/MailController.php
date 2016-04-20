<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Mail;

class MailController extends Controller
{
   public function send(Request $request){
       $data = $request->all();
       Mail::send('emails.message', $data, function($message) use ($request){
           $message->from($request->email, $request->name);
           $message->subject($request->subject);
           $message->to(env('CONTACT_MAIL'), env('CONTACT_NAME'));

       });
   }
}
