<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('skill_requests', function (Blueprint $table) {

    $table->id();

    $table->foreignId('graduate_profile_id')->constrained()->onDelete('cascade');

    $table->string('requested_skill');

    $table->text('reason')->nullable();

    $table->enum('status', [
        'pending',
        'approved',
        'rejected'
    ])->default('pending');

    $table->text('admin_remark')->nullable();

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skill_requests');
    }
};
