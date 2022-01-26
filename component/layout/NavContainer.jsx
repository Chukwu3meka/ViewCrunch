import { connect } from "react-redux";
import { useEffect, useState } from "react";

import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ContactUsIcon from "@material-ui/icons/ContactSupportOutlined";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

import { Nav } from ".";
import { fetcher } from "@utils/clientFunctions";
import { setProfileAction } from "@store/actions";

const NavbarContainer = (props) => {
  const { profile, setProfileAction, children } = props,
    [activeNav, setActiveNav] = useState("/"),
    [online, setOnline] = useState(props.online),
    { myHandle, myNotification } = profile || [],
    [currentTheme, setCurrentTheme] = useState(profile.myTheme || "light");

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    setActiveNav(window.location.pathname);
  }, []);

  const mainNav = [
    ["Home", "/", <HomeIcon />],
    ["Notification", "/notification", myNotification ? <NotificationsActiveIcon /> : <NotificationsOffIcon />],
    ["Favourite", "/favourite", <TimelineIcon />],
    ["Contact Us", "/info/contactus", <ContactUsIcon />],
    ["My Crunch", "/crunch", <ImportantDevicesIcon />],
    ["Portfolio", `/profile`, <AssignmentIndIcon />],
  ];

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setProfileAction({ ...profile, myTheme });
    online && fetcher("/api/profile/changeTheme", JSON.stringify({ myHandle, myTheme }));
  };

  return <Nav {...{ mainNav, activeNav, currentThemeHandler, myNotification, children }} />;
};

const mapStateToProps = (state) => ({
    profile: state?.profile,
    online: state.device.online,
    deviceWidth: state.device.deviceWidth,
  }),
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
