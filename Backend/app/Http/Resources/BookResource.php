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
            'author' => $this->author,
            'cover' => $this->cover,
            'publishYear' => $this->publish_year,
            'publisher' => $this->publisher,
            'edition' => $this->edition,
            'condition' => $this->condition,
            'createdAt' => $this->created_at,
            'ownerId' => $this->owner_id,
            'owner' => $this->owner->name ?? null,
        ];

    }
}