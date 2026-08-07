<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GraduateSkill extends Model
{
    use HasFactory;

    protected $fillable = [
        'graduate_profile_id',
        'skill_id',
        'proficiency',
    ];

    public function graduateProfile()
    {
        return $this->belongsTo(GraduateProfile::class);
    }

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}