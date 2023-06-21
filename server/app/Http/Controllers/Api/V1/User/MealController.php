<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Models\Meal;
use Illuminate\Http\Request;
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
        $meals = Meal::latest()->paginate();

        return MealResource::collection($meals);
    }

    /**
     * Display the specified resource.
     */
    public function show(Meal $meal)
    {
        return new MealResource($meal);
    }
}
