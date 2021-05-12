import { Navbar } from "/";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";
import { setProfileAction } from "@store/actions";

import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

const NavbarContainer = (props) => {
  const { profile, setProfileAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [currentTheme, setCurrentTheme] = useState(profile.myTheme || "light"),
    [selectedNavBar, setSelectedNavBar] = useState("https://ViewCrunch.com"),
    { myCoverPicture, myDisplayName, myProfession, myHandle, myProfilePicture, myNotification } = profile || [],
    navBar = [
      ["Home", "/", <HomeIcon />],
      // ["Chat", "/chat", <AssignmentIndIcon />],
      ["Favourite", "/favourite", <TimelineIcon />],
      ["My Crunch", "/crunch", <ImportantDevicesIcon />],
      ["Portfolio", `/${myHandle ? myHandle : "unauthenticated"}`, <AssignmentIndIcon />],
      ["Notification", "/notification", myNotification ? <NotificationsActiveIcon /> : <NotificationsOffIcon />],
    ];

  useEffect(() => {
    setSelectedNavBar(window.location.pathname);
  }, []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setProfileAction({ ...profile, myTheme });
    online && fetcher("/api/profile/changeTheme", JSON.stringify({ myHandle, myTheme }));
  };

  if (online) enqueueSnackbar(`Back Online`, { variant: "info" });
  if (!online) enqueueSnackbar(`Connection lost`, { variant: "info" });

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
    profile: state?.profile,
    online: state.device.online,
  }),
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
