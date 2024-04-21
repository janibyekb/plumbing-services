import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

import Home from "./pages/Home";
import Plumbers from "./pages/Plumbers/Plumbers";
import PlumberDetails from "./pages/Plumbers/PlumberDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Contact from "./pages/Contact";
import PrivateRoute from "./components/PrivateRoute";
import ProfileLayout from "./pages/Dashboard/ProfileLayout";
import ServiceList from "./pages/Services/ServiceList";
import PageMissing from "./components/PageMissing";
import AppointmentList from "./pages/Dashboard/PlumberAccount/Appointments/AppointmentList";
import ProfileSettings from "./pages/Dashboard/PlumberAccount/Settings/ProfileSettings";
import RequestOfferPage from "#pages/Dashboard/PlumberAccount/RequestOffer/RequestOfferPage.jsx";

function App() {
  return (
    <>
      {" "}
      <Header />
      <main className="">
        <Routes>
          <Route path="" element={<Home />} />

          <Route path="plumbers">
            <Route path="" element={<Plumbers />} />
            <Route path=":id" element={<PlumberDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/contact" element={<Contact />} />
          <Route element={<PrivateRoute allowedRoles={["user", "plumber"]} />}>
            <Route path="/profile" element={<ProfileLayout />}>
              <Route path="" element={<AppointmentList />} />
              <Route path="settings" element={<ProfileSettings />} />
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
