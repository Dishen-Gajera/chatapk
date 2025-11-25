import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";

function ReceiverMessage({ message, image, onImageClick }) {
  let scroll = useRef(null);
  let { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);
  const handleOnLoad = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={scroll} className="flex justify-start mb-2">
      {/* Profile Image */}
      <div className="w-9 h-9 rounded-full overflow-hidden shadow-md mr-1">
        <img
          src={selectedUser?.image || dp}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[65%]">
        <div
          className="bg-[#20c7ff] text-white 
                        rounded-tr-xl rounded-br-xl rounded-bl-xl 
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
    </div>
  );
}

export default ReceiverMessage;
