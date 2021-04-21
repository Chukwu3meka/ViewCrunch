import cookies from "js-cookie";
import firebase from "./firebaseClient";
import { useEffect, useState } from "react";

const useUser = () => {
  const [myRefresh, setMyRefresh] = useState("");

  const logout = async () => {
    cookies.remove("ViewCrunch");
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const cookie = cookies.get("ViewCrunch");
    if (cookie) setMyRefresh(cookie);
  }, []);

  return { myRefresh, logout };
};

export default useUser;
