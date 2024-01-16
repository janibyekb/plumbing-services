import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bookings from "./Bookings";
import Settings from "./Settings";
import { useBackendGet } from "../../../lib/hooks";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { currentUser: user } = useSelector((state) => state.user);

  const [data, fetchData] = useBackendGet(`users/bookings`);
  const [tab, setTab] = useState("bookings");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        <div className="grid md:grid-cols-3 gap-10 ">
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
                {user.email}
              </p>
              <p className="text-textColor text-[15px] leading-6 font-medium">
                Address:
                <span className="ml-2 text-headingColor text-[17px] leading-8">
                  Budapest
                </span>
              </p>
            </div>

            <div className="mt-[50px] md:mt-[100px]">
              <button
                onClick={handleSignOut}
                className="w-full bg-[#181a1e] p-3 text-[16px] leading-7 rounded-md text-white mb-2"
              >
                Logout
              </button>
              <button className="w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white">
                Delete Account
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px]">
            <div>
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-primaryColor text-white font-normal"
                } p-2- mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px]
                leading-7 border border-solid border-primaryColor`}
              >
                My bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white font-normal"
                }py-2  px-5 rounded-md text-headingColor font-semibold text-[16px]
                leading-7 border border-solid border-primaryColor`}
              >
                Profile settings
              </button>
            </div>

            {tab === "bookings" && <Bookings />}

            {tab === "settings" && <Settings />}
          </div>
        </div>
      </div>
    </section>
  );
}
