import { Navbar } from "/";
import { useRouter } from "next/router";
import { connect } from "react-redux";
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
    router = useRouter(),
    // { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [currentTheme, setCurrentTheme] = useState(profile.myTheme || "light"),
    [selectedNavBar, setSelectedNavBar] = useState("https://ViewCrunch.com"),
    { myCoverPicture, myDisplayName, myProfession, myHandle, myProfilePicture, myNotification } = profile || [],
    navBar = [
      ["Home", "/", <HomeIcon />],
      // ["Chat", "/chat", <AssignmentIndIcon />],
      ["Favourite", "/favourite", <TimelineIcon />],
      ["My Crunch", "/crunch", <ImportantDevicesIcon />],
      ["Notification", "/notification", myNotification ? <NotificationsActiveIcon /> : <NotificationsOffIcon />],
      // ["Portfolio", `/${myHandle ? myHandle : "unauthenticated"}`, <AssignmentIndIcon />],
      ["NEWS", "/news", <AssignmentIndIcon />],
    ];
  const [deviceWidth, setDeviceWidth] = useState(props.deviceWidth);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  }, [props.deviceWidth]);

  useEffect(() => {
    const link = router.asPath.split("/"),
      linkLen = link.length;

    setSelectedNavBar(
      link[1] === ""
        ? "Home"
        : link[1] === "favourite"
        ? "Favourite"
        : link[1] === "news"
        ? "NEWS"
        : link[1] === "notification"
        ? "Notification"
        : linkLen === 2 && link[1].startsWith("@")
        ? "Portfolio"
        : linkLen === 3 && link[1] === "info"
        ? null
        : "My Crunch"
    );
  }, [router]);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setProfileAction({ ...profile, myTheme });
    online && fetcher("/api/profile/changeTheme", JSON.stringify({ myHandle, myTheme }));
  };

  return (
    <Navbar
      {...{
        navBar,
        myHandle,
        deviceWidth,
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
    deviceWidth: state.device.deviceWidth,
  }),
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
