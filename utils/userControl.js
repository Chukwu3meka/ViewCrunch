import cookies from "js-cookie";
import { useEffect, useState } from "react";

const useUser = () => {
  const [myRefresh, setMyRefresh] = useState("");

  const destroyCookie = () => {
    cookies.remove("ViewCrunch", { path: "" });
    // if (document.cookie) document.cookie = "ViewCrunch" + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  };
  // users should login after six months
  const saveCookie = (refreshToken) => cookies.set("ViewCrunch", refreshToken, { expires: 180, path: "" });

  useEffect(() => {
    const cookie = cookies.get("ViewCrunch");
    if (cookie) setMyRefresh(cookie);
  }, []);

  return { myRefresh, destroyCookie, saveCookie };
};

export default useUser;
