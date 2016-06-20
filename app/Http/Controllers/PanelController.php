<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

class PanelController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    	return view('dash.admin');
    }
    public function getPanel()
    {
   		 if (Auth::user()->usuariotipo->nombre != "Root") {
            if (Auth::user()->usuariotipo->nombre == "Administrador"){
                return response()->json([
		            "mensaje" => 'administrador'
		        ]);
            }
            else{
                return response()->json([
		            "mensaje" => 'administrador'
		        ]);
            }
        }
        else{
            return response()->json([
		            "mensaje" => 'administrador'
		        ]);
        }
    }
}
