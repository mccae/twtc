<?php

use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
	
		DB::table('comments')->insert([
			'content' => 'this is a comment' ,
			'post_id' => 3 ,
		]) ;

		DB::table('comments')->insert([
			'content' => 'thi secod coments is a comment' ,
			'post_id' => 3 ,
		]) ;

		DB::table('comments')->insert([
			'content' => 'comment nls jdlsfj sdkj ' ,
			'post_id' => 2 ,
		]) ;

		DB::table('comments')->insert([
			'content' => 'this is a comment' ,
			'post_id' => 2 ,
		]) ;

		DB::table('comments')->insert([
			'content' => 'this is a comment' ,
			'post_id' => 1 ,
		]) ;




    }
}
