<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_reset_password()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->putJson('/api/v1/password-reset', [
            'current_password'      => 'password',
            'password'              => 'testing123',
            'password_confirmation' => 'testing123',
        ]);

        $response->assertStatus(202);
    }
}
