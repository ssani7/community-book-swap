<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'title',
        'author',
        'cover',
        'publisher',
        'publish_year',
        'owner_id',
    ];
}