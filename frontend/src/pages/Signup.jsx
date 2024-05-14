import { useState } from "react";

import signUpImg from "../assets/images/welcome.gif";

import { Link, useNavigate } from "react-router-dom";
import { uploadImageToCloudinary } from "../lib/uploadCloudinary";
import { BACKEND_PATH, convertToBase64 } from "../lib/utils";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import defaultImg from "#assets/images/default0.png";
import { Spinner } from "@material-tailwind/react";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",

    role: "USER",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BACKEND_PATH}auth/register`, formData);
      console.log(res);
      if (res.status === 201) {
        setLoading(false);
        toast.success("Success");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2">
          <div className="hidden lg:block md:block rounded-l-lg">
            <figure className="rounded-l-lg">
              <img src={signUpImg} alt="" className="w-full rounded-l-lg" />
            </figure>
          </div>

          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an account
            </h3>
            <form onSubmit={submitHandler} className="">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full  py-3 border-b border-solid border-[#0066ff61] focus:outline-none
              focus:border-b-primaryColor text-[16px] leading-7 text-headingColor
              placeholder:text-textColor  cursor-pointer"
                  required
                />
              </div>
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

              <div className="mb-5 flex items-center justify-between">
                <label
                  htmlFor=""
                  className="text-headingColor font-bold text-[16px] leading-7"
                >
                  Are you a:
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                  >
                    <option value="USER"> Regular User</option>
                    <option value="VENDOR"> Plumber</option>
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 "
                >
                  {loading ? (
                    <HashLoader
                      size="35"
                      color="#ffffff"
                      className="items-center"
                    />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <p className="mt-5 text-textColor text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primaryColor font-medium ml-1"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
