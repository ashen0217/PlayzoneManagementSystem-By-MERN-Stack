import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/Users/${id}`);
        console.log("Fetched user data:", res.data);

        if (res.data && res.data.Users) {
          setInputs({
            _id: res.data.Users._id || "",
            name: res.data.Users.name || "",
            email: res.data.Users.email || "",
            age: res.data.Users.age || "",
            gender: res.data.Users.gender || "",
            phone: res.data.Users.phone || "",
            password: res.data.Users.password || "",
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/Users/${id}`, {
        ...inputs,
        _id: id, // include this if your backend uses it to identify the user
      });
      navigate("/user-profile");
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(inputs).map(
          (key) =>
            key !== "_id" && (
              <div key={key}>
                <label className="block text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  type={key === "password" ? "password" : "text"}
                  name={key}
                  value={inputs[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder={`Enter your ${key}`}
                />
              </div>
            )
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
