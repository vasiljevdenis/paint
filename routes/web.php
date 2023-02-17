<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Events\Canvas;

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
Route::get('/event', function () {
    event(new Canvas('Hello'));
});
Route::get('/maps/map{uniqid}', function ($uniqid) {
    if ($uniqid) {
        $res = DB::select('select * from canvas where uniqid = :uniqid', 
        ['uniqid' => $uniqid]);
    if (isset($res)) {
        // print_r($res);
        return view('canvas', ['data' => $res[0]->data, 'uniqid' => $uniqid]);
    }
    }
});
Route::post('/savecanv', function (Request $request) {
    if ($request->filled(['data', 'uniqid'])) {
        $count = DB::update('update canvas set data = :data, updated = CURRENT_TIMESTAMP() where uniqid = :uniqid', 
        ['data' => $request->input('data'), 'uniqid' => $request->input('uniqid')]);        
    if (isset($count)) {
        $token = $request->input('token');
        event(new Canvas($request->input('uniqid'), $token));
        return $count;
    }
    }
});
Route::post('/newcanv', function (Request $request) {
    if ($request->filled(['name', 'category', 'data'])) {
        $uniqid = uniqid();
        $count = DB::insert('insert into canvas (uniqid, name, category, data) values (:uniqid, :name, :category, :data)', 
        ['uniqid' => $uniqid, 'name' => $request->input('name'), 'category' => $request->input('category'), 'data' => $request->input('data')]);
    if (isset($count)) {
        return $uniqid;
    }
    }
});
Route::get('/getmap{uniqid}', function ($uniqid) {
    if (isset($uniqid)) {
        $res = DB::select('select data from canvas where uniqid = :uniqid', 
        ['uniqid' => $uniqid]);
    if (isset($res)) {
        return $res[0]->data;
    }
    }
});
