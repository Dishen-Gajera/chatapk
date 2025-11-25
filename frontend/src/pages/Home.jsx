import React from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import useGetChat from "../customHooks/useGetChat";

function Home() {
  useGetChat();
  return (
    <div className="w-full h-screen flex overflow-hidden">
      <Sidebar />
      <MessageArea />
    </div>
  );
}

export default Home;
