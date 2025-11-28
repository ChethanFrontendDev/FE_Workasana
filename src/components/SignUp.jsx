import { useState } from "react";
import usePost from "../hooks/usePost";

const SignUp = () => {
  const { postHandler, success, loading, error } = usePost();

  const defaultFormValue = {
    username: "",
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(defaultFormValue);

  const onChange = (event) => {
    const { name, value } = event.target;

    setFormValue((prevValue) => ({
      ...prevValue,

      [name]: value,
    }));
  };

  const handleRegisterNewUser = async (event) => {
    event.preventDefault();
    try {
      await postHandler("/auth/signup", formValue);
      setFormValue(defaultFormValue);
    } catch (error) {}
  };

  return (
    <div className="">
      <h3 className="text-center mt-4">Register New User</h3>

      <div className="d-flex justify-content-center mt-3">
        <form
          style={{ maxWidth: "400px" }}
          className="w-100"
          onSubmit={handleRegisterNewUser}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              required
              type="text"
              id="name"
              name="username"
              value={formValue.username}
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formValue.email}
              className="form-control"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={formValue.password}
              className="form-control"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {loading ? "Registering" : "Register"}
          </button>

          {success && <div className="alert alert-success text-center my-2">{success}</div>}
          {error && <div className="alert alert-danger text-center my-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
