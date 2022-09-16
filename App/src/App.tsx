import DashBoard from "./components/UI/UserUI/Dashboard";
import { Route, Routes } from "react-router";
import FrontPage from "./components/FrontPage";
import UserBooking from "./components/UI/UserUI/functionsUI/User_Booking";
import UserMain from "./components/UI/UserUI/functionsUI/User_Main";
import UserAccount from "./components/UI/UserUI/functionsUI/User_Account";
import UserPost from "./components/Post";
import { Login } from "./components/Login";
import NotFound from "./components/404";
import UserMed from "./components/UI/UserUI/functionsUI/User_Med";
import UserBPBGRecord from "./components/UI/UserUI/functionsUI/User_Record";
import DashBoardDietitian from "./components/UI/DietitianUI/Dashboard_dietitian";
import DietitianMain from "./components/UI/DietitianUI/functionalUI/Dietitian_Main";
import PatientSearchPanel from "./components/UI/DietitianUI/functionalUI/Dietitian_patient_search";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/store";
import { fetchDietitianDetail } from "./redux/Slice/dietitianSlice";
import { fetchTimeSlotToRedux } from "./redux/Slice/timeslotSlice";
import UserPrivate from "./components/userPrivate";
import DietitianPrivate from "./components/dietitianPrivate";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchDietitianDetail());
    dispatch(fetchTimeSlotToRedux());
  }, [dispatch]);
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />

      <Route path="dashboard" element={<UserPrivate />}>
        <Route element={<DashBoard />}>
          <Route index element={<UserMain />} />
          <Route path="booking" element={<UserBooking />} />
          <Route path="history" element={<UserBPBGRecord />} />
          <Route path="reports" element={<UserMed></UserMed>} />
          <Route path="posts" element={<UserPost />} />
          <Route path="post/:id" element={""} />
          <Route path="account" element={<UserAccount />} />
        </Route>
      </Route>

      <Route path="dietitian" element={<DietitianPrivate />}>
        <Route element={<DashBoardDietitian />}>
          <Route index element={<DietitianMain />} />
          <Route path="patients" element={<PatientSearchPanel />} />
          <Route path="posts" element={<UserPost />} />
          <Route path="register" element={"register"} />
          <Route path="account" element={<p>Diet ac</p>} />
        </Route>
      </Route>

      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
