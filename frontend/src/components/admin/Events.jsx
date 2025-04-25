import React, { useEffect, useState } from 'react';

const Events = () => {
  const [formData, setFormData] = useState({
    eventID: '',
    Date: '',
    Venue: '',
    Time: '',
    Participants: '',
    description: '',
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8000/Events');
      const data = await res.json();
      if (res.ok) setEvents(data.events);
    } catch (err) {
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { Date, Venue, Time, Participants, description } = formData;
    if (!Date || !Venue || !Time || !Participants || !description) {
      alert('Please fill all fields');
      return false;
    }
    if (isNaN(Participants)) {
      alert('Participants must be a number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:8000/Events/${editingId}`
      : 'http://localhost:8000/Events';

    const payload = {
      ...formData,
      eventID: editingId ? formData.eventID : Math.floor(Math.random() * 100000),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        alert(editingId ? 'Event updated!' : 'Event added!');
        setFormData({
          eventID: '',
          Date: '',
          Venue: '',
          Time: '',
          Participants: '',
          description: '',
        });
        setEditingId(null);
        fetchEvents();
      } else {
        alert('Error: ' + result.message);
      }
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (event) => {
    setEditingId(event._id);
    setFormData({
      eventID: event.eventID,
      Date: event.Date.slice(0, 10),
      Venue: event.Venue,
      Time: event.Time,
      Participants: event.Participants,
      description: event.description,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      const res = await fetch(`http://localhost:8000/Events/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.ok) {
        alert('Event deleted');
        fetchEvents();
      } else {
        alert('Delete failed: ' + result.message);
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div style={{ padding: '40px', background: '#f3f4f6' }} id="Events">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-gray-800">
        Upcoming <span className="text-blue-600">Events</span>
      </h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '40px' }}>
        Exciting Activities and Competitions at Our Playzone
      </p>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
        background: '#cbd5e1',
        padding: '30px',
        borderRadius: '20px'
      }}>
        {/* Display Events */}
        {!loading && events.length === 0 && (
          <p style={{ color: '#333' }}>No events found.</p>
        )}

        {!loading && events.map((event) => (
          <div
            key={event._id}
            style={{
              background: '#fff',
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '300px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: '600' }}>{event.Venue}</h2>
            <p>📅 {new Date(event.Date).toLocaleDateString()}</p>
            <p>🕒 {event.Time}</p>
            <p>👥 {event.Participants} participants</p>
            <p style={{ marginTop: '10px' }}>{event.description}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button onClick={() => handleEdit(event)} style={{ background: '#facc15', border: 'none', padding: '6px 10px', borderRadius: '5px' }}>
                Edit
              </button>
              <button onClick={() => handleDelete(event._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '5px' }}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            width: '100%'
          }}
        >
          <h2 style={{ fontSize: '22px', fontWeight: '600', textAlign: 'center', marginBottom: '20px' }}>
            {editingId ? 'Update Event' : 'Add Event'}
          </h2>

          <div style={{ marginBottom: '10px' }}>
            <label>Date</label>
            <input
              type="date"
              name="Date"
              value={formData.Date}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Venue</label>
            <input
              type="text"
              name="Venue"
              value={formData.Venue}
              onChange={handleChange}
              required
              placeholder="Venue"
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Time</label>
            <input
              type="time"
              name="Time"
              value={formData.Time}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Participants</label>
            <input
              type="number"
              name="Participants"
              value={formData.Participants}
              onChange={handleChange}
              required
              placeholder="Number of participants"
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Event description"
              style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              background: '#3b82f6',
              color: '#fff',
              padding: '10px',
              borderRadius: '6px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {editingId ? 'Update Event' : 'Add Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Events;
