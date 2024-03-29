<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CommentsTableSeeder::class);
        $this->call(PostsTableSeeder::class);
		$this->call(FollowsSeeder::class) ;
		$this->call(LikesSeeder::class) ;
    }
}
