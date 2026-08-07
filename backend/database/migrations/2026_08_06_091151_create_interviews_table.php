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
        Schema::create('interviews', function (Blueprint $table) {

    $table->id();

    $table->foreignId('application_id')->constrained()->onDelete('cascade');

    $table->enum('type', [
        'Online',
        'Face-to-Face'
    ]);

    $table->date('interview_date');

    $table->time('interview_time');

    $table->string('meeting_link')->nullable();

    $table->string('venue')->nullable();

    $table->enum('status', [
        'Scheduled',
        'Completed',
        'Cancelled'
    ])->default('Scheduled');

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('interviews');
    }
};
