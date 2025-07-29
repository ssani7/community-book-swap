<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookResource;
use App\Models\Books;
use Illuminate\Http\Request;
use function Laravel\Prompts\select;

class BooksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Books::join('users', 'books.owner_id', '=', 'users.id')
            ->select('books.*', 'users.name as owner')
            ->get();
        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $bookData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'cover' => 'required|string|max:255',
            'publisher' => 'nullable|string|max:255',
            'publish_year' => 'nullable|integer|max:255',
            'edition' => 'nullable|string|max:255',
            'created_at' => 'nullable|date',
            'owner_id' => 'required|integer|max:255',
        ]);

        $book = Books::create($bookData);

        return response()->json($book);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Books::with('owner')
            ->find($id);

        return new BookResource($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}