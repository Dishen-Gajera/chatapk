import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";

function SenderMessage({ message, image, onImageClick }) {
  let scroll = useRef(null);
  let { userData } = useSelector((state) => state.user);

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);
  const handleOnLoad = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={scroll} className="flex justify-end mb-2">
      <div className="max-w-[65%] mr-1">
        <div
          className="bg-[#1797c2] text-white 
                        rounded-tl-xl rounded-bl-xl rounded-br-xl 
                        shadow-md overflow-hidden"
        >
          {image && (
            <img
              src={image}
              alt=""
              className="w-full max-w-[180px] h-auto object-cover cursor-pointer"
              onClick={() => onImageClick(image)}
              onLoad={handleOnLoad}
            />
          )}

          {message && <div className="px-3 py-1">{message}</div>}
        </div>
      </div>

      {/* Profile Image */}
      <div className="w-9 h-9 rounded-full overflow-hidden shadow-md">
        <img
          src={userData.image || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SenderMessage;
