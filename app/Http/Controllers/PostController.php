<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Post ;
use App\Like ;
use App\User ;
use App\Comment ;

class PostController extends Controller
{
	
	public function index()
	{
		$user_id = Auth::user()->id ;
		return Post::where('user_id' , '=' , $user_id)->latest()->paginate(7) ;
		
	}

	public function create()
	{

	}

	public function store(Request $request)
	{
	}

	public function show($post_id)
	{
		$posts = Post::where('id' , '=' , $post_id)->get() ;
		$post = $posts[0] ;
		$comments = Comment::where('post_id' , '=' , $post_id)->paginate(7 , ['*'] , 'cp') ;

		return view('main/showPost' , [
			'post' => $post ,
			'comments' => $comments ,
		]) ;
		
	}


	public function storePost(Request $request)
	{
		$request->validate([
			'content' => 'required|max:300|min:20'
		]) ;

		$user_id = Auth::user()->id ;

		$post = new Post ;

		$post->content = $request->input('content') ;
		$post->user_id = $user_id ;

		if ($post->save())
		{
			return 1 ;
		}
		else
		{
			return 0 ;
		}
	}


	public function getIndexPost()
	{
		$user_id = Auth::user()->id ;
		$username = Auth::user()->username ;

		

		// get users following posts
		$posts = Post::join('users' , 'posts.user_id' , '=' , 'users.id')->  // join to users to get the username for each post
			join('follows' , 'posts.user_id' , '=' , 'follows.user_id')->  // join to follow to get followers id
			select('posts.user_id' , 'posts.content' , '.posts.id' , 'users.name' , 'users.profile_img')->
			where('follows.follower_id' , '=' , $user_id)->
			paginate(7) ;

		return $posts ;
	}


	// get likes count and username relation 
	public function getPostInfo(Request $request)
	{

		$request->validate([
			'postsId' => 'required' ,
		]) ;

		$post_id = $request->input('postsId') ;

		$likes_count =  Like::select('likes.post_id')->where('likes.post_id' , '=' , $post_id)->count() ;
		

		$commentsCount = Comment::where('post_id' , '=' , $post_id)->count() ;

		$info = [
			'likesCount' => $likes_count ,
			'commentsCount' => $commentsCount ,
		] ;

		return $info ;
	}



	public function deletePost(Request $request)
	{
		$post_id = $request->input('post_id') ;

		// removing post 
		$del_result = Post::where('id' , '=' , $post_id)->delete() ;

		return $del_result ;

		if ($del_result)
		{
			return 1 ;
		}
		else 
		{
			return 0 ;
		}
	}


	public function editPost(Request $request)
	{
		$request->validate([
			'content' => 'required|min:20|max:300' ,
			'post_id' => 'required' ,
		]) ;

		$post_id = $request->input('post_id') ;
		$content = $request->input('content') ;

		$post  =  Post::where('id' , '=' , $post_id) ;
		$post_count = $post->count() ;


		if ($post_count == 1)
		{
			$res = $post->update([
				'content' => $content ,
			]) ;

			// return 1 if edited else 0
			if ($res) { return 1 ; }
			else { return 0 ; }

		}
		else 
		{
			return 0 ; //no post found 
		}
	}



}
