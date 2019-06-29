<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\User ;
use App\Follow ;

class FollowController extends Controller
{

	public function follow(Request $request)
	{
		$request->validate([
			'userId' => 'required' ,
		]) ;

		$user_id = $request->input('userId') ;
		$logged_user_id = Auth::user()->id ;


		// check if user and following user id is not the same , this should be controlled in manage not with this api
		if ($user_id == $logged_user_id) 
		{
			return response('cant follow or unfollow yourself' , 401) ;
		}

		$user_exist = User::where('id' , '=' , $user_id)->count() ;
		$logged_user_exist = User::where('id' , '=' , $logged_user_id)->count() ;

		if ($user_exist && $logged_user_exist)
		{
			// check is not already followed,error shouldnt happen in normal fronend app
			$dup_check = Follow::where('user_id' , '=' , $user_id)->where('follower_id' , '=' , $logged_user_id)->count() ;


			// check database result
			if ($dup_check == 0)
			{
				$follow = new Follow ;
				$follow->user_id = $user_id ;
				$follow->follower_id = $logged_user_id ;
				if ($follow->save())
				{
					return 1 ;
				}
			}
			else
			{
				// send 400 error with message
				return response('already followed' , 400) ;
			}
		}
		else
		{
			// if user ids are wrong, not goning to happen in normal app logic
			return response('wrong user id' , 404) ;
		}

	}

	public function unFollow(Request $request)
	{

		$request->validate([
			'userId' => 'required' ,
		]) ;

		$user_id = $request->input('userId') ;
		$logged_user_id = Auth::user()->id ;

		$user_exist = User::where('id' , '=' , $user_id)->count() ;
		$logged_user_exist = User::where('id' , '=' , $logged_user_id)->count() ;

		if ($user_exist && $logged_user_exist)
		{
			// check is followed,error shouldnt happen in normal fronend app
			$dup_check = Follow::where('user_id' , '=' , $user_id)->where('follower_id' , '=' , $logged_user_id)->count() ;

			// check database result
			if ($dup_check == 1)
			{
				$delete_result = Follow::where('user_id' , '=' , $user_id)->where('follower_id' , '=' , $logged_user_id)->delete() ;


				if ($delete_result)
				{
					return 1 ;
				}
				else
				{
					return response('error in deleting follow' , 500) ;
				}

			}
			else
			{
				// send 400 error with message
				return response('user is not followed' , 400) ;
			}
		}
		else
		{
			// if user ids are wrong, not goning to happen in normal app logic
			return response('wrong user id' , 404) ;
		}

	}


	// check if logged in user is following the user with the given userId
	public function userIsFollowing(Request $request)
	{

		if (Auth::check())
		{

			$request->validate([
				'userId' => 'required' ,
			]) ;

			$user_id = $request->input('userId') ;
			$logged_user_id = Auth::user()->id ;

			// check if the logged in user in following the input user
			$is_following = Follow::where('user_id' , '=' , $user_id)->where('follower_id' , '=' , $logged_user_id)->count() ;

			return $is_following ;

			// return the 0 or 1 based on following status
			if ($is_following) { return 1; }
			else { return 0 ; }
			
		}
		else
		{
			return 0 ;
		}

	}

}
