<?php

namespace Tests\Unit;
use App\Http\Controllers\CarController;
use App\Models\cars;
use PHPUnit\Framework\TestCase;
use Faker\Factory as Faker;
use Illuminate\Http\Request;


class CarTest extends TestCase
{
    protected $car;
    
    public function setUp() : void
    {
        parent::setUp();
        $this->faker = Faker::create();
        // chuẩn bị dữ liệu test
        $this->car = [
            'name' => $this->faker->name(),
            'model'=> $this->faker->sentence(5),
            'img' => $this->faker->image('public/images',640,480,null,false),
            'mf_id'=>$this->faker->unique()->numberBetween(1,20),
            'created_at' => $this->faker->dateTime($max = 'now'),
            'updated_at' => $this->faker->dateTime($max = 'now'), 
        ];
        // khởi tạo lớp CategoryRepository
        $this->carcontroller = new CarController;
    }

    public function testStore()
    {
        
        $request = new Request($this->car);
        // Gọi hàm tạo
        $car = $this->carcontroller->store($request);
        // Kiểm tra xem kết quả trả về có là thể hiện của lớp Category hay không
        $this->assertInstanceOf(cars::class, $car);
        // Kiểm tra data trả về
        $this->assertEquals($this->category['name'], $car->name);
        $this->assertEquals($this->category['model'], $car->model);
        $this->assertEquals($this->category['mf_id'], $car->mf_id);
        
        // Kiểm tra dữ liệu có tồn tại trong cơ sở dữ liệu hay không
        // $this->assertDatabaseHas('cars', $car);
    }
}
