import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform authentication logic here (e.g., check credentials against a database)
    const isAuthenticated = true; // For this example, assume the user is authenticated

    if (isAuthenticated) {
      onLogin(); // Call the callback function passed from the parent component
    } else {
      // Handle authentication failure (e.g., show error message)
    }
  };

  return (
    <div className="login-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
