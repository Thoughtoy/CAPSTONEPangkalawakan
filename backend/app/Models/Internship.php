<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internship extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'location',
        'setup',
        'duration',
        'allowance',
        'slots',
        'application_deadline',
        'status',
    ];

    protected $casts = [
        'application_deadline' => 'date',
        'allowance' => 'decimal:2',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function internshipSkills()
    {
        return $this->hasMany(InternshipSkill::class);
    }

    public function skills()
    {
        return $this->belongsToMany(
            Skill::class,
            'internship_skills'
        );
    }

    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}