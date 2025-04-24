import React, { useState, useEffect } from "react";
import axios from "axios";

const URL = "http://localhost:8000/Users";

// Component to display a single user
const User = ({ user }) => {
  const { _id, name, email, age, gender, phone, password } = user;

  return (
    <div style={{ border: "1px solid gray", marginBottom: "10px", padding: "10px" }}>
      <h3>ID: {_id}</h3>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Age: {age}</p>
      <p>Gender: {gender}</p>
      <p>Phone: {phone}</p>
      <p>Password: {password}</p>
      <button>Update</button>
    </div>
  );
};

// Component to fetch and list all users
const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(URL);
        console.log("API response:", response.data);
        setUsers(response.data.Users);  // ✅ corrected key
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchHandler();
  }, []);
  
  
  

  return (
    <div>
      <h1>User List</h1>
        {Array.isArray(users) && users.length > 0 ? (
        users.map((user, index) => <User key={index} user={user} />)
        ) : (
        <p>Loading users...</p>
        )}

    </div>
  );
};

export default Users;
