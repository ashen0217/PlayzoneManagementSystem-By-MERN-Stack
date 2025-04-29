import React, { useState, useEffect } from 'react'
import Navbar from "./Navbar"
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MngBooking = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true)
        setError(null)

        if (!id) {
          // If no ID is provided, show a message and return
          setLoading(false)
          return
        }

        const response = await axios.get(`/api/bookings/${id}`)
        console.log('Booking API response:', response.data)
        
        // Check if the response has the booking data in the expected format
        if (response.data && response.data.booking) {
          setBooking(response.data.booking)
        } else {
          setError('Booking data not found in the expected format')
        }
      } catch (err) {
        console.error('Error fetching booking:', err)
        setError(err.response?.data?.message || 'Failed to fetch booking details')
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [id])

  const handleRequestEdit = async () => {
    if (!booking) return
    
    setIsSubmitting(true)
    
    try {
      // Create form data with the booking details and access key
      const formData = new FormData()
      formData.append("access_key", "ee2a13d2-c198-4c6f-95b6-826790c23996")
      formData.append("subject", "Booking Edit Request")
      formData.append("message", `User ${booking.username} (${booking.email}) has requested to edit their booking details. Booking ID: ${booking._id}`)
      formData.append("booking_id", booking._id)
      formData.append("username", booking.username)
      formData.append("email", booking.email)
      formData.append("package_type", booking.packageType)
      formData.append("date", new Date(booking.date).toLocaleDateString())
      formData.append("time_slot", booking.timeSlot)
      formData.append("status", booking.message)

      // Send the data to web3forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Edit request sent successfully! Admin will review your request.')
      } else {
        toast.error('Failed to send edit request. Please try again later.')
        console.error('Request error:', data)
      }
    } catch (error) {
      toast.error('Failed to send edit request. Please try again later.')
      console.error('Request error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-red-500 text-xl mb-4">Error</div>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!id) {
    return (
      <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Management</h2>
              <p className="text-gray-600 mb-4">Please select a booking to view its details.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar />
        <div className="max-w-2xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="text-red-500 text-xl mb-4">Booking Not Found</div>
              <p className="text-gray-600 mb-4">The requested booking could not be found.</p>
              <button
                onClick={() => navigate('/')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg8.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-6">

          <br /><br /><br />
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 p-2 border rounded bg-gray-50">
                {booking.username}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 p-2 border rounded bg-gray-50">
                {booking.email}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Package Type</label>
              <div className="mt-1 p-2 border rounded bg-gray-50">
                {booking.packageType}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="mt-1 p-2 border rounded bg-gray-50">
                {new Date(booking.date).toLocaleDateString()}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Time Slot</label>
              <div className="mt-1 p-2 border rounded bg-gray-50">
                {booking.timeSlot}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                  ${booking.message === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    booking.message === 'Confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'}`}>
                  {booking.message}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleRequestEdit}
              disabled={isSubmitting}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending Request...' : 'Request Edit'}
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MngBooking