import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Payments from "./Payments";
import Bookings from "./Bookings";
import Complaints from "./Complaints";
import Users from "./Users";
import Resources from "./Resources";
import ResourceRetrieve from "./ResourceRetrieve";
import Events from "./Events";
import LoginForm from "../Login";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState({
    users: [],
    events: [],
    resources: [],
    loading: true,
    error: null,
  });

  const handleLogout = () => {
    // Remove all auth-related data from localStorage
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    
    // Redirect to login page
    navigate("/login");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData((prev) => ({ ...prev, loading: true }));

        // Fetch users data
        const usersResponse = await axios.get("http://localhost:8000/Users");
        const users = usersResponse.data.Users || [];

        // Fetch events data
        const eventsResponse = await axios.get("http://localhost:8000/Events");
        const events = eventsResponse.data.events || [];

        // Fetch resources data
        const resourcesResponse = await axios.get(
          "http://localhost:8000/Resources"
        );
        const resources = resourcesResponse.data.Resources || [];

        setDashboardData({
          users,
          events,
          resources,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setDashboardData((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to load dashboard data. Please try again later.",
        }));
      }
    };

    if (activeSection === "dashboard") {
      fetchDashboardData();
    }
  }, [activeSection]);

  

  const renderContent = () => {
    switch (activeSection) {
      case "payments":
        return <Payments />;
      case "bookings":
        return <Bookings />;
      case "complaints":
        return <Complaints />;
      case "users":
        return <Users />;
      case "resources":
        return <Resources />;
      case "resourceRetrieve":
        return <ResourceRetrieve />;
      case "events":
        return <Events />;
      case "login":
        return <LoginForm/>
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Admin Dashboard
            </h2>

            {dashboardData.loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : dashboardData.error ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {dashboardData.error}</span>
              </div>
              
            ) : (
              <>
                {/* Summary Cards */}
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {dashboardData.users.length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">
                      Active Events
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {dashboardData.events.length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">
                      Total Resources
                    </h3>
                    <p className="text-3xl font-bold text-red-600">
                      {dashboardData.resources.length}
                    </p>
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-2">
                      Active Bookings
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">0</p>
                  </div>
                  
                </div>

                

                {/* Recent Users Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Recent Users</h3>
                    <button
                      onClick={() => setActiveSection("users")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View All
                    </button>
                  </div>
                  {dashboardData.users.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dashboardData.users.slice(0, 5).map((user) => (
                            <tr key={user._id || user.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <img
                                      className="h-10 w-10 rounded-full"
                                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.name
                                      )}`}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {user.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {user.email}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    user.status === "Active"
                                      ? "bg-green-100 text-green-800"
                                      : user.status === "Inactive"
                                      ? "bg-gray-100 text-gray-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No users found.</p>
                  )}
                </div>

                {/* Upcoming Events Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Upcoming Events</h3>
                    <button
                      onClick={() => setActiveSection("events")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View All
                    </button>
                  </div>
                  {dashboardData.events.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Venue
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Participants
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dashboardData.events.slice(0, 5).map((event) => (
                            <tr key={event._id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {event.Venue}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {new Date(event.Date).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {event.Time}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {event.Participants}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No events found.</p>
                  )}
                </div>

                {/* Resources Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Resources</h3>
                    <button
                      onClick={() => setActiveSection("resourceRetrieve")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View All
                    </button>
                  </div>
                  {dashboardData.resources.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Resource
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Purpose
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Purchase Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {dashboardData.resources
                            .slice(0, 5)
                            .map((resource) => (
                              <tr key={resource._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {resource.resource}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {resource.resType}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {resource.Purpose}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {new Date(
                                      resource.PurchaseDate
                                    ).toLocaleDateString()}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No resources found.</p>
                  )}
                </div>
              </>
            )}
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
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
