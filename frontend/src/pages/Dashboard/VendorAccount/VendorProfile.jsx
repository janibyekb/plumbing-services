import { Tab } from "@headlessui/react";
import { Tabs, TabsHeader } from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { updateUserSuccess } from "../../../redux/user/userSlice";
import {
  CalendarDaysIcon,
  Cog8ToothIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { uploadImageToCloudinary } from "#lib/uploadCloudinary.js";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_PATH } from "#lib/utils.js";

export default function VendorProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const active = window.location.pathname.split("/").reverse().at(0);
  const navigate = useNavigate();

  console.log(currentUser);

  const handleStoreImage = async (image) => {
    try {
      const data = await uploadImageToCloudinary(image);

      if (data) {
        const result = await axios.patch(
          `${BACKEND_PATH}vendors/${currentUser._id}`,
          {
            profileImageUrl: data.url,
          }
        );

        dispatch(updateUserSuccess(result.data));
        toast.success("User profile updated");

        window.location.reload(false);
      }
    } catch (err) {
      toast.error("User information update failed!");
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);

      handleStoreImage(e.target.files[0]);
    }
  };
  return (
    <div className="max-w-[1170px] px-5 mx-auto">
      <div className="grid md:grid-cols-3 gap-10 pt-10 ">
        <div className="pb-[50px] px-[30px] rounded-md">
          <div className="flex item-center justify-center ">
            <figure className="w-[150px] h-[150px] rounded-full border-2 border-solid shadow-xl border-gray-300">
              <img
                onClick={() => fileRef.current.click()}
                style={{ cursor: "pointer" }}
                src={currentUser.profileImageUrl}
                alt=""
                className="w-full h-full rounded-full"
              />
              <input
                onChange={(e) => handleFileChange(e)}
                style={{ margin: "10px 0" }}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
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
                {currentUser.specialization}
              </span>
            </p>

            <p className="text-textColor text-[15px] leading-6 font-medium">
              {currentUser.email}
            </p>
            <p className="text-textColor text-[15px] leading-6 font-medium">
              Address:
              <span className="ml-2 text-headingColor text-[17px] leading-8">
                Budapest
              </span>
            </p>
          </div>
          <div className="flex justify-center">
            <Tabs value={active} orientation="vertical">
              <TabsHeader className="w-60 bg-white gap-3">
                <Tab.Group>
                  <Tab
                    key="profile"
                    value="profile"
                    className={`${
                      active === "profile" &&
                      "bg-gray-300 border border-gray-400"
                    } place-items-start p-2 rounded `}
                    //className="place-items-start"
                    onClick={() => navigate("")}
                  >
                    {" "}
                    <div className="flex items-center gap-2">
                      <Square3Stack3DIcon className="w-8 h-8" />
                      Appointments
                    </div>
                  </Tab>
                  <Tab
                    // onClick={() => navigate("calendar")}
                    key="calendar"
                    value="calendar"
                    className={`${
                      active === "calendar" &&
                      "bg-gray-300 border border-gray-400"
                    } place-items-start p-2 rounded `}
                  >
                    {" "}
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-8 h-8" />
                      Calendar
                    </div>
                  </Tab>
                  <Tab
                    key="settings"
                    value="settings"
                    className={`${
                      active === "settings" &&
                      "bg-gray-300 border border-gray-400"
                    } place-items-start p-2 rounded `}
                    onClick={() => navigate("settings")}
                  >
                    <div className="flex items-center gap-2">
                      <Cog8ToothIcon className="w-8 h-8" />
                      Settings
                    </div>
                  </Tab>{" "}
                </Tab.Group>
              </TabsHeader>
            </Tabs>
          </div>
        </div>

        <div className="md:col-span-2 md:px-[30px]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
