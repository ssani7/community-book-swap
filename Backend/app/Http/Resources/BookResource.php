<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'cover' => $this->cover,
            'author' => $this->author,
            'genre' => $this->genre,
            'publisher' => $this->publisher,
            'publishYear' => $this->publish_year,
            'edition' => $this->edition,
            'condition' => $this->condition,
            'description' => $this->description,
            'ownerThoughts' => $this->owner_thoughts,
            'createdAt' => $this->created_at,
            'ownerId' => $this->owner_id,
            'owner' => $this->owner->name ?? null,
        ];

    }
}