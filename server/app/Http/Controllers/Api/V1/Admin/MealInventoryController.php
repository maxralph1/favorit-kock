<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\MealInventory;
use App\Http\Controllers\Controller;
use App\Http\Resources\MealInventoryResource;
use App\Http\Requests\StoreMealInventoryRequest;
use App\Http\Requests\UpdateMealInventoryRequest;

class MealInventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mealInventories = MealInventory::withTrashed()
            ->latest()
            ->paginate();

        return MealInventoryResource::collection($mealInventories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMealInventoryRequest $request)
    {
        $mealInventory = MealInventory::create($request->validated());

        return new MealInventoryResource($mealInventory);
    }

    /**
     * Display the specified resource.
     */
    public function show(MealInventory $mealInventory)
    {
        return new MealInventoryResource($mealInventory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMealInventoryRequest $request, MealInventory $mealInventory)
    {
        $mealInventory->update($request->validated());

        return new MealInventoryResource($mealInventory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MealInventory $mealInventory)
    {
        $mealInventory->delete();

        return response()->noContent();
    }
}
