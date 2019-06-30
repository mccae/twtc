<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Comment ;
use APp\User ;

class CommentController extends Controller
{


	public function store(Request $request)
	{

		// user logged in get only content
		if (Auth::check()) 
		{
			$valid_data = $request->validate([
				'content' => 'required|min:5|max:300' ,
				'post_id' => 'required'
			]) ;

			$content = $request->input('content') ;
			$post_id = $request->input('post_id') ;

			$comment = new Comment ;
			$comment->post_id = $post_id ;
			$comment->content = $content ;
			// get user info from login session
			$comment->username = Auth::user()->username ;
			$comment->email = Auth::user()->email ;

			$comment->save() ;

			return back() ;


		}
		else // user not logged in , get username and email
		{

			$valid_data = $request->validate([
				'username' => 'required|min:3|max:40' ,
				'email' => 'required|min:3|max:50' ,
				'content' => 'required|min:5|max:300' ,
				'post_id' => 'required' ,
			]) ;

			$post_id = $request->input('post_id') ;
			$username = $request->input('username') ;
			$email = $request->input('email') ;
			$content = $request->input('content') ;

			$comment = new Comment ;
			$comment->username = $username ;
			$comment->email = $email ;
			$comment->content = $content ;
			$comment->post_id = $post_id ;

			$comment->save() ;

			return back() ;

		}
	}


	public function getCommentsForPost(Request $request)
	{

		$request->validate([
			'postId' => 'required' ,
		]) ;

		$post_id = $request->input('postId') ;

		$comments = Comment::where('post_id' , '=' , $post_id)
			->join('users' , 'comments.user_id' , '=' , 'users.id')
			->select('comments.id' , 'comments.content' , 'users.name')
			->paginate(7) ;

		return $comments ;

	}
}
