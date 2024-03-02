import MainPage from "./components/MainPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ConfirmReset from "./components/ConfirmReset";
import About from "./components/About";
import AnonEmail from "./components/AnonEmail";
import RouteGuard from "./components/RouteGuard";
import DeleteAccount from "./components/DeleteAccount";
// import Lab from "./components/Lab";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/Lab" element={<Lab />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Forgot-password" element={<ForgotPassword />} />
          <Route path="/Confirm-reset" element={<ConfirmReset />} />
          <Route
            path="/Main"
            element={
              <RouteGuard>
                <MainPage />
              </RouteGuard>
            }
          />
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route
            path="/About"
            element={
              <RouteGuard>
                <About />
              </RouteGuard>
            }
          />
          <Route
            path="/Email"
            element={
              <RouteGuard>
                <AnonEmail />
              </RouteGuard>
            }
          />
          <Route
            path="/Delete-Account"
            element={
              <RouteGuard>
                <DeleteAccount />
              </RouteGuard>
            }
          />
          <Route path="/Logout" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
