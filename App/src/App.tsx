import DashBoard from "./components/parts/UI/UserUI/Dashboard";
import { Route, Routes } from "react-router";
import FrontPage from "./components/FrontPage";
import UserBooking from "./components/User_Booking";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FrontPage />} />
      <Route path="dashboard" element={<DashBoard />}>
        <Route index element={<p>0</p>} />
        <Route path="booking" element={<UserBooking />} />
        <Route path="posts" element={<p>2</p>} />
        <Route path="account" element={<p>3</p>} />
      </Route>
      {/* <Route path="dietitian" element={<DashBoard_Dietitians />}>
        <Route index element={<p>Diet home</p>} />
        <Route path="patients" element={<p>Diet home</p>} />
        <Route path="posts" element={<p>Diet patients</p>} />
        <Route path="account" element={<p>Diet ac</p>} />
      </Route> */}
    </Routes>
  );
}

export default App;
