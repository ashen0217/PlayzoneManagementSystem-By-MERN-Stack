import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MngBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [editData, setEditData] = useState({
    packageType: '',
    date: '',
    timeSlot: '',
    specialRequests: ''
  });

  useEffect(() => {
    const fetchUserBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user email from localStorage or params
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userEmail = userData?.email || id;
        
        if (!userEmail) {
          throw new Error('User email not found');
        }

        // Call the correct endpoint
        const response = await axios.get(`http://localhost:8000/api/bookings/email/${userEmail}`);
        
        // Handle response
        if (response.data && response.data.success) {
          setBookings(response.data.bookings || []);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        
        // Handle specific error cases
        if (err.response) {
          if (err.response.status === 404) {
            setBookings([]);
            return;
          }
          setError(err.response.data?.message || 'Failed to fetch bookings');
        } else if (err.request) {
          setError('No response from server');
        } else {
          setError(err.message || 'Failed to fetch bookings');
        }
        
        toast.error(error || 'Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [id]);

  const handleRequestEdit = (booking) => {
    setCurrentBooking(booking)
    setEditData({
      packageType: booking.packageType,
      date: booking.date.split('T')[0],
      timeSlot: booking.timeSlot,
      specialRequests: booking.specialRequests || ''
    })
    setIsModalOpen(true)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const submitEditRequest = async () => {
    setIsSubmitting(true)
    try {
      const updatedBooking = {
        ...currentBooking,
        ...editData,
        message: 'Pending',
        status: 'edit-requested'
      }

      const response = await axios.put(
        `http://localhost:8000/api/bookings/${currentBooking._id}`,
        updatedBooking
      )

      setBookings(bookings.map(b => 
        b._id === currentBooking._id ? response.data.booking : b
      ))

      toast.success('Edit request submitted successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      setIsModalOpen(false)
    } catch (err) {
      console.error('Error submitting edit request:', err)
      toast.error(err.response?.data?.message || 'Failed to submit edit request', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="relative z-10">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Loading your bookings</h3>
              <p className="mt-1 text-sm text-gray-200">Please wait while we fetch your booking details</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="relative z-10">
          <Navbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white bg-opacity-90 rounded-xl shadow-sm p-6 sm:p-8 backdrop-blur-sm">
              <div className="text-center py-8">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">Error loading bookings</h3>
                <p className="mt-2 text-sm text-gray-700 max-w-md mx-auto">{error}</p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg8.jpg')" }}
      ></div>
      
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white bg-opacity-90 rounded-xl shadow-sm overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Your Bookings</h2>
                <p className="mt-1 text-sm text-gray-600">Manage your photography session bookings</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => navigate('/addbook')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  New Booking
                </button>
              </div>
            </div>
            
            {bookings.length === 0 ? (
              <div className="text-center py-16">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings</h3>
                <p className="mt-1 text-sm text-gray-600">You haven't made any bookings yet.</p>
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/addbook')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book a Session
                  </button>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <div key={booking._id} className="px-6 py-5 hover:bg-gray-50 transition-colors duration-150">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Name</label>
                          <div className="mt-1 text-sm font-medium text-gray-900">
                            {booking.username}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Email</label>
                          <div className="mt-1 text-sm text-gray-600">
                            {booking.email}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Package</label>
                          <div className="mt-1 text-sm font-medium text-gray-900">
                            {booking.packageType}
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</label>
                          <div className="mt-1 text-sm text-gray-600">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                            <span className="block">{booking.timeSlot}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">Status</label>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                              ${booking.message === 'Pending' || booking.status === 'edit-requested' ? 'bg-yellow-100 text-yellow-800' :
                                booking.message === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'}`}>
                              {booking.status === 'edit-requested' ? 'Edit Requested' : booking.message}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-2">
                          <button
                            onClick={() => handleRequestEdit(booking)}
                            disabled={isSubmitting}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                          >
                            Request Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Booking Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Request Booking Changes</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="packageType" className="block text-sm font-medium text-gray-700">Package Type</label>
                    <select
                      id="packageType"
                      name="packageType"
                      value={editData.packageType}
                      onChange={handleEditChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="timeSlot" className="block text-sm font-medium text-gray-700">Time Slot</label>
                    <select
                      id="timeSlot"
                      name="timeSlot"
                      value={editData.timeSlot}
                      onChange={handleEditChange}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                    >
                      <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
                      <option value="Afternoon (1PM-4PM)">Afternoon (1PM-4PM)</option>
                      <option value="Evening (5PM-8PM)">Evening (5PM-8PM)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">Special Requests</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={3}
                      value={editData.specialRequests}
                      onChange={handleEditChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={submitEditRequest}
                  disabled={isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : 'Submit Request'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MngBooking