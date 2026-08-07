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
        Schema::create('internships', function (Blueprint $table) {

    $table->id();

    $table->foreignId('company_id')->constrained()->onDelete('cascade');

    $table->string('title');

    $table->text('description');

    $table->string('location');

    $table->enum('setup', [
        'On-site',
        'Hybrid',
        'Remote'
    ]);

    $table->string('duration');

    $table->decimal('allowance',10,2)->nullable();

    $table->integer('slots');

    $table->date('application_deadline');

    $table->enum('status', [
        'Open',
        'Closed'
    ])->default('Open');

    $table->timestamps();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internships');
    }
};
