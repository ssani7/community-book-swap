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
        $query = BookRequest::with([
            'bookOwner:id,name,email,photoURL,is_verified',
            'requester:id,name,email,photoURL,is_verified',
            'requestedBook:id,title,author,cover',
            'swapBook:id,title,author,cover',
        ])
            ->when(request('book_owner_id'), fn($q, $bookOwnerId) => $q->where('book_owner_id', $bookOwnerId))
            ->when(request('requester_id'), fn($q, $requesterId) => $q->where('requester_id', $requesterId));

        $allRequests = $query->get();

        $pending = $allRequests->where('status', 'pending')->values();
        $cancelled = $allRequests->where('status', 'cancelled')->values();
        $accepted = $allRequests->where('status', 'accepted')->values();

        return response()->json([
            'pending' => $pending,
            'cancelled' => $cancelled,
            'accepted' => $accepted,
        ]);
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
        // Only update status if status query parameter is present
        $status = request('status');

        if (!$status) {
            return response()->json(['error' => 'Status query parameter is required.'], 400);
        }

        $validStatuses = ['pending', 'rejected', 'accepted', 'swapped', 'cancelled', 'returned'];
        if (!in_array($status, $validStatuses)) {
            return response()->json(['error' => 'Invalid status value.'], 422);
        }

        $bookRequest->status = $status;
        $bookRequest->save();

        return response()->json([
            'message' => 'Status updated successfully.',
            'book_request' => $bookRequest->fresh([
                'bookOwner:id,name,email,photoURL,is_verified',
                'requester:id,name,email,photoURL,is_verified',
                'requestedBook:id,title,author,cover',
                'swapBook:id,title,author,cover',
            ]),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BookRequest $bookRequest)
    {
        //
    }
}
