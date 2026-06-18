import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/api";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const register = async () => {

    try {

      await axios.post(
        "/auth/register",
        {
          name,
          email,
          password
        }
      );

      alert("Registration Successful");
      window.location.href = "/";
    } catch {
      alert(
        "Registration Failed"
      );
    }
  };

  return (
    <div className="container">
      <div className="card">

        <h1>
          Register
        </h1>

        <input
          placeholder="Name"
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button onClick={register}>
          Register
        </button>

        <p>
          <Link to="/">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;