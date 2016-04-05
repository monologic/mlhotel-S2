<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Habtiporeserva extends Model
{
    public function habtipo()
    {
    	return $this->belongsTo('App\habtipo');
    }

    public function reserva()
    {
    	return $this->belongTo('App\Reserva');
    }
}
