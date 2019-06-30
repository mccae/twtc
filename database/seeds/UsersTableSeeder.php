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

		DB::table('users')->insert([
			'name' => 'user5' ,
			'email' => 'user5@mail.com' ,
			'password' => bcrypt('pass5') ,
		]) ;


		DB::table('users')->insert([
			'name' => 'user6' ,
			'email' => 'user6@mail.com' ,
			'password' => bcrypt('pass6') ,
		]) ;


		DB::table('users')->insert([
			'name' => 'user7' ,
			'email' => 'user7@mail.com' ,
			'password' => bcrypt('pass7') ,
		]) ;


		DB::table('users')->insert([
			'name' => 'user8' ,
			'email' => 'user8@mail.com' ,
			'password' => bcrypt('pass8') ,
		]) ;


		DB::table('users')->insert([
			'name' => 'user9' ,
			'email' => 'user9@mail.com' ,
			'password' => bcrypt('pass9') ,
		]) ;


		DB::table('users')->insert([
			'name' => 'user10' ,
			'email' => 'user10@mail.com' ,
			'password' => bcrypt('pass10') ,
		]) ;



    }
}
