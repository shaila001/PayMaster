import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%)' }}>
      {/* Top Navigation */}
      <nav className="bg-white border-b-2 border-gray-100" style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="flex h-20 justify-between items-center">
            {/* Left: Logo & Navigation Links */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div style={{
                  width: '42px',
                  height: '42px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                </div>
                <span className="text-2xl font-bold" style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  Payroll
                </span>
              </div>

              {/* Navigation Link */}
              <div className="hidden sm:block">
                <Link
                  href={route('dashboard')}
                  className="px-5 py-2.5 font-semibold rounded-xl transition-all"
                  style={{
                    color: '#667eea',
                    background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.15)';
                  }}
                >
                  Dashboard
                </Link>
              </div>
            </div>

            {/* Mobile menu toggle (hamburger) */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() =>
                  setShowingNavigationDropdown((previousState) => !previousState)
                }
                className="inline-flex items-center justify-center rounded-xl p-2.5 transition-all"
                style={{
                  color: '#667eea',
                  background: '#f5f7fa'
                }}
                onMouseEnter={(e) => e.target.style.background = '#eef2ff'}
                onMouseLeave={(e) => e.target.style.background = '#f5f7fa'}
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                >
                  <path
                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                  <path
                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-gray-100'}>
          <div className="space-y-2 pb-4 pt-4 px-4">
            <Link
              href={route('dashboard')}
              className="block px-5 py-3 text-base font-semibold rounded-xl transition-all"
              style={{
                color: '#667eea',
                background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)'
              }}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Header (Optional) */}
      {header && (
        <header className="bg-white" style={{ 
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
          borderBottom: '1px solid #e8ecf1'
        }}>
          <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
            {header}
          </div>
        </header>
      )}

      {/* Main Page Content */}
      <main className="py-8">{children}</main>
    </div>
  );
}