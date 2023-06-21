<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\UserAddress;
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
        $userAddresses = UserAddress::withTrashed()
            ->latest()
            ->paginate();

        return UserAddressResource::collection($userAddresses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserAddressRequest $request)
    {
        $userAddress = UserAddress::create($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAddress $userAddress)
    {
        return new UserAddressResource($userAddress);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserAddressRequest $request, UserAddress $userAddress)
    {
        $userAddress->update($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAddress $userAddress)
    {
        $userAddress->delete();

        return response()->noContent();
    }
}
