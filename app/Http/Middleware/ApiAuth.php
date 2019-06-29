<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class apiAuth
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

		if (Auth::check())
		{
			return $next($request);
		}
		else
		{
			// return http response with status of 401
			return response('you are not logged in' , 401) ;
		}

    }
}
