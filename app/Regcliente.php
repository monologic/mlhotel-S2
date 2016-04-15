<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Regcliente extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'registro_id', 'cliente_id',
    ];
    
    public function cliente()
    {
    	return $this->belongsTo('App\Cliente');
    }

    public function registro()
    {
    	return $this->belongsTo('App\Registro');
    }
}
