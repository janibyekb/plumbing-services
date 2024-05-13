import { useSelector } from "react-redux";
import VendorProfile from "./VendorAccount/VendorProfile";
import UserProfile from "./UserAccount/UserProfile";

export default function ProfileLayout() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="">
      {currentUser.role === "USER" && <UserProfile />}
      {currentUser.role === "VENDOR" && <VendorProfile />}{" "}
    </div>
  );
}
