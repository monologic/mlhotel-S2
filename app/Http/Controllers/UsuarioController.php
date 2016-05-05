<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Usuario;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $usuarios = \DB::table('usuarios')
                       ->join('empleados', 'empleados.id', '=', 'usuarios.empleado_id')
                       ->join('usuariotipos', 'usuariotipos.id', '=', 'usuarios.usuariotipo_id')
                       ->join('emptipos', 'emptipos.id', '=', 'empleados.emptipo_id')
                       ->select('usuarios.*', 'empleados.nombres', 'empleados.apellidos', 'usuariotipos.nombre as usuariotipo', 'emptipos.tipo as tipoempleado' )
                       ->where('empleados.hotel_id',\Auth::user()->empleado->hotel->id)
                       ->get();

        return response()->json( $usuarios );          
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $usuario = new Usuario($request->all());
        $usuario->password = bcrypt($request->password);
        $usuario->activo = 1;
        $usuario->save();

        return response()->json([
            "mensaje" => 'Usuario Creado'
        ]);
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

    public function activarDesactivar($id)
    {
        $usuario = Usuario::find($id);
        if ($usuario->activo == 1) {
            $usuario->activo = 0;
        }
        else{
            $usuario->activo = 1;
        }

        $usuario->save();

        return $this->index();
       
    }
}
