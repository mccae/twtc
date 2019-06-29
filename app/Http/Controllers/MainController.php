<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post ;
use App\User ;
use App\Comment ;
use App\Follow ;
use Illuminate\Support\Facades\Auth;

class MainController extends Controller
{

	public function index()
	{
		if (Auth::check()) // if user is logged in
		{

			return view('main/index' , [
				'logged' => 1
			]) ;
		}
		else // user not logged in
		{
			return view('main/index' , [
				'logged' => 0 ,
			]) ;
		}

	}

	


	public function showUserPage($username)
	{

		$user = User::where('name' , '=' , $username)->select('id')->get() ;

		if ($user->count() == 0)
		{
			return response('user Not Found' , 404) ;
		}
		else
		{
	
			if (Auth::check())
			{
				return view('main/userPage' , [
					'logged' => 1 ,
					'user_id' => $user[0]->id ,
				]) ;
			}
			else
			{
				return view('main/userPage' , [
					'logged' => 0 ,
					'user_id' => $user[0]->id ,
				]) ;
			}

		}
	
	}


	public function getUsersPosts(Request $request)
	{
		$user_id = $request->input('userId') ;


		// check if user exists
		if (User::find($user_id)->count() == 0)
		{
			// return 404 error
			return response('username not found' , 404) ;
		}
		else
		{
		
			$posts = Post::join('users' , 'users.id' , '=' , 'posts.user_id')->where('users.id' , '=' , $user_id)->select('users.name' , 'posts.id' , 'posts.content' , 'posts.created_at' , 'posts.updated_at')->paginate(7) ;

			return $posts ;
		
		}
	}


}
