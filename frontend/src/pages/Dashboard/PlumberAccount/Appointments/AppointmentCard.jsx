import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { capitalize } from "lodash";
import { BsGeoAlt, BsGeoAltFill } from "react-icons/bs";
import { IoReorderThree } from "react-icons/io5";
import DefaultImg from "#styles/default.png";

export default function AppointmentCard({ data, fetchData, onShowModal }) {
  console.log(data);

  return (
    <div className="w-full grid grid-cols-5 gap-4">
      <div className="col-span-1">
        <img
          src={data.vendor.profileImgUrl || DefaultImg}
          alt=""
          className="w-100 h-100 rounded"
        />
      </div>
      <div className="col-span-4">
        <div className="flex justify-between mb-2">
          <div className="h4 fw-bold">{capitalize(data.user.name)}</div>
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
                <MenuItem>Menu Item 1</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
                <MenuItem>Menu Item 3</MenuItem>
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
