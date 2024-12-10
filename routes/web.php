<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactController;


Route::get("/",[ContactController::class,"index"]);
Route::get("/register",[ContactController::class,"register"]);
Route::get("/login",[ContactController::class,"login"]);
Route::get("/workplace",[ContactController::class,"workplace"]);
Route::get("/about",[ContactController::class,"about"]);
