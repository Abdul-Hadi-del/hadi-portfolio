import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "hadi.akram557@gmail.com"; // sirf ye email allowed hai

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Extra check: sirf admin ka email allowed hai
      if (result.user.email !== ADMIN_EMAIL) {
        await signOut(auth); // kisi aur ko turant logout kar do
        setError("Access denied. Ye account admin nahi hai.");
        return;
      }

      navigate("/admin-dashboard");
    } catch (err) {
      setError("Login failed. Email ya password galat hai.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-gray-800 p-8 rounded-lg w-80 flex flex-col gap-4"
      >
        <h2 className="text-white text-xl font-bold text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-3 rounded-md outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-3 rounded-md outline-none"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="p-3 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-bold transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;