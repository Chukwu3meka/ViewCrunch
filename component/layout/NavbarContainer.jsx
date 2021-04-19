import { Navbar } from "/";
import { connect } from "react-redux";
import { setTheme } from "@store/actions";
import { useState, useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";

import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

const NavbarContainer = (props) => {
  const { profile, setTheme } = props,
    [currentTheme, setCurrentTheme] = useState(props.theme),
    [selectedNavBar, setSelectedNavBar] = useState("https://viewchest.com"),
    { myCoverPicture, myDisplayName, myProfession, myHandle, myProfilePicture, myNotification, myRefresh } = profile || [],
    navBar = [
      ["Home", "/", <HomeIcon />],
      ["Favourite", "/favourite", <TimelineIcon />],
      ["Notification", "/notification", myNotification ? <NotificationsActiveIcon /> : <NotificationsOffIcon />],
      ["My Space", "/space", <ImportantDevicesIcon />],
      ["Portfolio", `/${myHandle ? myHandle : "unauthenticated"}`, <AssignmentIndIcon />],
      // ["Chat", "/chat", <AssignmentIndIcon />],
    ];

  useEffect(() => {
    setSelectedNavBar(window.location.pathname);
  }, []);

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setTheme(myTheme);
    props.online && fetcher("/api/profile/changeTheme", JSON.stringify({ myRefresh, myHandle, myTheme }));
  };

  return (
    <Navbar
      {...{
        navBar,
        myHandle,
        myProfession,
        myDisplayName,
        myNotification,
        selectedNavBar,
        myCoverPicture,
        myProfilePicture,
        setSelectedNavBar,
        currentThemeHandler,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    theme: state.device.theme,
    online: state.device.online,
    profile: state?.profile,
  }),
  mapDispatchToProps = { setTheme };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
