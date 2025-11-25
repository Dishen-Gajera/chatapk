import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { serverUrl } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../Redux/userSlice";

function SignUp() {
  let [show, setShow] = useState(false);
  let [status, setStatus] = useState(false);
  let [errorMessage, setErrorMessage] = useState();
  const refusername = useRef(null);
  const refemail = useRef(null);
  const refpassword = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(true);
    let username = refusername.current.value;
    let email = refemail.current.value;
    let password = refpassword.current.value;

    try {
      let response = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { username, email, password },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(setUserData(response.data));

      setStatus(false);
    } catch (error) {
      console.log(error.response.data.message);

      setStatus(false);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[19px]">
            Welcome to <span className="text-white"> DG Chat</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-5 items-center"
          onSubmit={handleSubmit}
        >
          <input
            required
            ref={refusername}
            type="text"
            placeholder="username"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-2.5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-[19px] focus:shadow-inner"
          />
          <input
            ref={refemail}
            type="email"
            placeholder="email"
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-2.5 py-2.5 bg-white rounded-lg shadow-gray-200 shadow-lg text-[19px] focus:shadow-inner"
            required
          />
          <div className="w-[90%] h-[50px]  relative  border-2 border-[#20c7ff] overflow-hidden shadow-gray-200 shadow-lg rounded-lg focus:shadow-inner">
            <input
              ref={refpassword}
              type={`${show ? "text" : "password"}`}
              placeholder="password"
              className="w-full h-full outline-none  px-2.5 py-2.5 bg-white rounded-lg  text-[19px] focus:shadow-inner"
            />
            <span
              className="absolute top-2.5 right-3 cursor-pointer text-[#20c7ff]"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "hidden" : "show"}
            </span>
          </div>
          {errorMessage && <p className="text-red-500">*{errorMessage}</p>}
          <button
            className="w-[200px] px-5 py-2.5 bg-[#20c7ff] shadow-gray-200 shadow-lg rounded-2xl text-[20px] mt-5 font-semibold hover:shadow-inner cursor-pointer"
            type="submit"
            disabled={status}
          >
            {status ? "Sign Up..." : "Sign Up"}
          </button>

          <p className="cursor-pointer">
            already have an account ?{" "}
            <span className="text-[#20c7ff] font-semibold">
              <Link to={"/login"}>Login </Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
