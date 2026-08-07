<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'requested_skill',
        'reason',
        'status',
        'admin_remark',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}