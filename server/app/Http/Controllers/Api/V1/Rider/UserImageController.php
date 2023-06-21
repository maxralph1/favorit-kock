<?php

namespace App\Http\Controllers\Api\V1\Rider;

use App\Models\UserImage;
use Illuminate\Http\Request;
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
        $userImage = auth()->user()->userImage()
            ->latest()
            ->paginate();

        return UserImageResource::collection($userImage);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserImageRequest $request)
    {
        $userImage = auth()->user()->userImage()->create($request->validated());

        // $userImage = UserImage::create($request->validated());

        return new UserImageResource($userImage);
    }

    /**
     * Display the specified resource.
     */
    public function show(UserImage $userImage)
    {
        if ($userImage->user_id != auth()->id()) {
            abort(403);
        }

        return new UserImageResource($userImage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserImageRequest $request, UserImage $userImage)
    {
        if ($userImage->user_id != auth()->id()) {
            abort(403);
        }

        $userImage->update($request->validated());

        return new UserImageResource($userImage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserImage $userImage)
    {
        if ($userImage->user_id != auth()->id()) {
            abort(403);
        }

        $userImage->delete();

        return response()->noContent();
    }
}
