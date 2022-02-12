import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const useUser = () => {
  const [myRefresh, setMyRefresh] = useState("");

  const destroyCookie = () => Cookies.remove("ViewCrunch", { path: "" });

  // users should login after six months
  const saveCookie = (refreshToken) => Cookies.set("ViewCrunch", refreshToken, { expires: 18, path: "" });

  useEffect(() => {
    const cookie = Cookies.get("ViewCrunch");
    if (cookie) setMyRefresh(cookie);
  }, []);

  return { myRefresh, destroyCookie, saveCookie };
};

export default useUser;
