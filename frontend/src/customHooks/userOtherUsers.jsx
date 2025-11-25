import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../Redux/userSlice";

function userOtherUsers() {
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`${serverUrl}/api/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(response.data));
      } catch (error) {
      }
    }
    fetchUser();
  }, [userData]);
}

export default userOtherUsers;
