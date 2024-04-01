import { Tab } from "@headlessui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function PlumberProfile() {
  const { currentUser: user } = useSelector((state) => state.user);

  const active = window.location.pathname.split("/").reverse().at(0);

  const navigate = useNavigate();
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10 pt-10 ">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex item-center justify-center ">
            <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
              <img
                src={user?.photo}
                alt=""
                className="w-full h-full rounded-full"
              />
            </figure>
          </div>
          <div className="text-center mt-4">
            <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
              Janibyek
            </h3>

            <p className="text-textColor text-[15px] leading-6 font-medium">
              Specialization:
              <span className="ml-2 text-headingColor text-[17px] leading-8">
                {user.specialization}
              </span>
            </p>

            <p className="text-textColor text-[15px] leading-6 font-medium">
              {user.email}
            </p>
            <p className="text-textColor text-[15px] leading-6 font-medium">
              Address:
              <span className="ml-2 text-headingColor text-[17px] leading-8">
                Budapest
              </span>
            </p>
          </div>
          <div className=" ">
            <button
              onClick={() => navigate("")}
              className={`${
                active === "profile" && "bg-primaryColor text-white font-normal"
              } p-2- mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
    leading-7 border border-solid border-primaryColor my-2 w-full`}
            >
              Appointments
            </button>
            <button
              onClick={() => navigate("calendar")}
              className={`${
                active === "calendar" &&
                "bg-primaryColor text-white font-normal"
              } p-2- mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
    leading-7 border border-solid border-primaryColor mb-2 w-full`}
            >
              Calendar
            </button>
            <button
              onClick={() => navigate("settings")}
              className={`${
                active === "settings" &&
                "bg-primaryColor text-white font-normal"
              }py-2  px-5 rounded-md text-headingColor font-semibold text-[16px]
    leading-7 border border-solid border-primaryColor w-full`}
            >
              Profile settings
            </button>
          </div>{" "}
        </div>

        <div className="md:col-span-2 md:px-[30px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
