<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/maps/dota', function () {
    return view('canvas', ['bg' => '/images/maps/dota2/dota2.jpg']);
});
Route::get('/maps/cs', function () {
    return view('canvas', ['bg' => '/images/maps/CS/inferno.jpg']);
});
