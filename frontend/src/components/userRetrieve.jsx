import React from 'react'
import  {useState,useEffect} from "react";
import axios from 'axios';
import User from './User'

const URL = "http://Localhost:8000/Users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data)
}

const userRetrieve = () => {
  const [users, setUsers] = useState;
  useEffect(() =>{
    fetchHandler().then((data) => setUsers(data.users));
  },[])

  return (
    <div>
      <h1>user data display</h1>
      <div>
          {users && users.map((user, i) =>(
            <div key={i}>
              <User user={user} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default userRetrieve