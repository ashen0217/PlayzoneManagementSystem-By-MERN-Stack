import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Payments from './Payments';
import Bookings from './Bookings';
import Complaints from './Complaints';
import Users from './Users';
import Resources from './Resources';
import ResourceRetrieve from './ResourceRetrieve';
import Events from './Events';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'payments':
        return <Payments />;
      case 'bookings':
        return <Bookings />;
      case 'complaints':
        return <Complaints />;
      case 'users':
        return <Users />;
      case 'resources':
        return <Resources />;
      case 'resourceRetrieve':
        return <ResourceRetrieve />;
      case 'events':
        return <Events />;
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
                <p className="text-3xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Pending Complaints</h3>
                <p className="text-3xl font-bold text-red-600">0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-purple-600">$0</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 