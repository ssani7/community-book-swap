<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/signin', [AuthController::class, 'signin']);

Route::middleware(('auth:sanctum'))->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/signout', [AuthController::class, 'signout']);
    Route::apiResource('/users', UserController::class);

});