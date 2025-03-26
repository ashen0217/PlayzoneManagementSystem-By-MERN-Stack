import { useState } from "react";

export default function UploadForm() {
  const [formData, setFormData] = useState({ bank: "", branch: "", category: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Only image files are allowed." }));
        return;
      }
      setErrors((prev) => ({ ...prev, image: "" }));
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.bank.trim()) {
        alert("Please enter the Bank Name");
        newErrors.bank = "Bank name is required.";
    }
    if (!formData.branch.trim()) {
        alert("Please enter the Bank Branch");
        newErrors.branch = "Branch name is required.";
    }
    if (!formData.category) {
        alert("Please select the Package");
        newErrors.category = "Please select a package.";
    }
    if (!image) {
        alert("Please upload the Bank slip image");
        newErrors.image = "Bank slip is required.";
    }
    else {
        alert("Form Submitted successfully");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("bank", formData.bank);
    data.append("branch", formData.branch);
    data.append("category", formData.category);
    if (image) data.append("image", image);

    console.log("Form submitted", formData, image);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg7.jpg')" }} id="Payment">
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Payment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank</label>
            <input
              type="text"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            {errors.bank && <p className="text-red-500 text-sm">{errors.bank}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            {errors.branch && <p className="text-red-500 text-sm">{errors.branch}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Package</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            >
              <option value="">Select a Package</option>
              <option value="Water-Park package">Water-Park package</option>
              <option value="Combo package with main 5 activities">Combo package with main 5 activities</option>
              <option value="SuperCombo pkg with 10 activities">SuperCombo pkg with 10 activities</option>
              <option value="Children packages under 18">Children packages under 18</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Bank Slip</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 h-32 w-32 object-cover rounded-md"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={validateForm}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
