import cookies from "js-cookie";
import firebase from "./firebaseClient";
import { useEffect, useState } from "react";

const useUser = () => {
  const [myRefresh, setMyRefresh] = useState("");

  const logout = async () => {
    cookies.remove("viewChest");
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const cookie = cookies.get("viewChest");
    if (cookie) setMyRefresh(cookie);
  }, []);

  return { myRefresh, logout };
};

export default useUser;
