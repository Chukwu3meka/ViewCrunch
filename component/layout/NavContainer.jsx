import { Button, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { fetchNavCrunches } from "@utils/firestoreFetch";
import { useEffect, useState } from "react";
import { navStyles } from ".";
import ThemeIcon from "@material-ui/icons/EmojiObjects";

import Link from "next/link";
import { List, ListItem, IconButton, ListItemIcon, ListItemText, Badge } from "@material-ui/core";
import { connect } from "react-redux";

import HomeIcon from "@material-ui/icons/Home";
import TimelineIcon from "@material-ui/icons/Timeline";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ImportantDevicesIcon from "@material-ui/icons/ImportantDevices";
import NotificationsOffIcon from "@material-ui/icons/NotificationsOff";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { setProfileAction } from "@store/actions";
import SettingsIcon from "@material-ui/icons/Settings";

const NavbarContainer = (props) => {
  const { profile, setProfileAction } = props,
    // { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [currentTheme, setCurrentTheme] = useState(profile.myTheme || "light"),
    [selectedNavBar, setSelectedNavBar] = useState("https://ViewCrunch.com"),
    { myCoverPicture, myDisplayName, myProfession, myHandle, myProfilePicture, myNotification } = profile || [],
    [crunches, setCrunches] = useState([]);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    const getCrunches = async () => {
      const { crunches, error } = await fetchNavCrunches();
      if (!error) setCrunches(crunches);
    };

    getCrunches();
  }, []);

  const mainNav = [
    ["Home", "/", <HomeIcon />],
    ["Favourite", "/favourite", <TimelineIcon />],
    ["My Crunch", "/crunch", <ImportantDevicesIcon />],
    ["Notification", "/notification", <NotificationsActiveIcon />],
    ["Portfolio", `/profile`, <AssignmentIndIcon />],
    ["NEWS", "/news", <AssignmentIndIcon />],
  ];

  const currentThemeHandler = () => {
    const myTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(myTheme);
    setProfileAction({ ...profile, myTheme });
    online && fetcher("/api/profile/changeTheme", JSON.stringify({ myHandle, myTheme }));
  };

  return (
    <Grid item xs={12} sm={12} md={4}>
      <div className={navStyles.navigation}>
        <div>
          <Typography component="h2">DISCOVER WHAT MATTERS TO YOU</Typography>
          <div>
            {crunches.map(({ title, link }) => (
              <Link href={{ pathname: link }} key={link}>
                <Button variant="outlined" size="small">
                  {title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <Typography component="h2">MAIN NAVIGATION</Typography>
          <div>
            {mainNav.map(([label, link, icon], index) => (
              <Link href={{ pathname: link }} key={link}>
                <Button variant="outlined" size="small" startIcon={icon}>
                  {label}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <Link href="/settings">
            <span>
              <IconButton>
                <SettingsIcon fontSize="small" />
              </IconButton>
              <Typography variant="body2">Settings</Typography>
            </span>
          </Link>
          <ThemeIcon onClick={currentThemeHandler} style={{ cursor: "pointer" }} />
        </div>
      </div>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
    profile: state?.profile,
    online: state.device.online,
    deviceWidth: state.device.deviceWidth,
  }),
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer);
