import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { capitalize } from "lodash";
import {
  BsCheckAll,
  BsGeoAlt,
  BsGeoAltFill,
  BsInfo,
  BsTrash,
} from "react-icons/bs";
import { IoReorderThree } from "react-icons/io5";
import DefaultImg from "#styles/default.png";
import { useState } from "react";

import { useSelector } from "react-redux";
import { BACKEND_PATH } from "#lib/utils";
import axios from "axios";
import { toast } from "react-toastify";

export default function AppointmentCard({ data, fetchData, onShowModal }) {
  console.log(data);
  const { currentUser } = useSelector((state) => state.user);

  const [appointmentModalShow, setAppointmentModalShow] = useState(false);

  async function updateJobStatus(data) {
    const status = data.status == "pending" ? "accepted" : "done";
    try {
      console.log("data: ", data.id);
      const response = await axios.patch(
        `${BACKEND_PATH}appointments/${data._id}`,
        {
          status: status,
        }
      );
      fetchData();
      if (response) {
        toast.success("Successfull");
        setTimeout(function () {}, 1500);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeJob = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_PATH}appointments/${data._id}`
      );
      setTimeout(function () {
        toast.success("Successfully removed");
        setLoading(false);
        fetchData();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message, {
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <div className="col-span-1">
        <img
          src={data.vendor.profileImageUrl || DefaultImg}
          alt=""
          className="w-100 h-100 rounded"
        />
      </div>
      <div className="col-span-4">
        <div className="flex justify-between mb-2">
          <div className="h4 fw-bold">{capitalize(data.vendor.name)}</div>
          <div>{new Date(data.createdAt).toLocaleString()}</div>
        </div>

        <div className="w-full flex justify-between">
          <div className="">{data.description}</div>
          <div>
            <Menu>
              <MenuHandler>
                <button>
                  <IoReorderThree size={40} />
                </button>
              </MenuHandler>
              <MenuList>
                <MenuItem
                  className="flex gap-2"
                  onClick={() => setAppointmentModalShow(true)}
                >
                  <BsInfo color="blue" size={25} />
                  More Info
                </MenuItem>
                {data.status != "active" && (
                  <MenuItem className="flex gap-2" onClick={removeJob}>
                    <BsTrash color="red" size={25} />
                    {data.status === "pending" ? "Cancel" : "Remove"}
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className="inline-flex gap-2 mt-4">
          <BsGeoAltFill size={25} color="green" />

          <div
            className="text-wrap "
            style={{
              overflowY: "auto",
              maxHeight: "40px",
              maxWidth: "300px",
            }}
          >
            <p>{data.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
