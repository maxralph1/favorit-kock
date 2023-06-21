<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Meal;
use App\Http\Controllers\Controller;
use App\Http\Resources\MealResource;
use App\Http\Requests\StoreMealRequest;
use App\Http\Requests\UpdateMealRequest;

class MealController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $meals = Meal::withTrashed()
            ->latest()
            ->paginate();

        return MealResource::collection($meals);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMealRequest $request)
    {
        $meal = Meal::create($request->validated());

        return new MealResource($meal);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return new MealResource($meal);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMealRequest $request, Meal $meal)
    {
        $meal->update($request->validated());

        return new MealResource($meal);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meal $meal)
    {
        $meal->delete();

        return response()->noContent();
    }
}
