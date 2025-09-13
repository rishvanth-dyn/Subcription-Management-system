import React, { useState, useContext } from "react";
import { loginUser } from "../../api/api"; // Your API function
import { AuthContext } from "../../context/AuthContext"; // Your context

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to "user"
  const { setAuthData } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password, role });
      setAuthData(data); // Save auth data (possibly including token and role)
      // Optionally route based on role
      // if (data.role === 'admin') { navigate("/admin/dashboard"); }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Login</h2>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        required
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
      />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
