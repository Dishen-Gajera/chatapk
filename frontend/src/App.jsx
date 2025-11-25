import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import useCurrentUser from "./customHooks/useCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import userOtherUsers from "./customHooks/userOtherUsers";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { serverUrl } from "./main";
import { setOnlineUsers, setSocket } from "./Redux/userSlice";

function App() {
  useCurrentUser();
  userOtherUsers();
  let dispatch = useDispatch();

  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  useEffect(() => {
    if (!userData?._id) return;
    const socketio = io(`${serverUrl}`, {
      query: { userId: userData?._id },
    });
    dispatch(setSocket(socketio));

    socketio.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socketio.disconnect();
    };
  }, [userData]);

  return (
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/profile"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to={"/login"} />}
      />
    </Routes>
  );
}

export default App;
