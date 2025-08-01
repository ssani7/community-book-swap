<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    protected $fillable = [
        'title',
        'cover',
        'author',
        'genre',
        'publisher',
        'publish_year',
        'edition',
        'condition',
        'description',
        'owner_thoughts',
        'created_at',
        'owner_id',
    ];

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

}