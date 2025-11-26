<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $perPage = 10;

        $employees = Employee::orderBy('created_at', 'desc')
            ->paginate($perPage)
            ->withQueryString();

        $recentEmployees = Employee::orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id','name','job_title']);

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'recentEmployees' => $recentEmployees,
            'employeeCount' => Employee::count(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'employee_code' => ['nullable','string','max:50'],
            'name' => ['required','string','max:255'],
            'email' => ['nullable','email','max:255'],
            'phone' => ['nullable','string','max:50'],
            'father_name' => ['nullable','string','max:255'],
            'mother_name' => ['nullable','string','max:255'],
            'dob' => ['nullable','date'],
            'marital_status' => ['nullable','string','max:50'],
            'blood_group' => ['nullable','string','max:10'],
            'religion' => ['nullable','string','max:100'],
            'gender' => ['nullable','string','max:20'],
            'height' => ['nullable','string','max:20'],
            'weight' => ['nullable','string','max:20'],
            'nationality' => ['nullable','string','max:100'],
            'national_id' => ['nullable','string','max:100'],
            'passport_no' => ['nullable','string','max:100'],
            'driving_license_no' => ['nullable','string','max:100'],
            'present_address' => ['nullable','string'],
            'permanent_address' => ['nullable','string'],
            'designation' => ['nullable','string','max:100'],
            'job_title' => ['nullable','string','max:100'],
            'department' => ['nullable','string','max:100'],
            'position' => ['nullable','string','max:100'],
            'grade' => ['nullable','string','max:50'],
            'unit_name' => ['nullable','string','max:100'],
            'job_location' => ['nullable','string','max:100'],
            'company' => ['nullable','string','max:100'],
            'joining_date' => ['nullable','date'],
            'job_category' => ['nullable','string','max:50'],
            'supervisor' => ['nullable','string','max:255'],
            'salary' => ['nullable','numeric'],
            'status' => ['nullable','string','max:50'],
            'isSupervisor' => ['nullable','boolean'],
            'is_user' => ['nullable','boolean'],
        ]);

        // defaults
        $data['status'] = $data['status'] ?? 'Active';
        $data['supervisor'] = $data['supervisor'] ?? '-';
        $data['salary'] = $data['salary'] ?? 0;
        $data['is_user'] = (bool) ($data['is_user'] ?? false);

        // save employee
        $employee = Employee::create($data);

        // user account creation
        if ($data['is_user'] && !empty($data['email'])) {
            $existing = User::where('email', $data['email'])->first();

            if (!$existing) {
                User::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'password' => Hash::make(Str::random(10)),
                ]);
            }
        }

        return Redirect::route('employees.index')
            ->with('success', 'Employee created.');
    }

    public function show(Employee $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => $employee
        ]);
    }

    public function destroy(Employee $employee)
    {
        $employee->delete();

        return Redirect::route('employees.index')->with('success', 'Employee deleted.');
    }

    public function payroll()
    {
        return Inertia::render('Payroll/Index', [
            'message' => 'Payroll placeholder'
        ]);
    }
}
