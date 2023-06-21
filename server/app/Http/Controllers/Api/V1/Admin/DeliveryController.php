<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Models\Delivery;
use App\Http\Controllers\Controller;
use App\Http\Resources\DeliveryResource;
use App\Http\Requests\StoreDeliveryRequest;
use App\Http\Requests\UpdateDeliveryRequest;

class DeliveryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deliveries = Delivery::withTrashed()
            ->latest()
            ->paginate();

        return DeliveryResource::collection($deliveries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeliveryRequest $request)
    {
        $delivery = Delivery::create($request->validated());

        return new DeliveryResource($delivery);
    }

    /**
     * Display the specified resource.
     */
    public function show(Delivery $delivery)
    {
        return new DeliveryResource($delivery);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDeliveryRequest $request, Delivery $delivery)
    {
        $delivery->update($request->validated());

        return new DeliveryResource($delivery);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Delivery $delivery)
    {
        $delivery->delete();

        return response()->noContent();
    }
}
