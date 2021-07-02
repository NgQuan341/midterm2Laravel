<?php

namespace Database\Factories;

use App\Models\manufacture;
use Illuminate\Database\Eloquent\Factories\Factory;

class manufactureFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = manufacture::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'created_at' => $this->faker->dateTime($max = 'now'),
            'updated_at' => $this->faker->dateTime($max = 'now'), 
        ];
    }
}
