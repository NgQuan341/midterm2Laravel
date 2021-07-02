<?php

namespace Database\Seeders;
use App\Models\manufacture;
use Illuminate\Database\Seeder;

class ManuSeeder extends Seeder
{
    public function run()
    {
        manufacture::factory()->count(3)->create();
    }
}
