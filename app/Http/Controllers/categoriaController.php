<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Categoria;
use App\Servicio;

class categoriaController extends Controller
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

    public function ServiceCreateIndex(Request $request)
    {
        
      if($request->file('foto'))
        {
            $file = $request -> file('foto');
            $name = 'servicio_'. time() . '.' .$file->getClientOriginalExtension();
            $path=public_path() . "/imagen/sliders/";
            $file -> move($path,$name);
        }
        $categoria = new Categoria($request->all());
        $categoria->foto = $name;
        $categoria->save();
         return redirect('admin#/LisServicio');
    }
     public function getServices()
    {
        $Servicios = Categoria::all();
        $Servicios->each(function($Servicios){
            $Servicios->servicios;
        });
        
        $Servicios = $Servicios ->toArray();
        return response()->json( $Servicios );
    }
     public function getServicesompletoC($id)
    {
        $Servicios = Categoria::where('id',$id)->get();
        $Servicios->each(function($Servicios){
            $Servicios->servicios;
        });
        $Servicios = $Servicios->toArray();
        return response()->json( $Servicios );
    }

    public function ServiceCreateforCategory(Request $request)
    {
        
      if($request->file('foto'))
        {
            $file = $request -> file('foto');
            $name = 'servicio_cat'. time() . '.' .$file->getClientOriginalExtension();
            $path=public_path() . "/imagen/Categoria/";
            $file -> move($path,$name);
        }
        $servicioC = new Servicio($request->all());
        $servicioC->foto = $name;
        $servicioC->save();
         return redirect('admin#/LisServicios');
    }

}
