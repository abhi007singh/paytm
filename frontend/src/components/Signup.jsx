import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-700">
      <div className="m-auto bg-slate-50 px-7 py-4 text-lg rounded-xl gap-2">
        <div>
          <h1 className="text-3xl font-bold text-center">Sign Up</h1>
          <p className="text-gray-500 w-80 text-center">
            Enter your information to create an account
          </p>
        </div>
        <form>
          <label>
            <div className="mt-2 mb-1 text-md font-semibold">First Name</div>
            <input
              onChange={(e) => handleChange(e)}
              name="firstname"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="John"
              type="text"
              required
            />
          </label>
          <label>
            <div className="mt-2 mb-1 text-md font-semibold">Last Name</div>
            <input
              onChange={(e) => handleChange(e)}
              name="lastname"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="Doe"
              type="text"
              required
            />
          </label>
          <label>
            <div className="mt-2 mb-1 text-md font-semibold">Username</div>
            <input
              onChange={(e) => handleChange(e)}
              name="username"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="johndoe"
              type="text"
              required
            />
          </label>
          <label>
            <div className="mt-2 mb-1 text-md font-semibold">Password</div>
            <input
              onChange={(e) => handleChange(e)}
              name="password"
              className="w-full border border-slate-200 rounded py-2 px-3"
              placeholder="Password"
              type="password"
              required
            />
          </label>
          <button
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signup",
                { ...formData }
              );

              if (response.status !== 200) {
                alert("An error occured");
                console.log(response);
                return;
              } else {
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }
            }}
            className="bg-black text-white rounded text-md py-2 mt-4 w-full"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          Already have an account?{" "}
          <a href="/signin">
            <u>Login</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
