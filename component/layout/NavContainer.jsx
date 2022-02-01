import { connect } from "react-redux";
import { useEffect, useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import PublicIcon from "@mui/icons-material/Public";
import TimelineIcon from "@mui/icons-material/Timeline";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactUsIcon from "@mui/icons-material/ContactSupportOutlined";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NewsIcon from "@mui/icons-material/NewspaperRounded";

import { Nav } from ".";
import { fetcher } from "@utils/clientFunctions";
import { setProfileAction } from "@store/actions";

const NavbarContainer = (props) => {
  const { profile, setProfileAction, children } = props,
    [activeNav, setActiveNav] = useState("/"),
    [online, setOnline] = useState(props.online),
    { myID, myNotification } = profile || [],
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
    ["Crunch", "/crunch", <ImportantDevicesIcon />],
    ["Bookmarks", "/favourite", <TimelineIcon />],
    ["Contact", "/info/contactus", <ContactUsIcon />],
    ["Profile", `/profile`, <AssignmentIndIcon />],
    ["Organization", "/organization", <PublicIcon />],
    ["NEWS", "/news", <NewsIcon />],
  ];

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setProfileAction({ ...profile, myTheme });
    online && fetcher("/api/profile/changeTheme", JSON.stringify({ myID, myTheme }));
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
