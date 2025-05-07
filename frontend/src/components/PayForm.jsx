import { useState } from "react";
import Navbar from "./Navbar";

export default function PayForm() {
  const [formData, setFormData] = useState({
    userName: "",
    accountNo: "",
    bankName: "",
    branch: "",
    package: "",
    amount: "",
    cnfStatus: "pending",
    image: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Only image files are allowed.",
        }));
        setAlertMessage({
          type: "error",
          message: "Please upload an image file (JPEG, PNG, etc.)",
        });
        return;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size should be less than 5MB.",
        }));
        setAlertMessage({
          type: "error",
          message: "Image size should be less than 5MB",
        });
        return;
      }
      setErrors((prev) => ({ ...prev, image: "" }));
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setAlertMessage({
        type: "success",
        message: "Image uploaded successfully",
      });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // User Name validation
    if (!formData.userName.trim()) {
      newErrors.userName = "User name is required.";
      isValid = false;
    } else if (formData.userName.length < 3) {
      newErrors.userName = "User name must be at least 3 characters long.";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(formData.userName)) {
      newErrors.userName = "User name can only contain letters and spaces.";
      isValid = false;
    }

    // Bank validation
    if (!formData.bankName) {
      newErrors.bankName = "Bank name is required.";
      isValid = false;
    }

    // Branch validation
    if (!formData.branch.trim()) {
      newErrors.branch = "Branch name is required.";
      isValid = false;
    } else if (formData.branch.length < 3) {
      newErrors.branch = "Branch name must be at least 3 characters long.";
      isValid = false;
    }

    // Package validation
    if (!formData.package) {
      newErrors.package = "Please select a package.";
      isValid = false;
    }

    // Amount validation
    if (!formData.amount) {
      newErrors.amount = "Amount is required.";
      isValid = false;
    } else if (isNaN(formData.amount)) {
      newErrors.amount = "Amount must be a valid number.";
      isValid = false;
    } else if (formData.amount <= 0) {
      newErrors.amount = "Amount must be greater than 0.";
      isValid = false;
    }

    // Image validation
    if (!image) {
      newErrors.image = "Bank slip is required.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      setAlertMessage({
        type: "error",
        message: "Please correct the errors in the form before submitting.",
      });
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const data = new FormData();
    data.append("userName", formData.userName);
    data.append("accountNo", Number(formData.accountNo));
    data.append("bank", formData.bankName);
    data.append("branch", formData.branch);
    data.append("package", formData.package);
    data.append("amount", Number(formData.amount));
    data.append("cnfStatus", formData.cnfStatus);
    if (image) data.append("slip", image);

    try {
      setAlertMessage({
        type: "info",
        message: "Submitting payment details...",
      });
      const response = await fetch("/api/Payments", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        setAlertMessage({
          type: "success",
          message: result.message || "Payment details submitted successfully!",
        });
        // Reset form
        setFormData({
          userName: "",
          accountNo: "",
          bankName: "",
          branch: "",
          package: "",
          amount: "",
          cnfStatus: "pending",
          image: "",
        });
        setImage(null);
        setPreview(null);
      } else {
        let errorMessage =
          "Failed to submit payment details. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, keep the default error message
        }
        setAlertMessage({
          type: "error",
          message: errorMessage,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setAlertMessage({
        type: "error",
        message:
          "Error submitting payment details. Please check your connection and try again.",
      });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-100"
      style={{ backgroundImage: "url('/bg7.jpg')" }}
      id="Payment"
    >
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Upload Payment Details</h2>

        {/* Alert Message */}
        {alertMessage.message && (
          <div
            className={`mb-4 p-4 rounded-md ${
              alertMessage.type === "error"
                ? "bg-red-100 text-red-700"
                : alertMessage.type === "success"
                ? "bg-green-100 text-green-700"
                : alertMessage.type === "info"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {alertMessage.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName || ""}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.userName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your full name"
              required
            />
            {errors.userName && (
              <p className="text-red-700 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 text-left">
              Bank Account Number
            </label>
            <input
              type="text"
              name="accountNo"
              value={formData.accountNo || 0}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.accountNo ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your bank account number"
              required
            />
            {errors.accountNo && (
              <p className="text-red-700 text-sm mt-1">{errors.accountNo}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bank
            </label>
            <select
              name="bankName"
              value={formData.bankName || ""}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.bankName ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select a Bank</option>
              <option value="Commercial">Commercial</option>
              <option value="Sampath">Sampath</option>
              <option value="HNB">HNB</option>
              <option value="BOC">BOC</option>
            </select>
            {errors.bankName && (
              <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch || ""}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.branch ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter branch name"
              required
            />
            {errors.branch && (
              <p className="text-red-500 text-sm mt-1">{errors.branch}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Package
            </label>
            <select
              name="package"
              value={formData.package || ""}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.package ? "border-red-500" : "border-gray-300"
              }`}
              required
            >
              <option value="">Select a Package</option>
              <option value="Water-Park package">Water-Park package</option>
              <option value="Combo package with main 5 activities">
                Combo package with main 5 activities
              </option>
              <option value="SuperCombo pkg with 10 activities">
                SuperCombo pkg with 10 activities
              </option>
              <option value="Children packages under 18">
                Children packages under 18
              </option>
            </select>
            {errors.package && (
              <p className="text-red-500 text-sm mt-1">{errors.package}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount || 0}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                errors.amount ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
            />
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmation Status
            </label>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                <input
                  type="radio"
                  value="yes"
                  name="cnfStatus"
                  checked={formData.cnfStatus === "yes"}
                  onChange={handleChange}
                />
                Yes
              </label>
              <label className="block text-sm font-medium text-gray-700">
                <input
                  type="radio"
                  value="no"
                  name="cnfStatus"
                  checked={formData.cnfStatus === "no"}
                  onChange={handleChange}
                />
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Bank Slip
            </label>
            <div
              className={`mt-1 border-2 border-dashed rounded-md p-6 text-center ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add("border-blue-500");
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove("border-blue-500");
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove("border-blue-500");
                const file = e.dataTransfer.files[0];
                if (file) {
                  const event = { target: { files: [file] } };
                  handleImageChange(event);
                }
              }}
            >
              <div className="space-y-1">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md mx-auto"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Preview of uploaded image
                  </p>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}
