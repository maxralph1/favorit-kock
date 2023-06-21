<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(RegisterRequest $request)
    {
        $request->validated();

        // remove on production/publishing
        // $role = Role::create(['name' => 'generic-user']);

        $user = User::create([
            'username'     => $request->username,
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            // 'role_id' => $role->id, //remove on production/publishing
            'role_id' => Role::USER_ROLE,    //re-instate on production/publishing
        ]);

        event(new Registered($user));

        $device = substr($request->userAgent() ?? '', 0, 255);

        return response()->json([
            'access_token' => $user->createToken($device)->plainTextToken,
        ], Response::HTTP_CREATED);
    }
}
