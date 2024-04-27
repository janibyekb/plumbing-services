import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { IoNotifications } from "react-icons/io5";
import defaultImg from "#assets/images/default0.png";
import { ClockIcon } from "@heroicons/react/24/solid";
import { BsClock, BsClockFill } from "react-icons/bs";

export function NotificationsMenu() {
  return (
    <Menu>
      <MenuHandler>
        <button>
          <IoNotifications className="text-blue-700" size={30} />{" "}
        </button>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
          <figure className="w-10 h-10 rounded-full">
            <img className="w-full" src={defaultImg} alt="" />
          </figure>
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-semibold">
              Jack accepted your offer
            </Typography>
            <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
              <BsClockFill />
              23 minutes ago
            </Typography>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
