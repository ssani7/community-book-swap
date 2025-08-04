<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'requested_book_id' => 'required|integer',
            'swap_book_id' => 'required|integer',
            'book_owner_id' => 'required|integer',
            'requester_id' => 'required|integer',
            'is_lend' => 'nullable|boolean',
            'requester_recieved_date' => 'nullable|date',
            'owner_recieved_date' => 'nullable|date',
            'status' => 'nullable|in:pending,rejected,accepted,swapped,cancelled',
        ];
    }
}
