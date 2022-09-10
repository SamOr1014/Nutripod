import DashBoard from "./components/UI/UserUI/Dashboard";
import { Route, Routes } from "react-router";
import FrontPage from "./components/FrontPage";
import UserBooking from "./components/UI/UserUI/functionsUI/User_Booking";

import UserMain from "./components/UI/UserUI/functionsUI/User_Main";

import UserPost from "./components/Post";
import { Login } from "./components/Login";
import NotFound from "./components/404";
import UserMed from "./components/UI/UserUI/functionsUI/User_Med";
import UserBPBGRecord from "./components/UI/UserUI/functionsUI/User_Record";
import DashBoardDietitian from "./components/UI/DietitianUI/Dashboard_dietitian";
import DietitianMain from "./components/UI/DietitianUI/functionalUI/Dietitian_Main";
import PatientSearchPanel from "./components/UI/DietitianUI/functionalUI/Dietitian_patient_search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="dashboard" element={<DashBoard />}>
        <Route index element={<UserMain />} />
        <Route path="booking" element={<UserBooking />} />
        <Route path="history" element={<UserBPBGRecord />} />
        <Route path="reports" element={<UserMed></UserMed>} />
        <Route path="posts" element={<UserPost />} />
        <Route path="account" element={<UserAccount />} />
      </Route>
      <Route path="dietitian" element={<DashBoardDietitian />}>
        <Route index element={<DietitianMain />} />
        <Route path="patients" element={<PatientSearchPanel />} />
        <Route path="posts" element={<UserPost />} />
        <Route path="account" element={<p>Diet ac</p>} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
