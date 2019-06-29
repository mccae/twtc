<?php

use Illuminate\Database\Seeder;

class LikesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('likes')->insert([
			'user_id' => 1 ,
			'post_id' => 1 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 1 ,
			'post_id' => 2 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 1 ,
			'post_id' => 3 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 2 ,
			'post_id' => 4 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 2 ,
			'post_id' => 3 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 2 ,
			'post_id' => 5 
		]) ;

		DB::table('likes')->insert([
			'user_id' => 3 ,
			'post_id' => 1 
		]) ;


    }
}
