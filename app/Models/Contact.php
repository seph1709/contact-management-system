<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    /** @use HasFactory<\Database\Factories\ContactFactory> */
    use HasFactory;


    protected $fillable = [
        'name',
        'lastname',
        'address',
        'number',
        'email',
        'relationship'

    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
