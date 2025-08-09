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
    public function index(Request $request)
    {
        $ownerId = $request->query('owner_id');
        $perPage = $request->query('per_page');
        $search = $request->query('search'); // Get search query

        $query = Books::join('users', 'books.owner_id', '=', 'users.id')
            ->select('books.*', 'users.name as owner')
            ->when($ownerId, function ($query, $ownerId) {
                return $query->where('books.owner_id', $ownerId);
            })
            ->when($search, function ($query, $search) {
                return $query->where(function ($q) use ($search) {
                    $q->where('books.title', 'like', "%$search%")
                        ->orWhere('books.author', 'like', "%$search%");
                });
            });

        if ($perPage) {
            // Return paginated results
            $books = $query->paginate((int) $perPage);
        } else {
            // Return all results
            $books = $query->get();
        }

        return response()->json($books);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $bookData = $request->validate([
            'title' => 'required|string|max:255',
            'cover' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'genre' => 'nullable|string|max:255',
            'condition' => 'nullable|string|max:255',
            'description' => 'nullable|string|max:1000',
            'owner_thoughts' => 'nullable|string|max:1000',
            'publisher' => 'nullable|string|max:255',
            'publish_year' => 'nullable|integer|max:3000',
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