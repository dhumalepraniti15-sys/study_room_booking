import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import AuthShell from "./AuthShell";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await register(data);

      console.log("REGISTER USER:", user);

      if (user.role === "admin") {
        nav("/admin/dashboard");
      } else {
        nav("/dashboard");
      }
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to create account."
      );
    }
  };

  return (
    <AuthShell
      title="Create your space."
      subtitle="Join VidyaVerse and make every study session count."
    >
      <form onSubmit={submit}>
        {error && <div className="error">{error}</div>}

        {/* Role */}

        <label>
          Register As

          <select
            value={data.role}
            onChange={(e) =>
              setData({
                ...data,
                role: e.target.value,
              })
            }
          >
            <option value="student">
              👤 Student
            </option>

          </select>
        </label>

        {/* Name */}

        <label>
          Full Name

          <input
            required
            minLength={2}
            value={data.name}
            onChange={(e) =>
              setData({
                ...data,
                name: e.target.value,
              })
            }
            placeholder="Your full name"
          />
        </label>

        {/* Email */}

        <label>
          Email

          <input
            required
            type="email"
            value={data.email}
            onChange={(e) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            placeholder="you@example.com"
          />
        </label>

        {/* Password */}

        <label>
          Password

          <span className="password">
            <input
              required
              minLength={8}
              type={show ? "text" : "password"}
              value={data.password}
              onChange={(e) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              }
              placeholder="At least 8 characters"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </span>
        </label>

        <button
          type="submit"
          className="button button-primary wide"
        >
          Create Account
        </button>

        <p className="form-switch">
          Already a member?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}