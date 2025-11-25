<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class EmployeeController extends Controller
{
    /**
     * Display a paginated list of employees for the Inertia page.
     * Also prepare recentEmployees and employeeCount for dashboard sidebar usage.
     */
    public function index(Request $request)
    {
        // 10 per page, adapt as needed
        $perPage = 10;

        $employees = Employee::orderBy('created_at', 'desc')->paginate($perPage)->withQueryString();

        // recent employees for sidebar (used by Dashboard)
        $recentEmployees = Employee::orderBy('created_at', 'desc')->take(5)->get(['id','name','job_title']);

        $employeeCount = Employee::count();

        return Inertia::render('Employees/Index', [
            'employees' => $employees,
            'recentEmployees' => $recentEmployees,
            // flash is automatically available via session, but can forward if desired
            'employeeCount' => $employeeCount,
        ]);
    }

    /**
     * Store a newly created employee.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required','string','max:255'],
            'email' => ['nullable','email','max:255'],
            'phone' => ['nullable','string','max:50'],
            'job_title' => ['nullable','string','max:100'],
            'salary' => ['nullable','numeric'],
        ]);

        $employee = Employee::create($data);

        return Redirect::route('employees.index')->with('success', 'Employee created.');
    }

    /**
     * Show single employee details (for route employees.show).
     */
    public function show(Employee $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => $employee
        ]);
    }

    /**
     * Delete an employee.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return Redirect::route('employees.index')->with('success', 'Employee deleted.');
    }

    /**
     * Optional: payroll page placeholder if you route to it.
     */
    public function payroll()
    {
        return Inertia::render('Payroll/Index', [
            'message' => 'Payroll placeholder'
        ]);
    }
}
