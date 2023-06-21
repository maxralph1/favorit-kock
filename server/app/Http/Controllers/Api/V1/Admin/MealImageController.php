<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\MealImage;
use App\Http\Controllers\Controller;
use App\Http\Resources\MealImageResource;
use App\Http\Requests\StoreMealImageRequest;
use App\Http\Requests\UpdateMealImageRequest;

class MealImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mealImages = MealImage::withTrashed()
            ->latest()
            ->paginate();

        return MealImageResource::collection($mealImages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMealImageRequest $request)
    {
        $mealImage = MealImage::create($request->validated());

        return new MealImageResource($mealImage);
    }

    /**
     * Display the specified resource.
     */
    public function show(MealImage $mealImage)
    {
        return new MealImageResource($mealImage);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMealImageRequest $request, MealImage $mealImage)
    {
        $mealImage->update($request->validated());

        return new MealImageResource($mealImage);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MealImage $mealImage)
    {
        $mealImage->delete();

        return response()->noContent();
    }
}
