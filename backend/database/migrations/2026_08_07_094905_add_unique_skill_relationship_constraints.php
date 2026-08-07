<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('graduate_skills', function (Blueprint $table) {
            $table->unique(
                [
                    'graduate_profile_id',
                    'skill_id'
                ],
                'unique_graduate_skill'
            );
        });

        Schema::table('internship_skills', function (Blueprint $table) {
            $table->unique(
                [
                    'internship_id',
                    'skill_id'
                ],
                'unique_internship_skill'
            );
        });
    }


    public function down(): void
    {
        Schema::table('graduate_skills', function (Blueprint $table) {
            $table->dropUnique(
                'unique_graduate_skill'
            );
        });

        Schema::table('internship_skills', function (Blueprint $table) {
            $table->dropUnique(
                'unique_internship_skill'
            );
        });
    }
};