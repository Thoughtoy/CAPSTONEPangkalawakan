<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'business_type',
        'description',
        'address',
        'contact_person',
        'contact_number',
        'email',
        'website',
        'logo',
        'status',
        'rejection_reason',
    ];

    // Company belongs to one user account
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Company can create many internships
    public function internships()
    {
        return $this->hasMany(Internship::class);
    }

    // Company can upload many verification documents
    public function documents()
    {
        return $this->hasMany(CompanyDocument::class);
    }
}