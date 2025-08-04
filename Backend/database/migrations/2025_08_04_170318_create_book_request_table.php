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
        Schema::create('book_requests', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('requested_book_id')->constrained('books');
            $table->foreignId('swap_book_id')->constrained('books');
            $table->foreignId('book_owner_id')->constrained('books');
            $table->foreignId('requester_id')->constrained('books');
            $table->boolean('is_lend')->default(false);
            $table->date('requester_recieved_date')->nullable();
            $table->date('owner_recieved_date')->nullable();
            $table->enum('status', ['pending', 'rejected', 'accepted', 'swapped', 'cancelled'])->default('pending');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_request');
    }
};
