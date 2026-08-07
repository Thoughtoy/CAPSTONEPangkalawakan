<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InternshipSkill extends Model
{
    use HasFactory;

    protected $fillable = [
        'internship_id',
        'skill_id',
    ];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}