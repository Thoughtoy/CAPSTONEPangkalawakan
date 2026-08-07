<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('graduate_profiles', function (Blueprint $table) {
            $table->string('first_name')->after('user_id');
            $table->string('middle_name')->nullable()->after('first_name');
            $table->string('last_name')->after('middle_name');
            $table->string('contact_number')->after('last_name');
            $table->string('school')->after('contact_number');
            $table->string('course')->after('school');
            $table->year('graduation_year')->after('course');
            $table->text('bio')->nullable()->after('graduation_year');
            $table->string('resume')->nullable()->after('bio');
            $table->string('profile_picture')->nullable()->after('resume');
        });
    }

    public function down(): void
    {
        Schema::table('graduate_profiles', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};