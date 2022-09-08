import DashBoard from "./components/UI/UserUI/Dashboard";
import { Route, Routes } from "react-router";
import FrontPage from "./components/FrontPage";
import UserBooking from "./components/UI/UserUI/functionsUI/User_Booking";
import DashBoardDietitian from "./components/UI/DietitianUI/Dashboard_dietitian";
import UserMain from "./components/UI/UserUI/functionsUI/User_Main";
import UserRecord from "./components/UI/UserUI/functionsUI/User_Record";
import UserPost from "./components/UI/UserUI/functionsUI/User_Post";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="dashboard" element={<DashBoard />}>
        <Route index element={<UserMain />} />
        <Route path="booking" element={<UserBooking />} />
        <Route path="history" element={<UserRecord />} />
        <Route path="reports" element={<p>Evaluation report</p>} />
        <Route path="posts" element={<UserPost />} />
        <Route path="account" element={<p>account</p>} />
      </Route>
      <Route path="dietitian" element={<DashBoardDietitian />}>
        <Route index element={<p>Diet home</p>} />
        <Route path="patients" element={<p>Diet bookings</p>} />
        <Route path="bookings" element={<p>Diet patients</p>} />
        <Route path="posts" element={<p>Diet Post</p>} />
        <Route path="account" element={<p>Diet ac</p>} />
      </Route>
    </Routes>
  );
}

export default App;
