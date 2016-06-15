<?php

namespace App\Http\Middleware;

use Closure;
use App\Hotel;

class RoutesCore
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   
        $h = Hotel::all();
        if ($h[0]->nombre != env('APP_SERIAL')) {
            return redirect('/');
        }
        return $next($request);
    }
}
