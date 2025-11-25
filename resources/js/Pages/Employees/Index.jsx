// resources/js/Pages/Employees.jsx
import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';

const mockAuth = {
  user: {
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
  },
};

const initialMockEmployees = [
  { id: 128, name: 'Ginger Collier', email: 'ginger@mail.com', phone: '01870676858', job_title: 'Project Manager', salary: 89000, department: 'Operations', supervisor: '-', isSupervisor: false, status: 'Active', company: 'TechSol' },
  { id: 205, name: 'jhony', email: 'jhony@mail.com', phone: '', job_title: 'Tech Lead', salary: 75000, department: 'Finance', supervisor: '-', isSupervisor: false, status: 'Active', company: 'BTrac' },
  { id: 148, name: 'Quemby George', email: 'que@mail.com', phone: '', job_title: 'Product Manager', salary: 46000, department: 'Marketing', supervisor: '-', isSupervisor: false, status: 'Active', company: 'DigiInno' },
  { id: 120, name: 'shaila rahaman', email: 'shaila@mail.com', phone: '', job_title: 'Developer', salary: 56000, department: 'Information Technology', supervisor: '-', isSupervisor: false, status: 'Active', company: 'BTrac' },
  { id: 1280, name: 'Xaviera Bright', email: 'xaviera@mail.com', phone: '', job_title: 'Developer', salary: 50000, department: 'Finance', supervisor: '-', isSupervisor: false, status: 'On Leave', company: 'TechSol' },
];

// keep original id as original_id when renumbering so routes can use original id
const renumber = (list) => (Array.isArray(list) ? list.map((item, idx) => ({
  ...item,
  original_id: (item.original_id ?? item.id),
  id: idx + 1,
})) : []);

export default function Employees({ auth = mockAuth, employees: initialEmployees = initialMockEmployees }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // initialize state already renumbered so we don't need an effect to mutate it after mount
  const [employees, setEmployeesRaw] = useState(() => renumber(Array.isArray(initialEmployees) ? initialEmployees : (initialEmployees?.data || [])));

  const employeesList = Array.isArray(employees) ? employees : (employees?.data || []);

  // ---------------- Normalizers ----------------
  // Robust conversion to a string for fields that may be returned as string/object/number
  const getString = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    if (typeof val === 'object') {
      // try common properties that an API might return
      return (val.name ?? val.title ?? val.label ?? val.status ?? val.department ?? val.type ?? '') || '';
    }
    return String(val);
  };

  const getDeptName = (dept) => getString(dept).trim();
  const getStatusName = (status) => getString(status).trim();
  const getCompanyName = (company) => getString(company).trim();
  const getJobTitle = (job_title) => getString(job_title).trim();

  // ---------- Filtering (use normalized strings) ----------
  const q = searchQuery.trim().toLowerCase();
  const filteredEmployees = employeesList.filter(emp => {
    if (!q) return true;
    return (
      (getString(emp?.name) || '').toLowerCase().includes(q) ||
      (getString(emp?.email) || '').toLowerCase().includes(q) ||
      getJobTitle(emp?.job_title).toLowerCase().includes(q) ||
      getDeptName(emp?.department).toLowerCase().includes(q) ||
      getCompanyName(emp?.company).toLowerCase().includes(q)
    );
  });

  // ---------- Form state ----------
  const [formData, setFormData] = useState({
    employee_code: '',
    name: '',
    email: '',
    phone: '',
    father_name: '',
    mother_name: '',
    dob: '',
    marital_status: '',
    blood_group: '',
    religion: '',
    gender: '',
    height: '',
    weight: '',
    nationality: '',
    national_id: '',
    passport_no: '',
    driving_license_no: '',
    present_address: '',
    permanent_address: '',
    designation: '',
    job_title: '',
    department: '',
    position: '',
    grade: '',
    unit_name: '',
    job_location: '',
    company: '',
    joining_date: '',
    job_category: '',
    supervisor: '',
    salary: '',
    status: 'Active',
  });

  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (step) => {
    const errors = {};
    if (step === 1) {
      if (!formData.name || !formData.name.trim()) errors.name = 'Employee name is required';
      if (!formData.email || !formData.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
      if (!formData.phone || !formData.phone.trim()) errors.phone = 'Phone number is required';
      if (!formData.dob) errors.dob = 'Date of birth is required';
      if (!formData.gender) errors.gender = 'Gender is required';
    }
    if (step === 2) {
      if (!formData.job_title || !formData.job_title.trim()) errors.job_title = 'Job title is required';
      if (!formData.department || !formData.department.trim()) errors.department = 'Department is required';
      if (!formData.company || !formData.company.trim()) errors.company = 'Company is required';
      if (!formData.joining_date) errors.joining_date = 'Joining date is required';
      if (formData.salary && isNaN(Number(formData.salary))) {
        errors.salary = 'Salary must be a valid number';
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setFormErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    // validate whole form on final submit
    if (!validateStep(currentStep)) return;

    const payload = {
      employee_code: formData.employee_code?.trim() || null,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone?.trim() || '',
      father_name: formData.father_name?.trim() || '',
      mother_name: formData.mother_name?.trim() || '',
      dob: formData.dob || '',
      marital_status: formData.marital_status || '',
      blood_group: formData.blood_group || '',
      religion: formData.religion || '',
      gender: formData.gender || '',
      height: formData.height || '',
      weight: formData.weight || '',
      nationality: formData.nationality || '',
      national_id: formData.national_id || '',
      passport_no: formData.passport_no || '',
      driving_license_no: formData.driving_license_no || '',
      present_address: formData.present_address || '',
      permanent_address: formData.permanent_address || '',
      designation: formData.designation || '',
      job_title: formData.job_title || '',
      department: formData.department || '',
      position: formData.position || '',
      grade: formData.grade || '',
      unit_name: formData.unit_name || '',
      job_location: formData.job_location || '',
      company: formData.company || '',
      joining_date: formData.joining_date || '',
      job_category: formData.job_category || '',
      supervisor: formData.supervisor || '-',
      salary: formData.salary ? Number(formData.salary) : 0,
      status: formData.status || 'Active',
      isSupervisor: false,
    };

    try {
      setSaving(true);

      if (typeof route !== 'undefined' && typeof router !== 'undefined') {
        router.post(route('employees.store'), payload, {
          preserveScroll: true,
          onSuccess: (page) => {
            const serverItem = page.props?.employee ?? null;
            // when server returns the new employee, include it and renumber while preserving original_id
            setEmployeesRaw(prev => renumber([...prev, serverItem ?? payload]));
            resetForm();
          },
          onError: (errs) => {
            setFormErrors(errs || {});
            setSaving(false);
          },
          onFinish: () => setSaving(false),
        });
      } else {
        // client-only fallback: push payload and renumber
        setEmployeesRaw(prev => renumber([...prev, payload]));
        resetForm();
        setSaving(false);
      }
    } catch (err) {
      console.error('Save failed', err);
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      employee_code: '',
      name: '',
      email: '',
      phone: '',
      father_name: '',
      mother_name: '',
      dob: '',
      marital_status: '',
      blood_group: '',
      religion: '',
      gender: '',
      height: '',
      weight: '',
      nationality: '',
      national_id: '',
      passport_no: '',
      driving_license_no: '',
      present_address: '',
      permanent_address: '',
      designation: '',
      job_title: '',
      department: '',
      position: '',
      grade: '',
      unit_name: '',
      job_location: '',
      company: '',
      joining_date: '',
      job_category: '',
      supervisor: '',
      salary: '',
      status: 'Active',
    });
    setFormErrors({});
    setShowAddForm(false);
    setCurrentStep(1);
    setSuccessMsg('Employee added successfully.');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // ---------- Robust route helpers & handlers ----------
  // Helper to resolve the id we should use for routes (prefer original_id if present)
  const routeId = (emp) => {
    if (emp === null || emp === undefined) return emp;
    // emp could be an object or primitive id
    if (typeof emp === 'object') {
      // prefer original_id, fallback to id, fallback to null
      return emp.original_id ?? emp.id ?? null;
    }
    return emp;
  };

  // Safe builder: try to build a Ziggy route URL, but return a fallback path string if route() fails
  const buildRouteUrl = (name, id, extraPath = '') => {
    const safeId = id == null ? '' : String(id);
    try {
      if (typeof route !== 'undefined') {
        // Some Ziggy setups accept route(name, id) and return a string URL.
        // If extraPath is used (like 'edit'), we'll append it safely.
        const base = route(name, safeId);
        return extraPath ? `${base}/${extraPath}` : base;
      }
    } catch (err) {
      // ignore and fallback
      // console.warn('Ziggy route() failed:', err);
    }
    // fallback to predictable RESTful paths
    if (extraPath) return `/employees/${safeId}/${extraPath}`;
    return `/employees/${safeId}`;
  };

  const handleView = (emp) => {
    const idToUse = routeId(emp);
    if (idToUse == null) {
      console.warn('No id found for employee:', emp);
      return;
    }

    const url = buildRouteUrl('employees.show', idToUse);

    if (typeof router !== 'undefined' && typeof router.get === 'function') {
      try {
        router.get(url);
        return;
      } catch (err) {
        console.warn('router.get failed for view, falling back to href:', err);
      }
    }

    window.location.href = url;
  };

  const handleEdit = (emp) => {
    const idToUse = routeId(emp);
    if (idToUse == null) {
      console.warn('No id found for employee:', emp);
      return;
    }

    // Try Ziggy named route for edit, but fallback if it throws
    let url;
    try {
      if (typeof route !== 'undefined') {
        url = route('employees.edit', idToUse);
      }
    } catch (err) {
      // ignore
    }
    if (!url) url = buildRouteUrl('employees.show', idToUse, 'edit'); // fallback -> /employees/:id/edit

    if (typeof router !== 'undefined' && typeof router.get === 'function') {
      try {
        router.get(url);
        return;
      } catch (err) {
        console.warn('router.get failed for edit, falling back to href:', err);
      }
    }

    window.location.href = url;
  };

  // Delete uses routeId as well (already robust)
  const handleDelete = (emp) => {
    const idToUse = routeId(emp);
    const name = emp?.name || 'this employee';
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;
    if (typeof route !== 'undefined' && typeof router !== 'undefined') {
      try {
        router.delete(route('employees.destroy', idToUse), {
          preserveScroll: true,
          onSuccess: () => {
            setEmployeesRaw(prev => renumber(prev.filter(e => routeId(e) !== idToUse)));
          },
        });
        return;
      } catch (err) {
        // fall back to manual removal
        console.warn('router.delete failed, falling back to client-only deletion:', err);
      }
    }
    setEmployeesRaw(prev => renumber(prev.filter(e => routeId(e) !== idToUse)));
  };

  // ---------- end handlers ----------

  const getStatusColor = (status) => {
    const s = (status || '').toLowerCase();
    switch (s) {
      case 'active': case 'in service': return { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' };
      case 'on leave': return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' };
      case 'inactive': return { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' };
      default: return { bg: '#e5e7eb', text: '#374151', border: '#d1d5db' };
    }
  };

  const getDepartmentColor = (dept) => {
    const d = (dept || '').toLowerCase().trim();
    const colors = {
      'engineering': '#dbeafe','product': '#e0e7ff','design': '#fce7f3','marketing': '#fed7aa','sales': '#d9f99d','hr': '#ccfbf1','finance': '#fde68a','analytics': '#e9d5ff','operations': '#fbcfe8','information technology': '#dbeafe',
    };
    return colors[d] || '#f3f4f6';
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Professional Details', icon: '💼' },
    { number: 3, title: 'Documents & Review', icon: '📄' }
  ];

  return (
    <>
      <Head title="Employees" />

      <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <style>{`
          @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
          .employee-row { animation: slideUp 0.32s ease-out; transition: all 0.2s ease; }
          .employee-row:hover { background: #f8fafc; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
          .action-btn { transition: all 0.16s ease; cursor: pointer; }
          .action-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 14px rgba(0,0,0,0.08); }
          .form-label { font-weight: 600; color: #334155; margin-bottom: 8px; display: block; font-size: 0.9rem; }
          .form-input { width: 100%; padding: 0.75rem 1rem; border: 2px solid #e2e8f0; border-radius: 10px; font-size: 0.95rem; transition: all 0.2s ease; }
          .form-input:focus { outline: none; border-color: #334155; box-shadow: 0 0 0 3px rgba(51,65,85,0.1); }
          .step-indicator { transition: all 0.3s ease; }
          .step-indicator.active { transform: scale(1.05); }
          .form-section { animation: slideInRight 0.4s ease-out; }
        `}</style>

        <aside style={{ width: sidebarCollapsed ? '80px' : '280px', background: '#ffffff', display: 'flex', flexDirection: 'column', boxShadow: '4px 0 24px rgba(0,0,0,0.08)', transition: 'width 0.3s ease', position: 'relative', borderRight: '1px solid #e2e8f0' }}>
          <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 16px rgba(0,0,0,0.12)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              {!sidebarCollapsed && <div><div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1e293b' }}>PayMaster</div><div style={{ fontSize: '0.8rem', color: '#64748b' }}>HR Management</div></div>}
            </div>
          </div>

          <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
            <Link href={typeof route !== 'undefined' ? route('dashboard') : '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0.9rem 1rem', color: '#64748b', textDecoration: 'none', borderRadius: 10, marginBottom: '0.5rem' }}>Dashboard</Link>
            <Link href={typeof route !== 'undefined' ? route('employees.index') : '/employees'} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '0.9rem 1rem', color: '#334155', textDecoration: 'none', borderRadius: 10, marginBottom: '0.5rem', background: 'rgba(51,65,85,0.04)' }}>
              Employees
              <span style={{ marginLeft: 'auto', background: '#334155', color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 700 }}>{employeesList.length}</span>
            </Link>
          </nav>

          <button onClick={() => setSidebarCollapsed(s => !s)} style={{ position: 'absolute', right: -12, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24, borderRadius: '50%', background: 'white', border: '2px solid #e2e8f0', cursor: 'pointer' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)' }}><polyline points="15 18 9 12 15 6"/></svg>
          </button>
        </aside>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <header style={{ background: 'rgba(255,255,255,0.95)', padding: '1.25rem 2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Employee Management</h1>
              <p style={{ color: '#64748b', margin: '4px 0 0 0', fontSize: '0.95rem' }}>Manage your team members and workforce</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setProfileOpen(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem 1rem', borderRadius: 10, cursor: 'pointer' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#334155, #1e293b)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{auth?.user?.name?.charAt(0).toUpperCase() || 'U'}</div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{auth?.user?.name || 'User'}</div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                </button>

                {profileOpen && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: 'white', borderRadius: 12, boxShadow: '0 10px 40px rgba(0,0,0,0.12)', minWidth: 220, border: '1px solid #e2e8f0' }}>
                    <Link href={typeof route !== 'undefined' ? route('profile.edit') : '/profile'} style={{ display: 'block', padding: '1rem 1.25rem', color: '#475569', textDecoration: 'none' }}>My Profile</Link>
                    <Link href={typeof route !== 'undefined' ? route('logout') : '/logout'} method="post" as="button" style={{ display: 'block', padding: '1rem 1.25rem', color: '#ef4444', textDecoration: 'none', borderTop: '1px solid #f1f5f9', background: 'transparent', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer' }}>Logout</Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto' }}>
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 12, marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ flex: '1 1 400px', position: 'relative' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, email, position, or department..." style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 3rem', border: '2px solid #e2e8f0', borderRadius: 10, fontSize: '0.95rem', outline: 'none' }} onFocus={(e) => e.target.style.borderColor = '#334155'} onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>

              <button onClick={() => setShowAddForm(true)} className="action-btn" style={{ padding: '0.85rem 1.75rem', background: 'linear-gradient(135deg,#334155,#1e293b)', color: 'white', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.95rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Employee
              </button>
            </div>

            {successMsg && <div style={{ marginBottom: '1.5rem', padding: '1rem 1.25rem', background: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: 10, color: '#065f46', display: 'flex', alignItems: 'center', gap: 10 }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>{successMsg}</div>}

            <div style={{ background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
                  <thead>
                    <tr style={{ background: 'linear-gradient(to bottom, #f8fafc, #f1f5f9)', borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'left' }}>ID</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'left' }}>Employee</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'left' }}>Position</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'left' }}>Department</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'left' }}>Contact</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'center' }}>Status</th>
                      <th style={{ padding: '18px 20px', fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEmployees.length > 0 ? filteredEmployees.map((emp, idx) => {
                      const statusColors = getStatusColor(getStatusName(emp?.status) || 'Active');
                      const deptName = getDeptName(emp?.department) || '-';
                      const jobTitle = getJobTitle(emp?.job_title) || '-';
                      const companyName = getCompanyName(emp?.company) || '-';

                      return (
                        <tr key={emp.id || idx} className="employee-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '20px', verticalAlign: 'middle', fontWeight: 700, color: '#64748b', fontSize: '0.95rem' }}>{emp.id}</td>

                          <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg,#334155,#1e293b)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1rem', flexShrink: 0, boxShadow: '0 2px 8px rgba(51,65,85,0.2)' }}>
                                {getString(emp?.name).charAt(0).toUpperCase() || 'E'}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1e293b' }}>{getString(emp?.name)}</div>
                                <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 2 }}>{getString(emp?.email)}</div>
                              </div>
                            </div>
                          </td>

                          <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                            <div style={{ fontWeight: 600, color: '#334155', fontSize: '0.9rem' }}>{jobTitle}</div>
                            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>{companyName}</div>
                          </td>

                          <td style={{ padding: '20px', verticalAlign: 'middle' }}>
                            <span style={{ display: 'inline-block', padding: '6px 14px', borderRadius: 8, background: getDepartmentColor(deptName), color: '#1e293b', fontSize: '0.85rem', fontWeight: 600 }}>
                              {deptName}
                            </span>
                          </td>

                          <td style={{ padding: '20px', verticalAlign: 'middle', color: '#64748b', fontSize: '0.9rem' }}>
                            {getString(emp?.phone) || <span style={{ color: '#cbd5e1' }}>—</span>}
                          </td>

                          <td style={{ padding: '20px', verticalAlign: 'middle', textAlign: 'center' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, background: statusColors.bg, color: statusColors.text, fontSize: '0.8rem', fontWeight: 700, border: `1px solid ${statusColors.border}` }}>
                              <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColors.text }}></span>
                              {getStatusName(emp?.status) || 'Active'}
                            </span>
                          </td>

                          <td style={{ padding: '20px', verticalAlign: 'middle', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
                              {/* View */}
                              <button
                                onClick={() => handleView(emp)}
                                className="action-btn"
                                title="View Details"
                                aria-label={`View ${getString(emp?.name) || 'employee'}`}
                                style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem', color: '#475569' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleEdit(emp)}
                                className="action-btn"
                                title="Edit"
                                aria-label={`Edit ${getString(emp?.name) || 'employee'}`}
                                style={{ padding: '8px 10px', borderRadius: 8, border: 'none', background: '#3b82f6', color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDelete(emp)}
                                className="action-btn"
                                title="Delete"
                                aria-label={`Delete ${getString(emp?.name) || 'employee'}`}
                                style={{ padding: '8px 10px', borderRadius: 8, border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontWeight: 500, fontSize: '0.85rem' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }) : (
                      <tr>
                        <td colSpan="7" style={{ padding: '60px 20px', textAlign: 'center', color: '#94a3b8' }}>
                          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>No employees found</div>
                          <div style={{ fontSize: '0.9rem' }}>Try adjusting your search criteria</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {filteredEmployees.length > 0 && (
                <div style={{ padding: '16px 20px', borderTop: '1px solid #f1f5f9', background: '#fafcff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
                    Showing <span style={{ fontWeight: 700, color: '#334155' }}>{filteredEmployees.length}</span> of <span style={{ fontWeight: 700, color: '#334155' }}>{employeesList.length}</span> employees
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* Multi-Step Add Employee Modal */}
        {showAddForm && (
          <div className="modal-backdrop" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, backdropFilter: 'blur(6px)', animation: 'fadeIn 0.3s ease' }} onClick={(e) => e.target === e.currentTarget && setShowAddForm(false)}>
            <div className="modal-content" style={{ background: 'white', borderRadius: 16, width: 'min(900px, 96%)', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
              {/* Header with progress */}
              <div style={{ padding: '2rem 2.5rem 1.5rem', borderBottom: '1px solid #e2e8f0', background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Add New Employee</h3>
                    <p style={{ color: '#64748b', marginTop: 8, fontSize: '0.95rem' }}>Step {currentStep} of 3 - {steps[currentStep - 1].title}</p>
                  </div>
                  <button onClick={() => { setShowAddForm(false); setCurrentStep(1); }} style={{ border: 'none', background: '#f1f5f9', cursor: 'pointer', width: 40, height: 40, borderRadius: 10, fontSize: '1.2rem', color: '#64748b', transition: 'all 0.2s' }} onMouseEnter={(e) => e.target.style.background = '#e2e8f0'} onMouseLeave={(e) => e.target.style.background = '#f1f5f9'}>✕</button>
                </div>

                {/* Step indicators */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {steps.map((step, idx) => (
                    <React.Fragment key={step.number}>
                      <div className={`step-indicator ${currentStep >= step.number ? 'active' : ''}`} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: 12, background: currentStep >= step.number ? 'linear-gradient(135deg, #334155, #1e293b)' : '#f8fafc', border: currentStep >= step.number ? 'none' : '2px dashed #e2e8f0', transition: 'all 0.3s ease' }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: currentStep >= step.number ? 'rgba(255,255,255,0.2)' : '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>
                          {currentStep > step.number ? '✓' : step.icon}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: currentStep >= step.number ? 'rgba(255,255,255,0.7)' : '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Step {step.number}</div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600, color: currentStep >= step.number ? 'white' : '#475569', marginTop: 2 }}>{step.title}</div>
                        </div>
                      </div>
                      {idx < steps.length - 1 && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={currentStep > step.number ? '#334155' : '#cbd5e1'} strokeWidth="2.5" style={{ flexShrink: 0 }}>
                          <polyline points="9 18 15 12 9 6"/>
                        </svg>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Form content with scroll */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, overflowY: 'auto', padding: '2rem 2.5rem' }}>
                  {/* Step 1 */}
                  {currentStep === 1 && (
                    <div className="form-section">
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.5rem' }}>👤</span>
                          Basic Information
                        </h4>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter the employee's personal details</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                          <label className="form-label">Full Name *</label>
                          <input name="name" value={formData.name} onChange={handleInputChange} className={`form-input ${formErrors.name ? 'error' : ''}`} placeholder="John Doe" />
                          {formErrors.name && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.name}</div>}
                        </div>

                        <div>
                          <label className="form-label">Employee ID</label>
                          <input name="employee_code" value={formData.employee_code} onChange={handleInputChange} className="form-input" placeholder="EMP-001 (optional)" />
                        </div>

                        <div>
                          <label className="form-label">Email Address *</label>
                          <input name="email" type="email" value={formData.email} onChange={handleInputChange} className={`form-input ${formErrors.email ? 'error' : ''}`} placeholder="john.doe@company.com" />
                          {formErrors.email && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.email}</div>}
                        </div>

                        <div>
                          <label className="form-label">Phone Number *</label>
                          <input name="phone" value={formData.phone} onChange={handleInputChange} className={`form-input ${formErrors.phone ? 'error' : ''}`} placeholder="+1 (555) 000-0000" />
                          {formErrors.phone && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.phone}</div>}
                        </div>

                        <div>
                          <label className="form-label">Date of Birth *</label>
                          <input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className={`form-input ${formErrors.dob ? 'error' : ''}`} />
                          {formErrors.dob && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.dob}</div>}
                        </div>

                        <div>
                          <label className="form-label">Gender *</label>
                          <select name="gender" value={formData.gender} onChange={handleInputChange} className={`form-input ${formErrors.gender ? 'error' : ''}`}>
                            <option value="">Select gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                          {formErrors.gender && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.gender}</div>}
                        </div>

                        <div>
                          <label className="form-label">Father's Name</label>
                          <input name="father_name" value={formData.father_name} onChange={handleInputChange} className="form-input" placeholder="Father's name" />
                        </div>

                        <div>
                          <label className="form-label">Mother's Name</label>
                          <input name="mother_name" value={formData.mother_name} onChange={handleInputChange} className="form-input" placeholder="Mother's name" />
                        </div>

                        <div>
                          <label className="form-label">Marital Status</label>
                          <select name="marital_status" value={formData.marital_status} onChange={handleInputChange} className="form-input">
                            <option value="">Select</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">Blood Group</label>
                          <select name="blood_group" value={formData.blood_group} onChange={handleInputChange} className="form-input">
                            <option value="">Select blood group</option>
                            <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">Religion</label>
                          <input name="religion" value={formData.religion} onChange={handleInputChange} className="form-input" placeholder="Religion" />
                        </div>

                        <div>
                          <label className="form-label">Nationality</label>
                          <input name="nationality" value={formData.nationality} onChange={handleInputChange} className="form-input" placeholder="Nationality" />
                        </div>

                        <div>
                          <label className="form-label">Height (ft)</label>
                          <input name="height" value={formData.height} onChange={handleInputChange} className="form-input" placeholder="e.g. 5.6" />
                        </div>

                        <div>
                          <label className="form-label">Weight (kg)</label>
                          <input name="weight" value={formData.weight} onChange={handleInputChange} className="form-input" placeholder="e.g. 65" />
                        </div>
                      </div>

                      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f9ff', borderLeft: '4px solid #3b82f6', borderRadius: 8 }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                          </svg>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e40af', fontSize: '0.9rem' }}>Personal Information</div>
                            <div style={{ color: '#475569', fontSize: '0.85rem', marginTop: 4 }}>This information will be kept confidential and used for HR records only.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Steps 2 & 3 */}
                  {currentStep === 2 && (
                    <div className="form-section">
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>
                          Professional Details
                        </h4>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Enter job-related information and organizational details</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                          <label className="form-label">Job Title *</label>
                          <input name="job_title" value={formData.job_title} onChange={handleInputChange} className={`form-input ${formErrors.job_title ? 'error' : ''}`} placeholder="e.g., Senior Developer" />
                          {formErrors.job_title && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.job_title}</div>}
                        </div>

                        <div>
                          <label className="form-label">Department *</label>
                          <select name="department" value={formData.department} onChange={handleInputChange} className={`form-input ${formErrors.department ? 'error' : ''}`}>
                            <option value="">Select department</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Product">Product</option>
                            <option value="Design">Design</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Analytics">Analytics</option>
                            <option value="Operations">Operations</option>
                            <option value="Information Technology">Information Technology</option>
                          </select>
                          {formErrors.department && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.department}</div>}
                        </div>

                        <div>
                          <label className="form-label">Company *</label>
                          <input name="company" value={formData.company} onChange={handleInputChange} className={`form-input ${formErrors.company ? 'error' : ''}`} placeholder="e.g., TechSol Inc." />
                          {formErrors.company && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.company}</div>}
                        </div>

                        <div>
                          <label className="form-label">Joining Date *</label>
                          <input name="joining_date" type="date" value={formData.joining_date} onChange={handleInputChange} className={`form-input ${formErrors.joining_date ? 'error' : ''}`} />
                          {formErrors.joining_date && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.joining_date}</div>}
                        </div>

                        <div>
                          <label className="form-label">Designation</label>
                          <input name="designation" value={formData.designation} onChange={handleInputChange} className="form-input" placeholder="e.g., Team Lead" />
                        </div>

                        <div>
                          <label className="form-label">Position</label>
                          <input name="position" value={formData.position} onChange={handleInputChange} className="form-input" placeholder="e.g., Full-time" />
                        </div>

                        <div>
                          <label className="form-label">Grade</label>
                          <input name="grade" value={formData.grade} onChange={handleInputChange} className="form-input" placeholder="e.g., L3, M2" />
                        </div>

                        <div>
                          <label className="form-label">Job Category</label>
                          <select name="job_category" value={formData.job_category} onChange={handleInputChange} className="form-input">
                            <option value="">Select category</option>
                            <option value="Permanent">Permanent</option>
                            <option value="Contract">Contract</option>
                            <option value="Temporary">Temporary</option>
                            <option value="Intern">Intern</option>
                          </select>
                        </div>

                        <div>
                          <label className="form-label">Unit/Division</label>
                          <input name="unit_name" value={formData.unit_name} onChange={handleInputChange} className="form-input" placeholder="e.g., Product Division" />
                        </div>

                        <div>
                          <label className="form-label">Job Location</label>
                          <input name="job_location" value={formData.job_location} onChange={handleInputChange} className="form-input" placeholder="e.g., New York Office" />
                        </div>

                        <div>
                          <label className="form-label">Supervisor</label>
                          <input name="supervisor" value={formData.supervisor} onChange={handleInputChange} className="form-input" placeholder="Reporting manager name" />
                        </div>

                        <div>
                          <label className="form-label">Annual Salary</label>
                          <input name="salary" type="number" value={formData.salary} onChange={handleInputChange} className={`form-input ${formErrors.salary ? 'error' : ''}`} placeholder="e.g., 75000" />
                          {formErrors.salary && <div style={{ color: '#ef4444', marginTop: 8, fontSize: '0.85rem' }}>⚠ {formErrors.salary}</div>}
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <label className="form-label">Employment Status</label>
                          <select name="status" value={formData.status} onChange={handleInputChange} className="form-input">
                            <option value="Active">Active</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0f9ff', borderLeft: '4px solid #3b82f6', borderRadius: 8 }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                          </svg>
                          <div>
                            <div style={{ fontWeight: 600, color: '#1e40af', fontSize: '0.9rem' }}>Organizational Structure</div>
                            <div style={{ color: '#475569', fontSize: '0.85rem', marginTop: 4 }}>These details help maintain proper organizational hierarchy and reporting relationships.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="form-section">
                      <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.5rem' }}>Documents & Review</h4>
                        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Provide identification details and review all information</p>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                        <div>
                          <label className="form-label">National ID Number</label>
                          <input name="national_id" value={formData.national_id} onChange={handleInputChange} className="form-input" placeholder="Enter national ID" />
                        </div>

                        <div>
                          <label className="form-label">Passport Number</label>
                          <input name="passport_no" value={formData.passport_no} onChange={handleInputChange} className="form-input" placeholder="Enter passport number" />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <label className="form-label">Driving License Number</label>
                          <input name="driving_license_no" value={formData.driving_license_no} onChange={handleInputChange} className="form-input" placeholder="Enter driving license number" />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <label className="form-label">Present Address</label>
                          <textarea name="present_address" value={formData.present_address} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: 10, fontSize: '0.9375rem', fontFamily: 'inherit', resize: 'vertical' }} placeholder="Current residential address" />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                          <label className="form-label">Permanent Address</label>
                          <textarea name="permanent_address" value={formData.permanent_address} onChange={handleInputChange} rows="3" style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid #e2e8f0', borderRadius: 10, fontSize: '0.9375rem', fontFamily: 'inherit', resize: 'vertical' }} placeholder="Permanent residential address" />
                        </div>
                      </div>

                      <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', padding: '1.5rem', borderRadius: 12, border: '1px solid #e2e8f0' }}>
                        <h5 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                          </svg>
                          Information Summary
                        </h5>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Full Name</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.name || '—'}</div>
                          </div>

                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.email || '—'}</div>
                          </div>

                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Job Title</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.job_title || '—'}</div>
                          </div>

                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Department</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.department || '—'}</div>
                          </div>

                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Company</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.company || '—'}</div>
                          </div>

                          <div style={{ background: 'white', padding: '1rem', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Joining Date</div>
                            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#1e293b' }}>{formData.joining_date || '—'}</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f0fdf4', borderLeft: '4px solid #10b981', borderRadius: 8 }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                          </svg>
                          <div>
                            <div style={{ fontWeight: 600, color: '#059669', fontSize: '0.9rem', marginBottom: '4px' }}>Ready to Submit</div>
                            <div style={{ color: '#475569', fontSize: '0.85rem', lineHeight: '1.5' }}>Please review all information carefully before completing the registration. You can always edit this information later.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer actions */}
                <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    {currentStep > 1 && (
                      <button type="button" onClick={handlePrev} style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="15 18 9 12 15 6"/>
                        </svg>
                        Previous
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="button" onClick={() => { setShowAddForm(false); setCurrentStep(1); }} style={{ padding: '0.75rem 1.5rem', borderRadius: 10, border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#64748b' }}>
                      Cancel
                    </button>

                    {currentStep < 3 ? (
                      <button type="button" onClick={handleNext} style={{ padding: '0.75rem 2rem', borderRadius: 10, background: 'linear-gradient(135deg, #334155, #1e293b)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700 }}>
                        Continue
                      </button>
                    ) : (
                      <button type="submit" disabled={saving} style={{ padding: '0.75rem 2rem', borderRadius: 10, background: saving ? '#94a3b8' : 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 700 }}>
                        {saving ? 'Processing...' : 'Complete Registration'}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
