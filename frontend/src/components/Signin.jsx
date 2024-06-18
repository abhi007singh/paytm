import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
          <h1 className="text-3xl font-bold text-center">Sign In</h1>
          <p className="text-gray-500 w-80 text-center">
            Enter your information to login to your account
          </p>
        </div>
        <form>
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
            onClick={async (e) => {
              e.preventDefault();
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
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
            Sign In
          </button>
        </form>
        <div className="text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup">
            <u>Signup</u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
