<?php

namespace Database\Seeders;
// use App\Models\manufacture;
use Illuminate\Database\Seeder;
use App\Models\cars;
use Illuminate\Database\Factories\carsFactory;
// use Faker\Factory as Faker;
class CarSeeder extends Seeder
{
    public function run()
    {
        // $faker = Faker::create();
        // $manu = manufacture::pluck("id");
        // foreach (range(1,20) as $index){
        //     $car = cars::create([
        //         'name' => $faker->name(),
        //         'model'=> $faker->sentence(5),
        //         'img' => $faker->image('public/images',640,480, null, false),
        //         'mf_id'=>$faker->randomElement($manu),
        //         'created_at' => $faker->dateTime($max = 'now'),
        //         'updated_at' => $faker->dateTime($max = 'now'), 
        //         ]);
        // }
        cars::factory()->count(6)->create();
    }
}
