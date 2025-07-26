<?php

namespace App\Http\Controllers;

use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function signup(Request $request)
    {
        $user_data = $request;

        $user = User::where('email', $user_data['email'])->first();

        if ($user) {
            return response()->json(['message' => 'User already exists'], 409);
        }


        $user = User::create([
            'name' => $user_data['name'],
            'email' => $user_data['email'],
            'phone' => $user_data['phone'],
            'firebaseId' => $user_data['firebaseId'],
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);


    }

    public function login(Request $request)
    {
        // Validate the request data
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (auth()->attempt($credentials)) {
            // Authentication passed, return a success response
            return response()->json(['message' => 'Login successful'], 200);
        }

        // Authentication failed, return an error response
        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}