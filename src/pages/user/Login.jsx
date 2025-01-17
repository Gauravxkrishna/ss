import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
// import bg from "../assets/bg-login.png";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const navigate = useNavigate();
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });
  const changeHandler = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(userLog);
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/login",
        userLog
      );
      if (response.data.user.role === "teacher") {
        navigate("/homeTeacher")
      }
      if (response.data.user.role === "Admin") {
        navigate("/adminPanel")
      }
      if (response.data.user.role === "Student") {
        navigate("/homeStudent")
      }
      toast.success(response.data.message);
      setUserLog(response.data.user)
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-200" >

      <div className="bg-white  shadow-md rounded-lg px-8 py-6 max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">
          Welcome User!
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-start"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={userLog.email}
              id="email"
              onChange={changeHandler}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-start dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userLog.password}
              id="password"
              onChange={changeHandler}
              className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
            <Link
              href="#"
              className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                checked
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/signup"
              className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Account
            </Link>
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
