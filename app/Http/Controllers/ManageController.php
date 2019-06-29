<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ManageController extends Controller
{

	public function index()
	{
		// check if user is logged in
		if (Auth::check())
		{
			return view('manage.index') ;
		}
		else
		{
			return redirect('login') ;
		}
	}

}
