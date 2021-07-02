<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CarController;
use App\Http\Controllers\Login;
use App\Http\Controllers\Logup;
use App\Http\Controllers\ManuController;
use App\Http\Controllers\SendMail;
use Illuminate\Support\Facades\Storage;


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::resource('cars', CarController::class);
Route::resource('manufacture', ManuController::class);
Route::get('cars/manu/{id}',[CarController::class,'getmanu']);
Route::post('check', function(Request $request){
    $file = $request->file('file');
    $name=$file->getClientOriginalName();
    $destinationPath=public_path('images');
    $file->move($destinationPath, $name);
    dd($file);
});
Route::post('logup',[Logup::class,'store']);
Route::put('logup',[Logup::class,'update']);
Route::post('login',[Login::class,'store']);
Route::get('logout',[Login::class,'logout']);
Route::post('sendmail',[SendMail::class,'store']);
