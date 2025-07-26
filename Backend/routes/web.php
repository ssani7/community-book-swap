<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BooksController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::post('/api/signup', [AuthController::class, 'signup']);
Route::apiResource('/api/books', BooksController::class);