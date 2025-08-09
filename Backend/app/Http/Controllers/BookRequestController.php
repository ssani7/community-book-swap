<?php

namespace App\Http\Controllers;

use App\Models\BookRequest;
use App\Http\Requests\StoreBookRequestRequest;
use App\Http\Requests\UpdateBookRequestRequest;
use App\Models\Books;
use Illuminate\Http\Request;


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
        $rejected = $allRequests->where('status', 'rejected')->values();
        $accepted = $allRequests->where('status', 'accepted')->values();
        $lended = $allRequests->where('status', 'lended')->values();
        $swapped = $allRequests->where('status', 'swapped')->values();

        return response()->json([
            'pending' => $pending,
            'rejected' => $rejected,
            'accepted' => $accepted,
            'swapped' => $swapped,
            'lended' => $lended
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
    public function show($id)
    {
        $bookRequest = BookRequest::with([
            'bookOwner:id,name,email,photoURL,is_verified',
            'requester:id,name,email,photoURL,is_verified',
            'requestedBook:id,title,author,cover',
            'swapBook:id,title,author,cover',
        ])->find($id);

        if (!$bookRequest) {
            return response()->json(['error' => 'Book request not found.'], 404);
        }

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
            'return_date' => $bookRequest->return_date,
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
    public function update(Request $request, BookRequest $bookRequest)
    {
        // Only update status if status query parameter is present
        $status = request('status');
        $existingBookRequest = null;
        $request_id = $bookRequest->id;

        $swap = false;
        $lended = false;

        if ($status) {
            $validStatuses = ['pending', 'rejected', 'accepted', 'swapped', 'cancelled', 'returned', 'lended'];
            if (!in_array($status, $validStatuses)) {
                return response()->json(['error' => 'Invalid status value.'], 422);
            }
            $bookRequest->status = $status;
        }


        if ($request->owner_recieved_date != null || $request->requester_recieved_date != null) {
            $existingBookRequest = BookRequest::find($request_id);


            if ($request->owner_recieved_date != null) {
                $bookRequest->owner_recieved_date = $request->input('owner_recieved_date');
                $existingBookRequest->owner_recieved_date = $request->input('owner_recieved_date');
            }

            if ($request->requester_recieved_date != null) {
                $bookRequest->requester_recieved_date = $request->input('requester_recieved_date');
                $existingBookRequest->requester_recieved_date = $request->input('requester_recieved_date');

                $lended = $existingBookRequest->is_lend;
            }

            $swap = $existingBookRequest->requester_recieved_date != null && $existingBookRequest->owner_recieved_date != null;



            if ($swap) {
                $ownersBook = Books::find($bookRequest->requested_book_id);
                $ownersBook->owner_id = $bookRequest->requester_id;
                $ownersBook->swapped_from = $bookRequest->book_owner_id;

                $ownersBook->save();

                $requesterBook = Books::find($bookRequest->swap_book_id);
                $requesterBook->owner_id = $bookRequest->book_owner_id;
                $ownersBook->swapped_from = $bookRequest->requester_id;

                $requesterBook->save();

                $bookRequest->status = 'swapped';

            }

            if ($lended) {
                $bookRequest->status = 'lended';
            }


        }


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
