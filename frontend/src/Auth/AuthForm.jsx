import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import api from "../lib/axios";
import "./Auth.css";

const AuthForm = ({ type }) => {
  const isRegister = type === "register";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const { name, username, email, phoneNumber, password } = form;
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";

      const response = await api.post(endpoint, form);

      const data = response.data;

      dispatch(
        loginSuccess({
          accessToken: data.accesstoken,
          user: data.user,
        }),
      );

      isRegister ? navigate("/login") : navigate("/");
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 404) {
        setError(message);

        setTimeout(() => {
          navigate("/register");
        }, 2000);

        return;
      }

      setError(message || "Something went wrong");
    }
  }
  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>{isRegister ? "Create Account" : "Login"}</h1>

        {isRegister && (
          <>
            <input
              name="name"
              placeholder="Full Name"
              autoComplete="name"
              value={name}
              onChange={handleChange}
            />

            <input
              name="username"
              placeholder="Username"
              autoComplete="username"
              value={username}
              onChange={handleChange}
            />

            <input
              name="phoneNumber"
              placeholder="Phone Number"
              autoComplete="tel"
              value={phoneNumber}
              onChange={handleChange}
            />
          </>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          value={password}
          onChange={handleChange}
        />

        {error && <p className="auth-error">{error}</p>}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}

          <span
            onClick={() => {
              isRegister ? navigate("/login") : navigate("/register");
            }}
          >
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
