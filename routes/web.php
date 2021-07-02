<?php

use Illuminate\Support\Facades\Route;

Route::get('/{path?}', function () {
    return view('welcome');
})->where('path','.*');
// Route::get('test', function () {
//     return view('test');
// });