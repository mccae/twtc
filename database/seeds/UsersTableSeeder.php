<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    	DB::table('users')->insert([
			'name' => 'user1' ,
			'email' => 'user1@mail.com' ,
			'password' => bcrypt('pass1') ,
			'profile_img' => 'images/profile/user1.png' ,
		]) ;

		DB::table('users')->insert([
			'name' => 'user2' ,
			'email' => 'user2@mail.com' ,
			'password' => bcrypt('pass2') ,
			'profile_img' => 'images/profile/user2.jpg' ,
		]) ;

		DB::table('users')->insert([
			'name' => 'user3' ,
			'email' => 'user3@mail.com' ,
			'password' => bcrypt('pass3') ,
			'profile_img' => 'images/profile/user3.jpg' ,
		]) ;

		DB::table('users')->insert([
			'name' => 'user4' ,
			'email' => 'user4@mail.com' ,
			'password' => bcrypt('pass4') ,
		]) ;
    }
}
