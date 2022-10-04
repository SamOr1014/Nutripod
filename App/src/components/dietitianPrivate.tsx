import { Navigate } from "react-router";
import { IRootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export function DietitianPrivate() {
  const isLoggedInByDietitian = useSelector(
    (state: IRootState) => state.user.dietitian[0].is_user
  );
  const isUser = useSelector((state: IRootState) => state.user.user[0].is_user);

  if (isLoggedInByDietitian === null || isUser === true) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default DietitianPrivate;
