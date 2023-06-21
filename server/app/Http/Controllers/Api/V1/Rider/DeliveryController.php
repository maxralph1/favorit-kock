<?php

namespace App\Http\Controllers\Api\V1\Rider;

use App\Models\Delivery;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\DeliveryResource;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deliveries = auth()->user()->deliveries()
            ->latest()
            ->paginate();

        return DeliveryResource::collection($deliveries);
    }

    /**
     * Display the specified resource.
     */
    public function show(Delivery $delivery)
    {
        if ($delivery->user_id != auth()->id()) {
            abort(403);
        }

        return new DeliveryResource($delivery);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Delivery $delivery)
    {
        if ($delivery->user_id != auth()->id()) {
            abort(403);
        }

        $delivery->update($request->validated());

        return new DeliveryResource($delivery);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Delivery $delivery)
    {
        if ($delivery->user_id != auth()->id()) {
            abort(403);
        }

        $delivery->delete();

        return response()->noContent();
    }
}
