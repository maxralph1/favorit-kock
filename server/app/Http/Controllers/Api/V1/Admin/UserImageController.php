<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\UserImage;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserImageResource;
use App\Http\Requests\StoreUserImageRequest;
use App\Http\Requests\UpdateUserImageRequest;

class UserImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userImages = UserImage::withTrashed()
            ->latest()
            ->paginate();

        return UserImageResource::collection($userImages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserImageRequest $request)
    {
        $userImage = UserImage::create($request->validated());

        return new UserImageResource($userImage);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserImage $userImage)
    {
        return new UserImageResource($userImage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserImageRequest $request, UserImage $userImage)
    {
        $userImage->update($request->validated());

        return new UserImageResource($userImage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserImage $userImage)
    {
        $userImage->delete();

        return response()->noContent();
    }
}
