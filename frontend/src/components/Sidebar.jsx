import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dp from "../assets/dp.png";
import { IoIosSearch } from "react-icons/io";
import { Form, Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSearchedUsers,
  setselectedUser,
  setUserData,
} from "../Redux/userSlice";
import { setMessages } from "../Redux/messageSlice";
import { useEffect } from "react";

function Sidebar() {
  let { userData, otherUsers, selectedUser, onlineUsers, searchedUsers } =
    useSelector((state) => state.user);
  let [search, setSearch] = useState(false);
  let [input, setInput] = useState("");
  let dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      dispatch(setMessages([]));
    } catch (error) {
    }
  };

  const handleSearch = async () => {
    try {
      let searched = await axios.get(`${serverUrl}/api/user/search`, {
        params: { query: input },
        withCredentials: true,
      });
      dispatch(setSearchedUsers(searched.data));
    } catch (error) {
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    } else {
      dispatch(setSearchedUsers(null));
    }
  }, [input]);
  return (
    <div
      className={`lg:w-[30%] w-full h-screen bg-slate-100 ${
        selectedUser ? "hidden lg:block" : ""
      } lg:border-2 lg:border-slate-200`}
    >
      <div className="w-[55px] h-[55px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500= shadow-lg bg-[#20c7ff] cursor-pointer fixed bottom-4 left-1">
        <BiLogOutCircle className="w-[25px] h-[25px]" onClick={handleLogout} />
      </div>
      <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center  px-5">
        <h1 className="text-white font-bold text-[25px] ">DG Chat</h1>

        <div className="w-full flex justify-between items-center">
          <h1 className="text-gray-800 font-bold text-[25px] ">
            hii {userData.name || "user"}
          </h1>
          <div className="w-[55px] h-[55px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg">
            <Link to={"/profile"}>
              {" "}
              <img src={userData.image || dp} alt="" className="w-full" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {!search && (
            <div className="w-[55px] h-[55px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500= shadow-lg bg-white cursor-pointer">
              <IoIosSearch
                className="w-[25px] h-[25px]"
                onClick={() => setSearch(true)}
              />
            </div>
          )}

          {search && (
            <form className="w-full h-12 bg-white shadow-gray-500 shadow-lg flex items-center gap-4 mt-5 rounded-full overflow-hidden -ml-0.5">
              <IoIosSearch className="w-[29px] h-[29px] ml-2" />
              <input
                type="text"
                placeholder="search user...."
                className="w-full h-[29px] border-0 outline-0  pb-1 text-[17px]"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
              />
              <RxCross2
                className="text-[30px] mr-3 cursor-pointer"
                onClick={() => {
                  setSearch(false), setInput("");
                }}
              />
            </form>
          )}

          {!search &&
            otherUsers?.map(
              (user) =>
                onlineUsers?.includes(user._id) && (
                  <div className="relative">
                    <div className="w-[55px] h-[55px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-400 shadow-lg ">
                      <img
                        src={user.image || dp}
                        alt=""
                        className="w-full h-full
              "
                      />
                    </div>
                    <span className="w-3 h-3 rounded-full bg-[#3aff20]  absolute bottom-0.5 right-0.5 overflow-visible"></span>
                  </div>
                )
            )}
        </div>
      </div>
      <div className="w-full  h-[60vh] overflow-auto flex flex-col gap-5 mt-3 items-center">
        {searchedUsers &&
          searchedUsers?.map((user) => (
            <div
              className="w-[95%] h-[55px] bg-white shadow-gray-400 shadow-lg rounded-full flex gap-5 items-center hover:bg-slate-200 cursor-pointer"
              onClick={() => {
                setInput("");
                setSearch(false);
                dispatch(setselectedUser(user));
                dispatch(setSearchedUsers(null));
              }}
            >
              <div className="relative">
                <div className="w-[55px] h-[54px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg">
                  <img
                    src={user.image || dp}
                    alt=""
                    className="w-full h-full
              "
                  />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-3 h-3 rounded-full bg-[#3aff20]  absolute bottom-0 right-0.5 overflow-visible"></span>
                )}
              </div>
              <h1 className="font-semibold text-[20px] text-gray-800">
                {user.name || user.username}
              </h1>
            </div>
          ))}
        {!searchedUsers &&
          otherUsers?.map((user) => (
            <div
              className="w-[95%] h-[55px] bg-white shadow-gray-400 shadow-lg rounded-full flex gap-5 items-center hover:bg-slate-200 cursor-pointer"
              onClick={() => {
                setInput("");
                setSearch(false);
                dispatch(setselectedUser(user));
                dispatch(setSearchedUsers(null));
              }}
            >
              <div className="relative">
                <div className="w-[55px] h-[54px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg">
                  <img
                    src={user.image || dp}
                    alt=""
                    className="w-full h-full
              "
                  />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-3 h-3 rounded-full bg-[#3aff20]  absolute bottom-0 right-0.5 overflow-visible"></span>
                )}
              </div>
              <h1 className="font-semibold text-[20px] text-gray-800">
                {user.name || user.username}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
