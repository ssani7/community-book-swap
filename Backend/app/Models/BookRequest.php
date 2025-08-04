<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class BookRequest extends Model
{
    protected $fillable = [
        'requested_book_id',
        'swap_book_id',
        'book_owner_id',
        'requester_id',
        'is_lend',
        'requester_recieved_date',
        'owner_recieved_date',
        'status',
    ];

    // Book owner relationship
    public function bookOwner()
    {
        return $this->belongsTo(User::class, 'book_owner_id');
    }

    // Requester relationship
    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    // Requested book relationship
    public function requestedBook()
    {
        return $this->belongsTo(Books::class, 'requested_book_id');
    }

    // Swap book relationship
    public function swapBook()
    {
        return $this->belongsTo(Books::class, 'swap_book_id');
    }
}
