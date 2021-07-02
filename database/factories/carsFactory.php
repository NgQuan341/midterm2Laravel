<?php

namespace Database\Factories;
use App\Models\manufacture;
use App\Models\cars;
use Illuminate\Database\Eloquent\Factories\Factory;

class carsFactory extends Factory
{
    protected $model = cars::class;

    public function definition()
    {
        $manu = manufacture::pluck("id");
         return [
            'name' => $this->faker->name(),
            'model'=> $this->faker->sentence(5),
            'img' => $this->faker->image('public/images',640,480,null,false),
            'mf_id'=>$this->faker->randomElement($manu),
            'created_at' => $this->faker->dateTime($max = 'now'),
            'updated_at' => $this->faker->dateTime($max = 'now'), 
        ];
    }
}
