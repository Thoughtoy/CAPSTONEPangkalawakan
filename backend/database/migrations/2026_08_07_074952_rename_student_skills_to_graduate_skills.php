<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('student_skills', 'graduate_skills');
    }

    public function down(): void
    {
        Schema::rename('graduate_skills', 'student_skills');
    }
};