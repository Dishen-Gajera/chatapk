import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../Redux/userSlice";

const useCurrentUser = () => {
  console.log("set user");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${serverUrl}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    console.log("set user 2");
    fetchUser();
  }, []);
};

export default useCurrentUser;
