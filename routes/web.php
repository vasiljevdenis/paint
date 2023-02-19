<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
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
    $res = DB::select('select * from maps');
    $mapped = array_count_values(Arr::map($res, function ($el) {
        return $el->category;
    }));
    $mapped = Arr::sort($mapped, function ($el) {
        return $el;
    });
    return view('welcome', ['data' => $res, 'count' => $mapped]);
});
Route::get('/maps/map{uniqid}', function ($uniqid) {
    if ($uniqid) {
        $res = DB::select('select * from canvas where uniqid = :uniqid', 
        ['uniqid' => $uniqid]);
    if (isset($res)) {
        return view('canvas', ['data' => $res[0]->data, 'uniqid' => $uniqid]);
    }
    }
});
Route::post('/savecanv', function (Request $request) {
    if ($request->filled(['data', 'uniqid'])) {
        $count = DB::update('update canvas set data = :data where uniqid = :uniqid', 
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
Route::get('/newmap', function () {
    $res = DB::select('select * from maps');
    $res = Arr::sort($res, function ($value) {
        return $value->category;
    });
    return view('newmap', ['data' => $res]);
});
Route::post('/removemap', function (Request $request) {
    $deleted = DB::delete('delete from maps where id = :id', ['id' => $request->input('id')]);
    if (isset($deleted)) {
        return $deleted;
    }
});
Route::post('/createmap', function (Request $request) {
    if ($request->filled(['name', 'category'])) {
        Storage::makeDirectory('/public/images/maps/'.$request->input('category'));
        $path = $request->bg->storeAs('/public/images/maps/'.$request->input('category'), $request->input('name').'.'.$request->bg->extension());
        $bg = '/storage/images/maps/'.$request->input('category').'/'.$request->input('name').'.'.$request->bg->extension();
        $img = getimagesize($request->bg);
        $width = $img[0];
        $height = $img[1];
        $count = DB::insert('insert into maps (category, name, bg, width, height) values (:category, :name, :bg, :width, :height)', 
        ['category' => $request->input('category'), 'name' => $request->input('name'), 'bg' => $bg, 'width' => $width, 'height' => $height]);
    if (isset($count)) {
        return $count;
    }
    }
});
