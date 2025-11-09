import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
      `}</style>
      
      <div style={{ display: 'flex', minHeight: '100vh', background: '#fafbfc' }}>
        {/* Sidebar */}
        <aside style={{
          width: sidebarOpen ? '260px' : '70px',
          background: '#ffffff',
          borderRight: '1px solid #e8eaed',
          transition: 'width 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e8eaed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link href="/" style={{
              color: '#202124',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#1a73e8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
              </div>
              {sidebarOpen && <span style={{ fontSize: '1.1rem', fontWeight: '600', color: '#202124' }}>Payroll</span>}
            </Link>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: '1rem 0.75rem' }}>
            <Link href="/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#1a73e8',
              textDecoration: 'none',
              background: '#e8f0fe',
              borderRadius: '8px',
              marginBottom: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              {sidebarOpen && <span>Dashboard</span>}
            </Link>

            <Link href="/employees" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#5f6368',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              {sidebarOpen && <span>Employees</span>}
            </Link>

            <Link href="/payroll" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#5f6368',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              {sidebarOpen && <span>Payroll</span>}
            </Link>

            <Link href="/reports" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#5f6368',
              textDecoration: 'none',
              borderRadius: '8px',
              marginBottom: '0.25rem',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              {sidebarOpen && <span>Reports</span>}
            </Link>

            <Link href="/settings" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0.75rem 1rem',
              color: '#5f6368',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '0.9rem',
              transition: 'background 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m5.2-13.8l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.8 5.2l-4.2-4.2m0-6l4.2-4.2"></path>
              </svg>
              {sidebarOpen && <span>Settings</span>}
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Top Header */}
          <header style={{
            background: '#ffffff',
            padding: '1rem 2rem',
            borderBottom: '1px solid #e8eaed',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '500',
              color: '#202124'
            }}>
              Dashboard
            </h1>

            {/* Profile */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'transparent',
                  border: '1px solid #dadce0',
                  cursor: 'pointer',
                  padding: '6px 12px 6px 6px',
                  borderRadius: '24px',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#1a73e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '0.9rem'
                }}>
                  {auth?.user?.name ? auth.user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span style={{ fontSize: '0.9rem', color: '#202124', fontWeight: '500' }}>
                  {auth?.user?.name || 'User'}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: '#ffffff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  padding: '0.5rem',
                  minWidth: '200px',
                  border: '1px solid #e8eaed'
                }}>
                  <Link href="/profile" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.75rem',
                    color: '#202124',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Profile
                  </Link>

                  <Link href="/settings" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.75rem',
                    color: '#202124',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M12 1v6m0 6v6"></path>
                    </svg>
                    Settings
                  </Link>

                  <div style={{ height: '1px', background: '#e8eaed', margin: '0.5rem 0' }}></div>

                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.75rem',
                    color: '#d93025',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }} onMouseEnter={(e) => e.currentTarget.style.background = '#fce8e6'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                      <polyline points="16 17 21 12 16 7"></polyline>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main style={{
            flex: 1,
            padding: '2rem',
            overflowY: 'auto'
          }}>
            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e8eaed'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '0.5rem' }}>
                  Total Employees
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '500', color: '#202124' }}>
                  248
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e8eaed'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '0.5rem' }}>
                  Monthly Payroll
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '500', color: '#202124' }}>
                  $185.4K
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e8eaed'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '0.5rem' }}>
                  Pending Actions
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '500', color: '#202124' }}>
                  23
                </div>
              </div>

              <div style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e8eaed'
              }}>
                <div style={{ fontSize: '0.85rem', color: '#5f6368', marginBottom: '0.5rem' }}>
                  Reports
                </div>
                <div style={{ fontSize: '2rem', fontWeight: '500', color: '#202124' }}>
                  47
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e8eaed'
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '500', color: '#202124', marginBottom: '1rem' }}>
                Quick Actions
              </h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/employees/add" style={{
                  padding: '0.75rem 1.25rem',
                  background: '#1a73e8',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.background = '#1765cc'} onMouseLeave={(e) => e.currentTarget.style.background = '#1a73e8'}>
                  Add Employee
                </Link>

                <Link href="/payroll/run" style={{
                  padding: '0.75rem 1.25rem',
                  background: '#ffffff',
                  color: '#1a73e8',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '1px solid #dadce0',
                  transition: 'background 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}>
                  Run Payroll
                </Link>

                <Link href="/reports/generate" style={{
                  padding: '0.75rem 1.25rem',
                  background: '#ffffff',
                  color: '#1a73e8',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  border: '1px solid #dadce0',
                  transition: 'background 0.2s'
                }} onMouseEnter={(e) => e.currentTarget.style.background = '#f1f3f4'} onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}>
                  Generate Report
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}