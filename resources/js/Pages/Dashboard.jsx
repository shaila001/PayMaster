import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <Head title="Dashboard" />
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      
      <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f7ff' }}>
        {/* Sidebar */}
        <aside style={{
          width: '260px',
          background: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)'
        }}>
          {/* Logo */}
          <div style={{
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(74, 144, 226, 0.3)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M7 15h0M2 9.5h20"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a202c', lineHeight: '1.2' }}>PayMaster</div>
              <div style={{ fontSize: '0.9rem', color: '#4A90E2', fontWeight: '500' }}>Payroll System</div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '1rem' }}>
            <Link href="/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#ffffff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              fontWeight: '600',
              fontSize: '0.95rem',
              boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)',
              transition: 'all 0.2s'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link href="/employees" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#4A90E2',
              textDecoration: 'none',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#EBF5FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Employees</span>
            </Link>

            <Link href="/payroll" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#4A90E2',
              textDecoration: 'none',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#EBF5FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>Payroll</span>
            </Link>

            <Link href="/reports" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#4A90E2',
              textDecoration: 'none',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#EBF5FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span>Reports</span>
            </Link>

            <Link href="/analytics" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#4A90E2',
              textDecoration: 'none',
              borderRadius: '10px',
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#EBF5FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
              <span>Analytics</span>
            </Link>

            <Link href="/settings" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.875rem 1rem',
              color: '#4A90E2',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '500',
              fontSize: '0.95rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#EBF5FF'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top Header */}
          <header style={{
            background: '#ffffff',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{
                background: '#4A90E2',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.background = '#357ABD'} onMouseLeave={(e) => e.currentTarget.style.background = '#4A90E2'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <div>
                <h1 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1a202c',
                  marginBottom: '2px'
                }}>
                  Dashboard
                </h1>
                <p style={{ fontSize: '1rem', color: '#4A90E2' }}>
                  Welcome back, {auth?.user?.name || 'Shaila rahaman'}! 
                </p>
              </div>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

              <button style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }} onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <svg width="35" height="22" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white'
                }}>1</span>
              </button>

              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: '#4A90E2',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem 1rem',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(74, 144, 226, 0.3)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#357ABD'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#4A90E2'}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    border: '2px solid white'
                  }}>
                    {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: '600', lineHeight: '1.2' }}>
                      {auth?.user?.name || 'Shaila rahaman'}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                    transform: profileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }}>
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>

                {profileOpen && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    minWidth: '200px',
                    overflow: 'hidden',
                    zIndex: 100,
                    border: '1px solid #e2e8f0'
                  }}>
                    <Link href="/profile" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '0.875rem 1rem',
                      color: '#2d3748',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'background 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.background = '#f7fafc'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      My Profile
                    </Link>
                   <Link
    href={route('logout')}
    method="post"
    as="button"
    style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '0.875rem 1rem',
        color: '#E53E3E',
        background: 'transparent',
        border: 'none',
        fontSize: '0.9rem',
        fontWeight: '500',
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'background 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = '#FFF5F5'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
    Logout
</Link>

                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 2rem'
          }}>
            {/* Welcome Card */}
            <div style={{
              background: '#ffffff',
              padding: '3.5rem 3rem',
              borderRadius: '20px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              maxWidth: '780px',
              width: '100%'
            }}>
              <div style={{
                width: '110px',
                height: '110px',
                background: '#D6ECFF',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 2rem'
              }}>
                <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              
              <h2 style={{
                fontSize: '2.2rem',
                fontWeight: '600',
                color: '#1a202c',
                marginBottom: '1rem',
                letterSpacing: '-0.5px'
              }}>
                Welcome to PayMaster Dashboard
              </h2>
              <p style={{
                fontSize: '1rem',
                color: '#4A90E2',
                maxWidth: '650px',
                margin: '0 auto 0.5rem',
                lineHeight: '1.7'
              }}>
                Your central hub for managing payroll, employees, and reports. Use the sidebar to navigate through different sections.
              </p>
              <p style={{
                fontSize: '0.95rem',
                color: '#718096',
                maxWidth: '650px',
                margin: '0 auto',
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Everything in one place — secure, fast and easy to manage.
              </p>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}