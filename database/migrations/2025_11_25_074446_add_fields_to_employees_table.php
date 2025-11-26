<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('employees', function (Blueprint $table) {
            if (!Schema::hasColumn('employees', 'employee_code')) {
                $table->string('employee_code')->nullable()->index();
            }
            if (!Schema::hasColumn('employees', 'father_name')) {
                $table->string('father_name')->nullable();
            }
            if (!Schema::hasColumn('employees', 'mother_name')) {
                $table->string('mother_name')->nullable();
            }
            if (!Schema::hasColumn('employees', 'dob')) {
                $table->date('dob')->nullable();
            }
            if (!Schema::hasColumn('employees', 'marital_status')) {
                $table->string('marital_status')->nullable();
            }
            if (!Schema::hasColumn('employees', 'blood_group')) {
                $table->string('blood_group')->nullable();
            }
            if (!Schema::hasColumn('employees', 'religion')) {
                $table->string('religion')->nullable();
            }
            if (!Schema::hasColumn('employees', 'gender')) {
                $table->string('gender')->nullable();
            }
            if (!Schema::hasColumn('employees', 'height')) {
                $table->string('height')->nullable();
            }
            if (!Schema::hasColumn('employees', 'weight')) {
                $table->string('weight')->nullable();
            }
            if (!Schema::hasColumn('employees', 'nationality')) {
                $table->string('nationality')->nullable();
            }
            if (!Schema::hasColumn('employees', 'national_id')) {
                $table->string('national_id')->nullable();
            }
            if (!Schema::hasColumn('employees', 'passport_no')) {
                $table->string('passport_no')->nullable();
            }
            if (!Schema::hasColumn('employees', 'driving_license_no')) {
                $table->string('driving_license_no')->nullable();
            }
            if (!Schema::hasColumn('employees', 'present_address')) {
                $table->text('present_address')->nullable();
            }
            if (!Schema::hasColumn('employees', 'permanent_address')) {
                $table->text('permanent_address')->nullable();
            }
            if (!Schema::hasColumn('employees', 'designation')) {
                $table->string('designation')->nullable();
            }
            if (!Schema::hasColumn('employees', 'department')) {
                $table->string('department')->nullable();
            }
            if (!Schema::hasColumn('employees', 'position')) {
                $table->string('position')->nullable();
            }
            if (!Schema::hasColumn('employees', 'grade')) {
                $table->string('grade')->nullable();
            }
            if (!Schema::hasColumn('employees', 'unit_name')) {
                $table->string('unit_name')->nullable();
            }
            if (!Schema::hasColumn('employees', 'job_location')) {
                $table->string('job_location')->nullable();
            }
            if (!Schema::hasColumn('employees', 'company')) {
                $table->string('company')->nullable();
            }
            if (!Schema::hasColumn('employees', 'joining_date')) {
                $table->date('joining_date')->nullable();
            }
            if (!Schema::hasColumn('employees', 'job_category')) {
                $table->string('job_category')->nullable();
            }
            if (!Schema::hasColumn('employees', 'supervisor')) {
                $table->string('supervisor')->nullable()->default('-');
            }
            if (!Schema::hasColumn('employees', 'salary')) {
                $table->decimal('salary', 10, 2)->nullable()->default(0);
            } else {
                // ensure salary has sensible default (optional)
                // cannot change nullability if DB has incompatible rows without plan
            }
            if (!Schema::hasColumn('employees', 'status')) {
                $table->string('status')->nullable()->default('Active');
            }
            if (!Schema::hasColumn('employees', 'isSupervisor')) {
                $table->boolean('isSupervisor')->default(false);
            }
        });
    }

    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            // Be careful: dropping columns loses data. Uncomment if you want to rollback and remove columns.
            // $table->dropColumn([
            //     'employee_code','father_name','mother_name','dob','marital_status','blood_group','religion','gender',
            //     'height','weight','nationality','national_id','passport_no','driving_license_no','present_address',
            //     'permanent_address','designation','department','position','grade','unit_name','job_location','company',
            //     'joining_date','job_category','supervisor','status','isSupervisor'
            // ]);
        });
    }
};
