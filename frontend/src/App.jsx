import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import ProfileLayout from "./pages/Dashboard/ProfileLayout";
import ServiceList from "./pages/Services/ServiceList";
import PageMissing from "./components/PageMissing";
import AppointmentList from "./pages/Dashboard/VendorAccount/Appointments/AppointmentList";
import ProfileSettings from "./pages/Dashboard/VendorAccount/Settings/ProfileSettings";
import RequestOfferPage from "#pages/Dashboard/VendorAccount/RequestOffer/RequestOfferPage.jsx";
import VendorDetails from "#pages/Vendors/Vendor/VendorDetails.jsx";
import VendorList from "#pages/Vendors/VendorList.jsx";
import { useSelector } from "react-redux";
import Appointments from "#pages/Dashboard/UserAccount/Appointments/Appointments.jsx";
import Settings from "#pages/Dashboard/UserAccount/Settings.jsx";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      {" "}
      <Header />
      <main className="">
        <Routes>
          <Route path="" element={<Home />} />

          <Route path="plumbers">
            <Route path="" element={<VendorList />} />
            <Route path=":id" element={<VendorDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<PrivateRoute allowedRoles={["USER", "VENDOR"]} />}>
            <Route path="/profile" element={<ProfileLayout />}>
              {currentUser && currentUser.role == "VENDOR" ? (
                <>
                  <Route path="" element={<AppointmentList />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </>
              ) : (
                <>
                  <Route path="" element={<Appointments />} />
                  <Route path="settings" element={<Settings />} />
                </>
              )}
            </Route>
            <Route path="/booking/:vendorId" element={<RequestOfferPage />} />
          </Route>
          <Route path="*" element={<PageMissing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
