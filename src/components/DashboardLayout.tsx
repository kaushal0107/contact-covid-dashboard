import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar is your sidebar component

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    {/* Sidebar */}
    <Navbar />

    {/* Main Content */}
    <main className="flex-1 p-6 bg-gray-100">
      <Outlet /> {/* This will render the nested route components */}
    </main>
  </div>
  );
};

export default DashboardLayout;
