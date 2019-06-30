<?php

use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

		// create posts with random info
		for ($i=0 ; $i<300 ; $i++)
		{

			$content = "" ;

			$word_count = rand(10 , 40) ;

			for ($j=0 ; $j<$word_count ; $j++)
			{
				$word = Str::random(10) ;
				$content = $content . " " . $word ;

				if (strlen($content) > 250)
				{
					$content = substr($content , 0 , 250) ;
					break ;
				}
			}
			

			DB::table('posts')->insert([
				'content' =>  $content,
				'user_id' => rand(0 , 10) ,
			]) ;
		}


	}
}
