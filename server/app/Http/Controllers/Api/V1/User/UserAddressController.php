<?php

namespace App\Http\Controllers\Api\V1\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserAddressRequest;
use App\Http\Requests\UpdateUserAddressRequest;
use App\Http\Resources\UserAddressResource;
use App\Models\UserAddress;
use Illuminate\Support\Facades\DB;

/**
 * @group User endpoints
 */
class UserAddressController extends Controller
{
    /**
     * GET User Addresses
     *
     * Returns paginated list of user addresses.
     * 
     * @authenticated
     *
     * @queryParam page integer Page number. Example: 1
     *
     * @response {"data":{"id":"01h3hkhxrh15atksjr11hrck0d","user_id":"01h3hkhxrh15atksjr11hrck0d","house_number":0,"street":"Thomson Street","city":"New York","post_code":12345,"state":"New York STate","landmark":"On the mango tree","default":1}, ...}
     */
    public function index()
    {
        $userAddresses = auth()->user()->userAddresses()
            ->latest()
            ->paginate();

        return UserAddressResource::collection($userAddresses);
    }

    /**
     * POST User Address
     *
     * Creates a new User Address record.
     *
     * @authenticated
     *
     * @response {"data":{"id":"01h3hkhxrh15atksjr11hrck0d","user_id":"01h3hkhxrh15atksjr11hrck0d","house_number":0,"street":"Thomson Street","city":"New York","post_code":12345,"state":"New York STate","landmark":"On the mango tree","default":1}, ...}
     */
    public function store(StoreUserAddressRequest $request)
    {
        $userAddress = auth()->user()->userAddresses()->create($request->validated());

        // $userAddress = UserAddress::create($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * GET User Address
     *
     * Returns an User Address record.
     *
     * @authenticated
     *
     * @response {"data":{"id":"01h3hkhxrh15atksjr11hrck0d","user_id":"01h3hkhxrh15atksjr11hrck0d","house_number":0,"street":"Thomson Street","city":"New York","post_code":12345,"state":"New York STate","landmark":"On the mango tree","default":1}, ...}
     * @response 404 {"message":"Record not found."}
     */
    public function show(UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        return new UserAddressResource($userAddress);
    }

    /**
     * PUT User Address
     *
     * Updates User Address record.
     *
     * @authenticated
     *
     * @response {"data":{"id":"01h3hkhxrh15atksjr11hrck0d","meal_id":"01h3hkhxrh15atksjr11hrck0d","order_id":"01h3hkhxrh15atksjr11hrck0d","user_id":"01h3hkhxrh15atksjr11hrck0d","amount_due":55,"quantity_ordered":5}, ...}
     */
    public function update(UpdateUserAddressRequest $request, UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        $userAddress->update($request->validated());

        return new UserAddressResource($userAddress);
    }

    /**
     * DELETE User Address
     *
     * Deletes User Address record.
     * 
     * @authenticated
     *
     * @response 204 {}
     */
    public function destroy(UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        $userAddress->delete();

        return response()->noContent();
    }

    /**
     * PATCH User Address
     *
     * Makes User Address record default.
     *
     * @authenticated
     *
     * @response {"data":{"id":"01h3hkhxrh15atksjr11hrck0d","meal_id":"01h3hkhxrh15atksjr11hrck0d","order_id":"01h3hkhxrh15atksjr11hrck0d","user_id":"01h3hkhxrh15atksjr11hrck0d","amount_due":55,"quantity_ordered":5}, ...}
     */
    public function makeDefault(UserAddress $userAddress)
    {
        if ($userAddress->user_id != auth()->id()) {
            abort(403);
        }

        DB::transaction(function () use ($userAddress) {
            // $user = User::where('id', auth()->id())->first();
            // $oldDefaultUserAddress = $user->userAddresses()->where('default', true)->first();
            $oldDefaultUserAddress = UserAddress::where('default', true)
                ->where('user_id', auth()->id())
                ->first();

            if ($oldDefaultUserAddress) {
                $oldDefaultUserAddress->default = false;
                $oldDefaultUserAddress->save();
            }

            $userAddress->default = true;
            $userAddress->save();
        });

        return new UserAddressResource($userAddress);
    }
}
