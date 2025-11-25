import React from "react";
import dp from "../assets/dp.png";
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../Redux/userSlice";

function Profile() {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  let [frontendImage, setfrontendImage] = useState(userData.image || dp);
  let [backendImage, setbackendImage] = useState(null);
  let [saving, setSaving] = useState(false);
  let image = useRef();
  let refname = useRef();
  let navigate = useNavigate();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setbackendImage(file);
    setfrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", refname.current.value);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserData(result.data));
      navigate("/");
    } catch (error) {
      setSaving(false);
    }
  };
  return (
    <div className="w-full h-screen bg-slate-200 flex flex-col justify-center items-center gap-5">
      <div className="fixed top-5 left-5 cursor-pointer ">
        <Link to={"/"}>
          <IoArrowBackOutline className="w-[30px] h-[30px]" />
        </Link>
      </div>
      <div
        className=" bg-white rounded-full border-[#20c7ff] border-2 shadow-gray-400 shadow-lg relative"
        onClick={() => {
          image.current.click();
        }}
      >
        <div className="w-[200px] h-[200px] overflow-hidden rounded-full flex justify-center items-center">
          <img src={frontendImage} alt="" className="w-full" />
        </div>
        <IoCameraOutline className="absolute bottom-4 right-5 w-7 h-7 text-gray-700 " />
      </div>
      <form
        action=""
        className="w-[95%] max-w-[500px] flex flex-col gap-5 items-center justify-center"
        onSubmit={handleProfile}
      >
        <input
          type="file"
          accept="image/*"
          hidden
          ref={image}
          onChange={handleImage}
        />
        <input
          ref={refname}
          type="text"
          defaultValue={userData?.name || ""}
          placeholder="Enter your name"
          className="w-full h-full outline-none  px-2.5 py-2.5 bg-white rounded-lg  text-[19px] focus:shadow-inner border-[#20c7ff] border-2"
        />
        <input
          type="text"
          value={userData?.username}
          readOnly
          className="w-full h-full outline-none text-gray-400 px-2.5 py-2.5 bg-white rounded-lg  text-[19px] focus:shadow-inner border-[#20c7ff] border-2"
        />
        <input
          type="email"
          value={userData?.email}
          readOnly
          className="w-full h-full outline-none text-gray-400 px-2.5 py-2.5 bg-white rounded-lg  text-[19px] focus:shadow-inner border-[#20c7ff] border-2"
        />
        <button
          className="w-[200px] px-5 py-2.5 bg-[#20c7ff] shadow-gray-200 shadow-lg rounded-2xl text-[20px] mt-5 font-semibold hover:shadow-inner cursor-pointer"
          disabled={saving}
        >
          {" "}
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

export default Profile;
