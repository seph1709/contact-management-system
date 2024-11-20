<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactsController;


Route::get("/",[ContactsController::class,"index"]);
Route::delete('/contact/delete/{id}', [ContactsController::class, 'destroy'])->name('id.destroy');
Route::post('/contact/add', [ContactsController::class, 'store'])->name('id.store');
Route::put('/contact/update/{id}', [ContactsController::class, 'update'])->name('id.update');
