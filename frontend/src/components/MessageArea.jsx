import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import dp from "../assets/dp.png";
import { useDispatch, useSelector } from "react-redux";
import { setselectedUser } from "../Redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { serverUrl } from "../main";
import { setMessages, setRealTimeMessage } from "../Redux/messageSlice";
import { RxCross2 } from "react-icons/rx";

function MessageArea() {
  let { selectedUser, socket, onlineUsers } = useSelector(
    (state) => state.user
  );
  let { messages } = useSelector((state) => state.messages);
  let dispatch = useDispatch();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setfrontenImage] = useState("");
  let [backendImage, setBackendImage] = useState("");
  let image = useRef(null);
  let [showImage, setShowImage] = useState("");

  const onEmojiClick = (emojiData) => {
    setInput((prev) => prev + emojiData.emoji);
    setShowPicker(false);
  };
  const onImageChange = (e) => {
    let file = e.target.files[0];
    setfrontenImage(URL.createObjectURL(file));
    setBackendImage(file);
  };

  const onSendMessage = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      setInput("");
      setBackendImage("");
      setfrontenImage("");
      let response = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMessages([...messages, response.data]));
    } catch (error) {
      setInput("");
      setBackendImage("");
      setfrontenImage("");
    }
  };

  const handleOnImgClick = (image) => {
    setShowImage(image);
  };

  useEffect(() => {
    setShowImage("");
    setInput("");
    setBackendImage("");
    setfrontenImage("");
    const handleMessage = (mess) => {
      if (selectedUser?._id == mess.sender) {
        // receiver means who send message from another account because here receiver means opposite account who send message
        dispatch(setRealTimeMessage(mess));
      }
    };
    socket.off("newMessage");
    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
    };
  }, [selectedUser, socket]);

  return (
    <>
      {showImage && (
        <div
          className={`lg:w-[70%] w-full h-full bg-slate-100  ${
            !selectedUser && "hidden"
          }  px flex items-center justify-center relative px-4`}
        >
          <img
            src={showImage}
            alt=""
            srcset=""
            className="lg:w-[80%] lg:h-[80%] w-full h-[60%]"
          />
          <RxCross2
            className="text-2xl fixed top-3 right-3 cursor-pointer"
            onClick={() => setShowImage("")}
          />
        </div>
      )}
      <div
        className={`lg:w-[70%] w-full h-full bg-slate-100  ${
          !selectedUser ? "lg:flex hidden" : "block"
        } ${showImage ? "hidden" : "block"}  px-0.5 relative`}
      >
        {selectedUser && (
          <div className="flex flex-col w-full h-screen bg-slate-100 fixed top-0">
            <div className="w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-5 gap-4">
              <div className="cursor-pointer ">
                <IoArrowBackOutline
                  className="w-[30px] h-[30px] text-white"
                  onClick={() => {
                    setInput("");
                    setBackendImage("");
                    setfrontenImage("");
                    dispatch(setselectedUser(null));
                    dispatch(setMessages([]));
                  }}
                />
              </div>
              <div className="relative">
                <div className="w-[55px] h-[55px] overflow-hidden rounded-full flex justify-center items-center shadow-gray-500 shadow-lg">
                  <img
                    src={selectedUser?.image || dp}
                    alt=""
                    className="w-full h-full"
                  />
                  {onlineUsers?.includes(selectedUser._id) && (
                    <span className="w-3 h-3 rounded-full bg-[#3aff20]  absolute bottom-0.5 right-0.5 overflow-visible"></span>
                  )}
                </div>
              </div>
              <h1 className="text-white font-semibold text-[20px]">
                {selectedUser?.name || selectedUser?.username || "user"}
              </h1>
            </div>
            <div
              className={`w-full flex flex-col pt-3 px-1.5 overflow-auto bg-slate-100 mb-[90px] gap-2`}
            >
              {showPicker && (
                <div className="absolute bottom-[90px] left-4 z-10 ">
                  <EmojiPicker
                    width={300}
                    height={450}
                    onEmojiClick={onEmojiClick}
                  />
                </div>
              )}
              {messages &&
                messages.map((msg) => {
                  if (msg.sender == selectedUser._id) {
                    return (
                      <ReceiverMessage
                        image={msg.image}
                        message={msg.message}
                        onImageClick={handleOnImgClick}
                      />
                    );
                  } else {
                    return (
                      <SenderMessage
                        msgId={msg._id}
                        image={msg.image}
                        message={msg.message}
                        onImageClick={handleOnImgClick}
                      />
                    );
                  }
                })}
            </div>
            {frontendImage && (
              <div className=" lg:w-[68%] w-[96%] fixed bottom-20 right-0 bg-white p-1 rounded-lg mx-[2%]  lg:mx-[1%] flex justify-between">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-[120px] h-[100px] ml-[4%]"
                />

                <RxCross2
                  className="font-bold text-2xl mr-[2%]"
                  onClick={() => {
                    setBackendImage("");
                    setfrontenImage("");
                  }}
                />
              </div>
            )}
          </div>
        )}
        {!selectedUser && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <h1 className="text-gray-700 font-bold text-[50px]">
              Welcome to DG Chat
            </h1>
            <span className="text-gray-700 font-semibold text-[30px]">
              Chat friendly !
            </span>
          </div>
        )}
        {selectedUser && (
          <div className="w-full lg:w-[70%] h-[100px] fixed bottom-2 flex items-center justify-center -ml-0.5 ">
            <form
              className="w-[97%] h-[50px] bg-white rounded-full shadow-gray-400 shadow-lg flex items-center lg:gap-5 px-4 gap-2"
              onSubmit={onSendMessage}
            >
              <input
                type="file"
                name=""
                id=""
                accept="image/*"
                hidden
                ref={image}
                onChange={onImageChange}
              />
              <div onClick={() => setShowPicker((prev) => !prev)}>
                <RiEmojiStickerLine className="w-[25px] h-[25px] text-slate-500 cursor-pointer" />
              </div>
              <textarea
                type="text"
                className="bg-transparent w-full h-full focus:outline-none content-center px-1 resize-none py-[11px] cursor-pointer"
                placeholder="Message"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <div onClick={() => image.current.click()}>
                <FaImages className="w-[25px] h-[25px] text-slate-500 cursor-pointer" />
              </div>
              {(input || frontendImage) && (
                <button disabled={!input && !frontendImage}>
                  <RiSendPlane2Fill className="w-[25px] h-[25px] text-slate-500 cursor-pointer" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default MessageArea;
