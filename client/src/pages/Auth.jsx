import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Auth = () => {
  const [state, setState] = React.useState("login");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (state === "register") {
      handleRegister();
    } else {
      handleLogin();
    }
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      user => user.email === formData.email
    );

    if (userExists) {
      setError("User already exists");
      return;
    }

    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    setState("login");
    setFormData({ name: "", email: "", password: "" });
    alert("Registration successful! Please login.");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(
      user =>
        user.email === formData.email &&
        user.password === formData.password
    );

    if (!validUser) {
      setError("Invalid email or password");
      return;
    }

    login(validUser); // ✅ context handles session
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center bg-gray-900 border border-gray-800 rounded-2xl px-8 py-10"
      >
        <h1 className="text-white text-3xl font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Please sign in to continue
        </p>

        {error && (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        )}

        {state !== "login" && (
          <div className="mt-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-gray-800 text-white p-3 rounded-full outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="mt-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full bg-gray-800 text-white p-3 rounded-full outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-gray-800 text-white p-3 rounded-full outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState(prev =>
              prev === "login" ? "register" : "login"
            )
          }
          className="text-gray-400 text-sm mt-4 cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-indigo-400 ml-1">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Auth;