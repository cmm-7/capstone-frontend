import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useStytchSession } from "@stytch/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Profile from "./Components/profile/Profile";
import EditProfile from "./Components/profile/EditProfile";
import "./App.css";
import HomeRedirect from "./Components/HomeRedirect";

import axios from "axios";
import Example from "./Components/CreateEventSlideOver";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import RecentViews from "./Components/RecentViews/RecentViews";

const libraries = ["places"];

function App() {
  const { session } = useStytchSession();
  const API = process.env.REACT_APP_API_URL;

  const [currentUser, setCurrentUser] = useState({
    stytch_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    username: "",
    about_me: "",
    interests: [],
    intra_extraversion: 50,
    phone_number: "0000000000",
    profile_pic: "",
    cover_photo: "",
  });

  useEffect(() => {
    // const currentUserID = session.user_id;
    if (session && session.authentication_factors.length >= 1) {
      userLogin(session.user_id);
    }
  }, [session, session?.session_id]);

  const userLogin = (stytch_id) => {
    return axios.get(`${API}/users/${stytch_id}`).then((res) => {
      let currentUserPreJSON = res.data;
      currentUserPreJSON.friends = currentUserPreJSON.friends || [];
      currentUserPreJSON.friends = currentUserPreJSON?.friends?.map((elem) =>
        JSON.parse(elem)
      );
      setCurrentUser(currentUserPreJSON);
    });
  };

  // if (!session || session.authentication_factors.length) {
  //   return null;
  // }

  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomeRedirect currentUser={currentUser} />}
            />

            {currentUser.id && (
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    API={API}
                    session={session}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    toast={toast}
                  />
                }
              />
            )}

            <Route path="/recently-viewed" element={<RecentViews />} />
            <Route
              path="/login"
              element={
                <Login
                  session={session}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  toast={toast}
                  userLogin={userLogin}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <SignUp
                  session={session}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  toast={toast}
                />
              }
            />
            <Route
              path="/profile/:id"
              element={<Profile currentUser={currentUser} session={session} />}
            />
            <Route
              path="/profile/:id/edit"
              element={
                <EditProfile
                  setCurrentUser={setCurrentUser}
                  session={session}
                  currentUser={currentUser}
                />
              }
            />
          </Routes>
        </main>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
