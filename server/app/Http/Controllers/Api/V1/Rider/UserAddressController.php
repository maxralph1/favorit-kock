<?php

namespace App\Http\Controllers\Api\V1\Rider;

use App\Models\UserAddress;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserAddressResource;
use App\Http\Requests\StoreUserAddressRequest;
use App\Http\Requests\UpdateUserAddressRequest;

class UserAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userAddresses = auth()->user()->userAddresses()
            ->latest()
            ->paginate();

        return UserAddressResource::collection($userAddresses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserAddressRequest $request)
    {
        $userAddress = auth()->user()->userAddresses()->create($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        return new UserAddressResource($userAddress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserAddressRequest $request, UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        $userAddress->update($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        $userAddress->delete();

        return response()->noContent();
    }
}
