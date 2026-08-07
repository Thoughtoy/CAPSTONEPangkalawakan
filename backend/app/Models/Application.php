<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'graduate_profile_id',
        'internship_id',
        'application_date',
        'status',
        'remarks',
    ];

    protected $casts = [
        'application_date' => 'date',
    ];

    public function graduateProfile()
    {
        return $this->belongsTo(GraduateProfile::class);
    }

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function interview()
    {
        return $this->hasOne(Interview::class);
    }
}