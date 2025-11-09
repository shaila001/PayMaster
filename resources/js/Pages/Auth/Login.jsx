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
        .fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .slide-in {
          animation: slideIn 0.8s ease-out;
        }
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .form-group {
          margin-bottom: 1.5rem;
          position: relative;
        }
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
        .form-input::placeholder {
          color: #90caf9;
        }
        .form-input:focus {
          outline: none;
          border-color: #1976d2;
          box-shadow: 0 0 0 4px rgba(25, 118, 210, 0.1);
        }
        .icon-wrapper {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 2;
        }
        .icon-wrapper svg {
          color: #90caf9;
          transition: color 0.3s ease;
        }
        .form-input:focus ~ .icon-wrapper svg {
          color: #1976d2;
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
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(25, 118, 210, 0.3);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
          background: linear-gradient(135deg, #1e88e5 0%, #1976d2 100%);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .password-toggle-btn {
          position: absolute;
          right: 15px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #90caf9;
          cursor: pointer;
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.3s ease;
          z-index: 2;
        }
        .password-toggle-btn:hover {
          color: #1976d2;
        }
        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #1565c0;
          font-weight: 600;
          font-size: 14px;
        }
        .error-msg {
          color: #e53935;
          font-size: 13px;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .link-text {
          color: #1976d2;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .link-text:hover {
          color: #1565c0;
        }
      `}</style>
      
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'rgba(25, 118, 210, 0.1)',
          top: '-150px',
          left: '-150px',
          filter: 'blur(80px)'
        }} />
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'rgba(33, 150, 243, 0.15)',
          bottom: '-100px',
          right: '-100px',
          filter: 'blur(80px)'
        }} />

        {/* Left Side - Branding */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div className="slide-in" style={{ textAlign: 'center', maxWidth: '550px' }}>
            {/* Logo */}
            <div className="pulse" style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2.5rem',
              boxShadow: '0 15px 40px rgba(25, 118, 210, 0.2)',
              border: '3px solid rgba(255, 255, 255, 0.9)'
            }}>
              <svg width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="#1976d2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            
            {/* Title */}
            <h1 style={{
              fontSize: '3.8rem',
              fontWeight: '800',
              marginBottom: '1.2rem',
              color: '#0d47a1',
              letterSpacing: '-2px'
            }}>
              PayMaster
            </h1>
            
            {/* Subtitle */}
            <p style={{
              fontSize: '1.3rem',
              color: '#1565c0',
              lineHeight: '1.8',
              marginBottom: '3.5rem',
              fontWeight: '400'
            }}>
              Streamlined payroll processing for modern businesses
            </p>

            {/* Features */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem',
              marginTop: '2rem'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '1.8rem 1.5rem',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.12)',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>⚡</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1565c0', marginBottom: '0.3rem' }}>
                  Quick
                </div>
                <div style={{ fontSize: '0.85rem', color: '#42a5f5' }}>Instant Process</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '1.8rem 1.5rem',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.12)',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>🔒</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1565c0', marginBottom: '0.3rem' }}>
                  Secure
                </div>
                <div style={{ fontSize: '0.85rem', color: '#42a5f5' }}>Bank Grade</div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '1.8rem 1.5rem',
                borderRadius: '18px',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 20px rgba(25, 118, 210, 0.12)',
                transition: 'transform 0.3s ease',
                cursor: 'default'
              }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>✨</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1565c0', marginBottom: '0.3rem' }}>
                  Simple
                </div>
                <div style={{ fontSize: '0.85rem', color: '#42a5f5' }}>User Friendly</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          position: 'relative',
          zIndex: 1
        }}>
          <div className="fade-in" style={{
            backgroundColor: '#ffffff',
            padding: '3rem 2.5rem',
            borderRadius: '28px',
            boxShadow: '0 25px 70px rgba(25, 118, 210, 0.2)',
            width: '100%',
            maxWidth: '460px',
            border: '2px solid rgba(255, 255, 255, 0.9)'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '700',
                color: '#0d47a1',
                marginBottom: '0.5rem'
              }}>
                Welcome Back
              </h2>
              <p style={{ color: '#64b5f6', fontSize: '1rem' }}>
                Sign in to access your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={submit}>
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    className="form-input"
                    placeholder="your.email@company.com"
                    required
                  />
                  <div className="icon-wrapper">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                </div>
                {errors.email && (
                  <div className="error-msg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    className="form-input"
                    placeholder="Enter your password"
                    style={{ paddingRight: '50px' }}
                    required
                  />
                  <div className="icon-wrapper">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="error-msg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                    </svg>
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Remember & Forgot */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                fontSize: '0.9rem'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#1565c0' }}>
                  <input type="checkbox" style={{ marginRight: '8px', accentColor: '#1976d2', width: '16px', height: '16px' }} />
                  Remember me
                </label>
                <a href="#" className="link-text" style={{ fontSize: '0.9rem' }}>
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={processing}
                className="submit-btn"
              >
                {processing ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Footer */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: '2rem', 
              paddingTop: '2rem', 
              borderTop: '2px solid #e3f2fd' 
            }}>
              <p style={{ color: '#64b5f6', fontSize: '0.9rem' }}>
                Need assistance?{' '}
                <a href="#" className="link-text">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}