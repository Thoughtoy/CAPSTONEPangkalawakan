<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | COMPANY
    |--------------------------------------------------------------------------
    */

    public function company()
    {
        return $this->hasOne(Company::class);
    }

    /*
    |--------------------------------------------------------------------------
    | GRADUATE PROFILE
    |--------------------------------------------------------------------------
    */

    public function graduateProfile()
    {
        return $this->hasOne(GraduateProfile::class);
    }

    /*
    |--------------------------------------------------------------------------
    | SKILL REQUESTS
    |--------------------------------------------------------------------------
    |
    | Both Graduate and Company users may request skills.
    |
    */

    public function skillRequests()
    {
        return $this->hasMany(SkillRequest::class);
    }

    /*
    |--------------------------------------------------------------------------
    | MESSAGES
    |--------------------------------------------------------------------------
    */

    public function sentMessages()
    {
        return $this->hasMany(
            Message::class,
            'sender_id'
        );
    }

    public function receivedMessages()
    {
        return $this->hasMany(
            Message::class,
            'receiver_id'
        );
    }

    /*
    |--------------------------------------------------------------------------
    | NOTIFICATIONS
    |--------------------------------------------------------------------------
    */

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }
}