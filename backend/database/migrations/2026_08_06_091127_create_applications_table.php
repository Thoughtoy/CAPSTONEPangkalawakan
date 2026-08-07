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
        Schema::create('applications', function (Blueprint $table) {

    $table->id();

    $table->foreignId('graduate_profile_id')->constrained()->onDelete('cascade');

    $table->foreignId('internship_id')->constrained()->onDelete('cascade');

    $table->date('application_date');

    $table->enum('status', [
        'Pending',
        'Reviewed',
        'Interview',
        'Accepted',
        'Rejected'
    ])->default('Pending');

    $table->text('remarks')->nullable();

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
