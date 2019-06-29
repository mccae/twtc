<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/' , 'MainController@index') ;
Route::get('/u/{username}' , 'MainController@showUserPage') ;

Route::resource('/comment' , 'CommentController') ;

Route::resource('/post' , 'PostController') ;

Route::get('/storePost' , 'PostController@storePost') ;
Route::get('/deletePost' , 'PostController@deletePost') ;
Route::get('/editPost' , 'PostController@editPost') ;

Auth::routes();



Route::get('/test' , 'MainController@test') ;

Route::get('/manage' , 'ManageController@index') ;

Route::get('like/likeCount' , 'LikeController@likeCount') ;



// ___________________________

 // get posts that a user should see on their index page
Route::get('/getIndexPost' , 'PostController@getIndexPost')->middleware('apiAuth') ;
Route::get('/toggleLike' , 'LikeController@toggleLike')->middleware('apiAuth') ;
Route::get('/userDidLike' , 'LikeController@userDidLike')->middleware('apiAuth') ;
Route::get('/follow' , 'FollowController@follow')->middleware('apiAuth') ;
Route::get('/unFollow' , 'FollowController@unFollow')->middleware('apiAuth') ;



Route::get('/getPostInfo' , 'PostController@getPostInfo') ;
// get posts submited by user given username in request
Route::get('/getUsersPosts' , 'MainController@getUsersPosts') ;
Route::get('/getProfileImg' , 'UserController@getProfileImg') ;
Route::get('/getUsersCountsInfo' , 'UserController@getUsersCountsInfo') ;
Route::get('/userIsFollowing' , 'FollowController@userIsFollowing') ;



