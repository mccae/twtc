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

		for ($i=0 ; $i<1000 ; $i++)
		{
			$content = "" ;
			$word_count = rand(7 , 15) ;

			for ($j=0 ; $j<$word_count ; $j++)
			{
				$word = Str::random(10) ;
				$content = $content . " " . $word ;

				if (strlen($content) > 150)
				{
					$content = substr($content , 0 , 150) ;
					break ;
				}
			}
		
			DB::table('comments')->insert([
				'content' => $content ,
				'post_id' => rand(1, 300) ,
				'user_id' => rand(1 , 10) ,
			]) ;

		
		}

    }
}
