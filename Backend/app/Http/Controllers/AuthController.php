<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function signup(SignUpRequest $request)
    {
        $user_data = $request;

        $user = User::where('email', $user_data['email'])->first();
        error_log($user_data);

        if ($user) {
            return response()->json(['message' => 'User already exists'], 409);
        }


        $user = User::create([
            'name' => $user_data['name'],
            'email' => $user_data['email'],
            'phone' => $user_data['phone'],
            'firebaseId' => $user_data['firebaseId'],
            'password' => bcrypt($user_data['password']),
        ]);

        error_log($user);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token
        ], 201);


    }

    public function signin(LoginRequest $request)
    {
        // Validate the request data
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Attempt to authenticate the user
        if (!auth()->attempt($credentials)) {
            // Authentication failed, return an error response
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;
        // Authentication passed, return a success response
        return response(compact('user', 'token'), 200);

    }

    public function signout(LoginRequest $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 200);

    }
}