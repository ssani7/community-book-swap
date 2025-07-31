<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('cover');
            $table->string('publisher')->nullable();
            $table->integer('publish_year')->nullable();
            $table->string('edition')->nullable();
            $table->string('condition')->nullable();
            $table->string('genre')->nullable();
            $table->string('description')->nullable();
            $table->string('ownersThoughts')->nullable();
            $table->foreignId('owner_id')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};