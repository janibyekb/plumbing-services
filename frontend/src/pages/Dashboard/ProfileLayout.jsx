import { useSelector } from "react-redux";

import PlumberProfile from "./PlumberAccount/PlumberProfile";
import UserProfile from "./UserAccount/UserProfile";

export default function ProfileLayout() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="">
      {currentUser.role === "user" && <UserProfile />}
      {currentUser.role === "vendor" && <PlumberProfile />}{" "}
    </div>
  );
}
