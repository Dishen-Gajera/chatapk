import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (error) {
      }
    }
    fetchUser();
  }, []);
};

export default useCurrentUser;
