<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User ;
use App\Post ;
use App\Like ;
use App\Follow ;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

	// get profile image string to load on frontend , 
	// userId show the id of users to get image
	// if userId == 'logged' means get image for the currntly logged in user
	public function getProfileImg(Request $request)
	{
		$request->validate([
			'userId' => 'required'
		]) ;

		$user_id = $request->input('userId') ;

		// get user id for the logged in user
		if ($user_id == 'logged')
		{
			if (Auth::check())
			{
				$user_id = Auth::user()->id ;
			}
		}


		// find user with there id and get profile image row 
		$user_image_raw = User::where('id' , '=' , $user_id)->select('profile_img')->first() ;
		$profile_img = $user_image_raw->profile_img ;

		return $profile_img ;
		
	}


	// send information about users info count (likes count...)
	public function getUsersCountsInfo(Request $request)
	{

		$counts = [
			'likes' => 0 , 
			'followers' => 0 ,
			'followings' => 0 ,
			'twts' => 0 ,
			'liked' => 0 ,
		] ;


		$request->validate([
			'userId' => 'required'
		]); 

		$user_id = $request->input('userId') ;

		$userRaw = User::where('id' , '=' , $user_id) ;

		// check if the uesr with this id exist
		if ($userRaw->count())
		{

			$twts = Post::where('user_id' , '=' , $user_id)->count() ; 
			$followers = Follow::where('user_id' , '=' ,  $user_id)->count()  ;
			$followings = Follow::where('follower_id' , '=' , $user_id)->count() ;
			$likes = Like::where('user_id' , '=' , $user_id)->count() ;
			$liked = Like::join('posts' , 'likes.post_id' , '=' , 'posts.id')->where('posts.user_id' , '=' , $user_id)->count() ; 
			

			$counts['twts'] = $twts ;
			$counts['followers'] = $followers ;
			$counts['followings'] = $followings ;
			$counts['liked'] = $liked ;
			$counts['likes'] = $likes ;


		}
		else
		{
			return response('user not found' , 404) ;
		}

		
		return $counts ;

	}


}
