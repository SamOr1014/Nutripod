import { Navigate } from "react-router";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export function UserPrivate() {
  const isLoggedInByUser = useSelector(
    (state: IRootState) => state.user.user[0].is_user
  );
  const isDietitian = useSelector(
    (state: IRootState) => state.user.dietitian[0].is_user
  );

  if (isLoggedInByUser === null || isDietitian === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default UserPrivate;
