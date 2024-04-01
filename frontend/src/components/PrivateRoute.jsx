import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);

  console.log("current user", currentUser);

  const accessibleRoute = currentUser ? (
    //&& allowedRoles.includes(currentUser.role)
    <Outlet />
  ) : (
    <Navigate to="/login" replace={true} />
  );

  return accessibleRoute;
}
