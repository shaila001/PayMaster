import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <>
      <Head title="Payroll System Login" />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .fade-in { animation: fadeIn 0.8s ease-out; }
        .slide-in { animation: slideIn 0.8s ease-out; }
        .pulse { animation: pulse 2s ease-in-out infinite; }

        .form-group { margin-bottom: 1.5rem; position: relative; }
        .form-input {
          width: 100%;
          padding: 15px 15px 15px 50px;
          border-radius: 10px;
          border: 2px solid #e3f2fd;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #ffffff;
          color: #1565c0;
          box-sizing: border-box;
        }
        .form-input::placeholder { color: #90caf9; }
        .form-input:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.1);
        }

        /* Icon wrapper (left) */
          .icon-wrapper {
          position: absolute;
          left: 15px;
          top: 70%;
          transform: translateY(-50%);
          pointer-events: none;
          display: flex;
           align-items: center;
           justify-content: center;
           width: 22px;
           height: 22px;
          color: #64b5f6;
}
        .password-toggle-btn {
          position: absolute;
          right: 15px;
          top: 70%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #90caf9;
          cursor: pointer;
          font-size: 20px;   /* makes icon consistent */
          display: flex;
          align-items: center;
          justify-content: center;
          height: 24px;
          width: 24px;
          padding: 0;
        }
        .submit-btn {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        .form-label { font-weight: 600; color: #1565c0; margin-bottom: 8px; display: block; }
        .error-msg { color: #e53935; font-size: 13px; margin-top: 6px; display: flex; gap: 4px; }

        /* Responsive Layout */
        .login-root { display: flex; min-height: 100vh; position: relative; overflow: hidden; }
        .login-brand, .login-form-wrap {
          flex: 1; display: flex; align-items: center; justify-content: center; padding: 2rem;
        }
      `}</style>

      <div
        className="login-root"
        style={{
          background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        }}
      >

        {/* Background shapes */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(25,118,210,0.1)',
          top: '-150px',
          left: '-150px',
          filter: 'blur(80px)',
        }} />

        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(33,150,243,0.15)',
          bottom: '-100px',
          right: '-100px',
          filter: 'blur(80px)',
        }} />

        {/* Left Side */}
        <div className="login-brand">
          <div className="slide-in" style={{ textAlign: 'center', maxWidth: '550px' }}>

            {/* Logo */}
            <div className="pulse" style={{
              width: '120px', height: '120px', borderRadius: '30px',
              margin: '0 auto 2.5rem',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 15px 40px rgba(25,118,210,0.2)',
            }}>
              <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>

            <h1 style={{ fontSize: '3.8rem', fontWeight: '800', color: '#0d47a1' }}>PayMaster</h1>
            <p style={{ fontSize: '1.3rem', color: '#1565c0' }}>
              Streamlined payroll processing for modern businesses
            </p>

          </div>
        </div>

        {/* Right Side */}
        <div className="login-form-wrap">
          <div className="fade-in" style={{
            backgroundColor: 'white',
            padding: '3rem 2.5rem',
            borderRadius: '28px',
            width: '100%',
            maxWidth: '460px',
            boxShadow: '0 25px 70px rgba(25,118,210,0.2)',
          }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '2.2rem', color: '#0d47a1', fontWeight: '700' }}>Welcome Back</h2>
              <p style={{ color: '#64b5f6' }}>Log in to access your account</p>
            </div>

            {/* Form */}
            <form onSubmit={submit}>

              {/* Email */}
              <div className="form-group">
                <label className="form-label">Email Address</label>

                {/* Email icon (left) */}
                <div className="icon-wrapper" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16v16H4z" fill="none"></path>
                    <path d="M22,6 L12,13 L2,6"></path>
                  </svg>
                </div>

                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="form-input"
                  placeholder="your.email@company.com"
                  required
                />
                {errors.email && <div className="error-msg">{errors.email}</div>}
              </div>

              {/* Password */}
              <div className="form-group">
                <label className="form-label">Password</label>

                {/* Lock icon (left) */}
                <div className="icon-wrapper" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64b5f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>

                <input
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="form-input"
                  placeholder="Enter your password"
                  style={{ paddingRight: '50px' }}
                  required
                />

                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

                {errors.password && <div className="error-msg">{errors.password}</div>}
              </div>

              {/* Remember & Forgot */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2rem',
              }}>
                <label style={{ display: 'flex', alignItems: 'center', color: '#1565c0' }}>
                  <input type="checkbox" style={{ marginRight: '8px' }} />
                  Remember me
                </label>

                <a href="#" className="link-text">Forgot Password?</a>
              </div>

              <button type="submit" disabled={processing} className="submit-btn">
                {processing ? "Signing in..." : "LOGIN"}
              </button>
            </form>

            {/* Footer - with Register Link */}
            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '2px solid #e3f2fd',
            }}>

              {/* NEW REGISTER LINK */}
              <p style={{ marginTop: '0.2rem', color: '#1565c0' }}>
                Don’t have an account?{' '}
                <a href={route('register')} className="link-text" style={{ fontWeight: '700' }}>
                  Register
                </a>
              </p>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
