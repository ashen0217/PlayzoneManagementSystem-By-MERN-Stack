import React from 'react'
import Navbar from './Navbar';


const Resources = () => {
    const [formData, setFormData] = useState({ type: "", Purpose: "", PurchaseDate: "", DistributeDate: "",});

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.type.trim()) {
            alert("Please enter your Name");
            newErrors.type = "Name is required.";
        }
        if (!formData.Purpose.trim()) {
            alert("Please enter the Email Address");
            newErrors.Purpose = "Email address is required."; 
        }
        if (!formData.PurchaseDate) {
            alert("Please enter the Age");
            newErrors.PurchaseDate = "Please enter the Age.";
        }
        if (!formData.DistributeDate) {
            alert("Please enter the Password");
            newErrors.DistributeDate = "Please enter the Passsword.";
        }
        else {
            alert("Form Submitted successfully");
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Type", type,"Purpose",Purpose,"PurchaseDate",PurchaseDate,"DistributeDate",DistributeDate);
      };


  return (
    <div className='container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden'>
      <Navbar/>
    <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Resources <span className='underline underline-offset-4 decoration-1 under font-light' id='Activities'>That We Implemented</span></h1>
    <p className='text-center text-gray-500 mb-8 max-w-80 mx-auto'>Choose as you wish</p>
    <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">SignUp</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Resource Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required placeholder="Enter the resource type"
            />
          </div>
          <div>
            <label className="block text-gray-700">Purpose</label>
            <input
              type="text"
              name="purpose"
              value={formData.Purpose}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required placeholder="What is the Purpose"
            />
          </div>
          <div>
            <label className="block text-gray-700"> Purchase Date</label>
            <input
              type="text"
              name="PurchaseDate"
              value={formData.PurchaseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required placeholder="Enter the purchase Date"
            />
          </div>
          <div>
            <label className="block text-gray-700">Enter the Distribute date</label>
            <input
              type="text"
              name="disDate"
              value={formData.DistributeDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required placeholder="Enter your Age"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={validateForm}
          >
            SignUp
          </button>
        </form>
        
      </div>






    </div>
  )
}

export default Resources