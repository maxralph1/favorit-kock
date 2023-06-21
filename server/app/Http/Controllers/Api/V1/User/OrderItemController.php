<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\OrderItemResource;
use App\Http\Requests\StoreOrderItemRequest;
use App\Http\Requests\UpdateOrderItemRequest;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orderItems = auth()->user()->orderItems()
            ->latest()
            ->paginate();

        return OrderItemResource::collection($orderItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderItemRequest $request)
    {
        $orderItem = OrderItem::create($request->validated());

        return new OrderItemResource($orderItem);
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem)
    {
        if ($orderItem->user_id != auth()->id()) {
            abort(403);
        }

        return new OrderItemResource($orderItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderItemRequest $request, OrderItem $orderItem)
    {
        if ($orderItem->user_id != auth()->id()) {
            abort(403);
        }

        $orderItem->update($request->validated());

        return new OrderItemResource($orderItem);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        if ($orderItem->user_id != auth()->id()) {
            abort(403);
        }

        $orderItem->delete();

        return response()->noContent();
    }
}
