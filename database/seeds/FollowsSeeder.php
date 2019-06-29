<?php

use Illuminate\Database\Seeder;

class FollowsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
		DB::table('follows')->insert([
			'user_id' => 1 ,
			'follower_id' => 2 
		]) ;

		DB::table('follows')->insert([
			'user_id' => 1 ,
			'follower_id' => 3 
		]) ;

		DB::table('follows')->insert([
			'user_id' => 1 ,
			'follower_id' => 4 
		]) ;


    }
}
