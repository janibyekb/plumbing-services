import axios from "axios";
import { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { BACKEND_PATH } from "../lib/utils.js";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.user);

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(signInStart());
    try {
      let { data } = await axios.post(`${BACKEND_PATH}auth/login`, formData);
      console.log(data);
      if (data) {
        dispatch(signInSuccess(data));

        toast.success("Success");
        navigate("/profile");
      }
    } catch (err) {
      console.log(err);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9  font-bold mb-10">
          Hello <span className="text-primaryColor">Welcome</span> back!
        </h3>

        <form action="" className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor  cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor  cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              Login
            </button>
          </div>
          <p className="mt-5 text-textColor text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
