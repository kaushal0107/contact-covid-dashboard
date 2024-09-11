import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Determine if a link is active
  const isActive = (path: string) => location.pathname === path ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white';

  // Close sidebar on route change
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]); // Remove isOpen from the dependency array

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative md:flex md:flex-col md:w-64">
      {/* Toggle Button for Mobile */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="text-gray-800 px-4 py-2 md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar */}
      <nav 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gray-800 p-4 space-y-6 w-64 md:relative ${isOpen ? 'block' : 'hidden md:block'} z-50`}>        {/* Close Button for Mobile */}
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white absolute top-4 right-4 md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-2xl font-semibold text-white mb-6">MyApp</h1>
        <ul className="flex flex-col space-y-2">
          <li>
            <Link 
              to="/" 
              className={`block p-3 rounded-md ${isActive('/')}`}
            >
              Contacts
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`block p-3 rounded-md ${isActive('/dashboard')}`}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
