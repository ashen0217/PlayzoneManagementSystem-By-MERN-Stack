import React from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'payments', label: 'Payments', icon: '💰' },
    { id: 'bookings', label: 'Bookings', icon: '📅' },
    { id: 'complaints', label: 'Complaints', icon: '⚠️' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'resources', label: 'Resources', icon: '📦' },
    { id: 'resourceRetrieve', label: 'Resource List', icon: '📋' },
    { id: 'events', label: 'Events', icon: '🎉' },
    {id: 'login'}
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <div className="flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Admin Panel</span>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              activeSection === item.id
                ? 'bg-gray-700 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      
    </div>
    
  );
};

export default Sidebar; 