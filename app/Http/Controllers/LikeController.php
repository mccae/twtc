<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Like ;


class LikeController extends Controller
{

	public function likeCount(Request $request)
	{
		$post_id = $request->input('post_id') ;
		$like_count = Like::where('post_id' , '=' , $post_id)->count() ;
		return $like_count ;

	}



	// return 1 when new likes added
	// return 2 when like deleted
	public function toggleLike(Request $request)
	{

		$request->validate([
			'postId' => 'required' ,
		]) ;


		// get user id , user must be logged in to access . safe to get
		$user_id = Auth::user()->id ;

		$post_id = $request->input('postId') ;


		$user_did_like = Like::select('user_id')->where('user_id' , '=' , $user_id)->where('post_id' , '=' , $post_id)->count() ;

		if ($user_did_like == 0) // add like to likes table
		{
			$like = new Like ;
			$like->user_id = $user_id ;
			$like->post_id = $post_id ;

			if ($like->save()) 
			{
				return 1 ;
			}
			else
			{
				return 0 ;
			}
		}
		else if ($user_did_like == 1) // remove the like
		{
			// remove the like in db
			$del_res = Like::where('post_id' , '=' , $post_id)->where('user_id' , '=' , $user_id)->delete() ;

			if ($del_res)
			{
				return 2 ;
			}
			else
			{
				return 0 ;
			}
		}

	}

	public function userDidLike(Request $request)
	{

		$request->validate([
			'postId' => 'required' ,
		]) ;

		$post_id = $request->input('postId') ;
		
		$user_id = Auth::user()->id ;

		$user_did_like = Like::select('user_id')->where('user_id' , '=' , $user_id)->where('post_id' , '=' , $post_id)->count() ;

		return $user_did_like ;

	}

}
