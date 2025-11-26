<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

  protected $fillable = [
    'employee_code', 'name', 'email', 'phone', 'father_name', 'mother_name',
    'dob', 'marital_status', 'blood_group', 'religion', 'gender', 'height',
    'weight', 'nationality', 'national_id', 'passport_no', 'driving_license_no',
    'present_address', 'permanent_address', 'designation', 'job_title',
    'department', 'position', 'grade', 'unit_name', 'job_location', 'company',
    'joining_date', 'job_category', 'supervisor', 'salary', 'status', 'isSupervisor', 'is_user',
];

   protected $casts = [
    'salary' => 'decimal:2',
    'isSupervisor' => 'boolean',
    'joining_date' => 'date',
    'dob' => 'date',
     'is_user' => 'boolean', 
];

}
