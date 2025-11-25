import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import { setMessages } from "../Redux/messageSlice";


function useGetChat() {
  let { userData, selectedUser } = useSelector((state) => state.user);
  let dispatch = useDispatch();
  useEffect(() => {
    const fetchMessages = async () => {
      let response = await axios.get(
        `${serverUrl}/api/message/chat/${selectedUser._id}`,
        { withCredentials: true }
      );
      
      dispatch(setMessages(response.data));
    };
    fetchMessages();
  }, [userData, selectedUser]);
}

export default useGetChat;
