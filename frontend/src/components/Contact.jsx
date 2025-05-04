import React from 'react'
import { toast } from 'react-toastify';
import Navbar from './Navbar2';

const Contact = () => {
    const [result, setResult] = React.useState("");
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = React.useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        setResult("Sending....");
        const formData = new FormData(event.target);
        formData.append("access_key", "ee2a13d2-c198-4c6f-95b6-826790c23996");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("");
                toast.success("Form Submitted Successfully");
                setFormData({ name: "", email: "", message: "" });
            } else {
                console.log("Error", data);
                toast.error(data.message);
                setResult("");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit form. Please try again.");
            setResult("");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundImage: "url('/bg7.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative">
                <Navbar />
                <br /><br /><br />
                <div className="max-w-4xl mx-auto px-4 py-20">
                    <div className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-90">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-center text-gray-800">
                            Contact <span className="text-blue-600">With Us</span>
                        </h1>
                        <p className="text-center text-gray-600 mb-8 max-w-md mx-auto">
                            Ready to Make a Move? Let us know if you want more information about our services.
                        </p>

                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Name
                                    </label>
                                    <input
                                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                                            errors.name ? "border-red-500 bg-red-50" : "border-amber-400 bg-amber-50"
                                        } focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-500`}
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Your Email
                                    </label>
                                    <input
                                        className={`w-full px-4 py-3 rounded-lg border-2 ${
                                            errors.email ? "border-red-500 bg-red-50" : "border-amber-400 bg-amber-50"
                                        } focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-500`}
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Your Message
                                </label>
                                <textarea
                                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                                        errors.message ? "border-red-500 bg-red-50" : "border-amber-400 bg-amber-50"
                                    } focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors placeholder-gray-500 h-40 resize-none`}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Enter your message"
                                />
                                {errors.message && (
                                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                                disabled={result === "Sending...."}
                            >
                                {result || "Send Message"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
