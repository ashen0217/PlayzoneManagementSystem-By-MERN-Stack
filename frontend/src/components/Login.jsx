import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleLogin = () => {
    console.log("Logging in with Google");
  };

  const handleFacebookLogin = () => {
    console.log("Logging in with Facebook");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{backgroundImage: "url('/bg2.png')"}} id="Login">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="text-right">
            <a href="#" className="text-blue-500 text-sm hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
        <div className="mt-4 space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Login with Google
          </button>
          <button
            onClick={handleFacebookLogin}
            className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Login with Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
