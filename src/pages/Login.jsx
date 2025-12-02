import axios from "axios";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignInPost = async (payload) => {
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://be-workasana-b65p.vercel.app/auth/login",
        payload
      );
      const success = response.data.message || "Signed in successfully.";
      setMessage(success);
      return response.data;
    } catch (err) {
      const failure = err.response.data.message;
      setError(failure);
      throw err;
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const payload = { email, password };

    try {
      const data = await handleSignInPost(payload);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setEmail("");
      setPassword("");

      navigate("/home/dashboard");
    } catch (error) {
      // setEmail("");
      // setPassword("");
    }
  };

  return (
    <>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        {message && (
          <div className="alert alert-success text-center">{message}</div>
        )}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        <h4 className="text-primary">Workasana</h4>
        <h2>Login to your account</h2>

        <form
          className="w-100 mt-4"
          style={{ maxWidth: "400px" }}
          onSubmit={handleSignIn}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>

          <div className="mt-3">
            <p className="text-primary mb-2">Register New User</p>
            <div>
              <NavLink className="btn btn-secondary w-100" to={"/signup"}>Sign Up</NavLink>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
