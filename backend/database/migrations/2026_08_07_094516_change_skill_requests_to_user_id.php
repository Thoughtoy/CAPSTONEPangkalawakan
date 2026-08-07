<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | ADD USER_ID
        |--------------------------------------------------------------------------
        */

        Schema::table('skill_requests', function (Blueprint $table) {
            $table
                ->foreignId('user_id')
                ->nullable()
                ->after('id')
                ->constrained('users')
                ->cascadeOnDelete();
        });

        /*
        |--------------------------------------------------------------------------
        | TRANSFER EXISTING GRADUATE REQUESTS
        |--------------------------------------------------------------------------
        */

        DB::statement("
            UPDATE skill_requests sr
            INNER JOIN graduate_profiles gp
                ON sr.graduate_profile_id = gp.id
            SET sr.user_id = gp.user_id
        ");

        /*
        |--------------------------------------------------------------------------
        | MAKE USER_ID REQUIRED
        |--------------------------------------------------------------------------
        */

        DB::statement("
            ALTER TABLE skill_requests
            MODIFY user_id BIGINT UNSIGNED NOT NULL
        ");

        /*
        |--------------------------------------------------------------------------
        | REMOVE OLD GRADUATE-SPECIFIC RELATION
        |--------------------------------------------------------------------------
        */

        Schema::table('skill_requests', function (Blueprint $table) {
            $table->dropForeign([
                'graduate_profile_id'
            ]);

            $table->dropColumn(
                'graduate_profile_id'
            );
        });
    }


    public function down(): void
    {
        Schema::table('skill_requests', function (Blueprint $table) {
            $table
                ->foreignId('graduate_profile_id')
                ->nullable()
                ->after('id')
                ->constrained('graduate_profiles')
                ->cascadeOnDelete();
        });

        DB::statement("
            UPDATE skill_requests sr
            INNER JOIN graduate_profiles gp
                ON sr.user_id = gp.user_id
            SET sr.graduate_profile_id = gp.id
        ");

        Schema::table('skill_requests', function (Blueprint $table) {
            $table->dropForeign([
                'user_id'
            ]);

            $table->dropColumn('user_id');
        });
    }
};