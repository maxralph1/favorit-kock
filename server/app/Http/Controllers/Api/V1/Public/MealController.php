<?php

namespace App\Http\Controllers\Api\V1\Public;

use App\Models\Meal;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\MealResource;

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
