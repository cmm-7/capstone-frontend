import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useStytchSession } from "@stytch/react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Profile from "./Components/profile/Profile";
import EditProfile from "./Components/profile/EditProfile";
import LoadingScreen from "./Components/LoadingScreen";
import HomeRedirect from "./Components/HomeRedirect";
import RecentViews from "./Components/RecentViews/RecentViews";
import "./App.css";

function App() {
  const { session } = useStytchSession();
  const API = process.env.REACT_APP_API_URL;
  const hasCalledUserLogin = useRef(false);

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

  const userLogin = useCallback(
    (stytch_id) => {
      console.log("🔍 Fetching user data...");

      const fetchUserWithRetry = (attempt = 1, maxAttempts = 3) => {
        return axios
          .get(`${API}/users/${stytch_id}`)
          .then((res) => {
            console.log("✅ User authenticated successfully");
            let currentUserPreJSON = res.data;
            currentUserPreJSON.friends = currentUserPreJSON.friends || [];
            currentUserPreJSON.friends = currentUserPreJSON.friends.map(
              (elem) => {
                try {
                  return JSON.parse(elem);
                } catch (error) {
                  console.warn("⚠️ Failed to parse friend data:", elem);
                  return elem;
                }
              }
            );
            setCurrentUser(currentUserPreJSON);
            hasCalledUserLogin.current = false; // Reset after successful login
          })
          .catch((error) => {
            // If it's a 404 and we haven't exceeded max attempts, retry after a delay
            if (error.response?.status === 404 && attempt < maxAttempts) {
              console.log(
                `⏳ User data not ready, retrying in ${attempt}s... (${attempt}/${maxAttempts})`
              );
              return new Promise((resolve) => {
                setTimeout(() => {
                  fetchUserWithRetry(attempt + 1, maxAttempts).then(resolve);
                }, attempt * 1000); // Exponential backoff: 1s, 2s, 3s
              });
            }

            // If we've exhausted retries or it's not a 404, log the error
            console.error("❌ Failed to authenticate user:", error);
            hasCalledUserLogin.current = false; // Reset on error
            throw error;
          });
      };

      return fetchUserWithRetry();
    },
    [API, setCurrentUser]
  );

  // Reset user state when session is cleared
  useEffect(() => {
    if (!session && currentUser.id) {
      setCurrentUser({
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
      hasCalledUserLogin.current = false;
    }
  }, [session, currentUser.id, setCurrentUser]);

  useEffect(() => {
    if (
      session &&
      session.authentication_factors.length >= 1 &&
      session.user_id &&
      session.user_id.trim() !== "" &&
      (!currentUser.id || currentUser.id === "") &&
      session.user_id !== currentUser.stytch_id &&
      !hasCalledUserLogin.current
    ) {
      console.log("🔄 Authenticating user...");
      hasCalledUserLogin.current = true;
      userLogin(session.user_id);
    }
  }, [
    session?.session_id,
    session?.user_id,
    currentUser.id,
    currentUser.stytch_id,
    session,
    userLogin,
  ]);

  // Reset user state when session is cleared
  useEffect(() => {
    if (!session && currentUser.id) {
      setCurrentUser({
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
      hasCalledUserLogin.current = false;
    }
  }, [session, currentUser.id, setCurrentUser]);

  useEffect(() => {
    if (
      session &&
      session.authentication_factors.length >= 1 &&
      session.user_id &&
      session.user_id.trim() !== "" &&
      (!currentUser.id || currentUser.id === "") &&
      session.user_id !== currentUser.stytch_id &&
      !hasCalledUserLogin.current
    ) {
      console.log("🔄 Authenticating user...");
      hasCalledUserLogin.current = true;
      userLogin(session.user_id);
    }
  }, [
    session?.session_id,
    session?.user_id,
    currentUser.id,
    currentUser.stytch_id,
    session,
    userLogin,
  ]);

  // if (!session || session.authentication_factors.length) {
  //   return null;
  // }
  if (session && !currentUser.id) {
    return <LoadingScreen />;
  }

  return (
    <div className="App">
      <Router>
        <main>
          <Routes>
            <Route
              path="/"
              element={<HomeRedirect currentUser={currentUser} />}
            />

            <Route
              path="/dashboard"
              element={
                currentUser.id ? (
                  <Dashboard
                    API={API}
                    session={session}
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    toast={toast}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            <Route
              path="/profile/:id"
              element={
                currentUser.id ? (
                  <Profile
                    currentUser={currentUser}
                    session={session}
                    setCurrentUser={setCurrentUser}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/profile/:id/edit"
              element={
                currentUser.id ? (
                  <EditProfile
                    setCurrentUser={setCurrentUser}
                    session={session}
                    currentUser={currentUser}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

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
