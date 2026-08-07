<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraduateProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'middle_name',
        'last_name',
        'contact_number',
        'school',
        'course',
        'graduation_year',
        'bio',
        'resume',
        'profile_picture',
    ];

    /*
    |--------------------------------------------------------------------------
    | USER
    |--------------------------------------------------------------------------
    */

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /*
    |--------------------------------------------------------------------------
    | GRADUATE SKILLS
    |--------------------------------------------------------------------------
    */

    public function skills()
    {
        return $this->hasMany(
            GraduateSkill::class
        );
    }

    /*
    |--------------------------------------------------------------------------
    | APPLICATIONS
    |--------------------------------------------------------------------------
    */

    public function applications()
    {
        return $this->hasMany(
            Application::class
        );
    }
}