import DashBoard from "./components/parts/UI/UserUI/Dashboard";
import { Route, Routes } from "react-router";
import FrontPage from "./components/FrontPage";
import UserBooking from "./components/parts/UI/UserUI/User_Booking";
import DashBoardDietitian from "./components/parts/UI/DietitianUI/Dashboard_dietitian";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="dashboard" element={<DashBoard />}>
        <Route index element={<p>MAIN</p>} />
        <Route path="booking" element={<UserBooking />} />
        <Route path="history" element={<p>BP BG</p>} />
        <Route path="reports" element={<p>Dietitian report</p>} />
        <Route path="posts" element={<p>POST</p>} />
        <Route path="account" element={<p>account</p>} />
      </Route>
      <Route path="dietitian" element={<DashBoardDietitian />}>
        <Route index element={<p>Diet home</p>} />
        <Route path="patients" element={<p>Diet patients</p>} />
        <Route path="posts" element={<p>Diet Post</p>} />
        <Route path="account" element={<p>Diet ac</p>} />
      </Route>
    </Routes>
  );
}

export default App;
