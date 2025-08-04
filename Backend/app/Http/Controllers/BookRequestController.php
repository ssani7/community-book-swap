<?php

namespace App\Http\Controllers;

use App\Models\BookRequest;
use App\Http\Requests\StoreBookRequestRequest;
use App\Http\Requests\UpdateBookRequestRequest;

class BookRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bookRequests = BookRequest::with([
            'bookOwner:id,name,email,photoURL',
            'requester:id,name,email,photoURL',
            'requestedBook:id,title,author,cover',
            'swapBook:id,title,author,cover',
        ])
            ->when(request('book_owner_id'), fn($query, $bookOwnerId) => $query->where('book_owner_id', $bookOwnerId))
            ->when(request('requester_id'), fn($query, $requesterId) => $query->where('requester_id', $requesterId))
            ->get();

        return response()->json($bookRequests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookRequestRequest $request)
    {
        $bookRequestData = $request->validated();

        $bookRequest = BookRequest::create($bookRequestData);

        return response()->json($bookRequest);
    }

    /**
     * Display the specified resource.
     */
    public function show(BookRequest $bookRequest)
    {
        $bookRequest->load([
            'bookOwner:id,name,email',
            'requester:id,name,email',
            'requestedBook:id,title,author',
            'swapBook:id,title,author',
        ]);

        return response()->json([
            'id' => $bookRequest->id,
            'requested_book_id' => $bookRequest->requested_book_id,
            'swap_book_id' => $bookRequest->swap_book_id,
            'book_owner_id' => $bookRequest->book_owner_id,
            'requester_id' => $bookRequest->requester_id,
            'is_lend' => $bookRequest->is_lend,
            'requester_recieved_date' => $bookRequest->requester_recieved_date,
            'owner_recieved_date' => $bookRequest->owner_recieved_date,
            'status' => $bookRequest->status,
            'book_owner' => $bookRequest->bookOwner,
            'requester' => $bookRequest->requester,
            'requested_book' => $bookRequest->requestedBook,
            'swap_book' => $bookRequest->swapBook,
            'created_at' => $bookRequest->created_at,
            'updated_at' => $bookRequest->updated_at,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BookRequest $bookRequest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBookRequestRequest $request, BookRequest $bookRequest)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookRequest $bookRequest)
    {
        //
    }
}
