import Link from "next/link";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SettingsIcon from "@mui/icons-material/Settings";
import ThemeIcon from "@mui/icons-material/EmojiObjects";

import { navStyles } from ".";

const Nav = ({ mainNav, activeNav, currentThemeHandler, myNotification, children }) => (
  <Grid item xs={12} sm={12} md={4}>
    <div className={navStyles.navigation}>
      <div>
        <Typography component="h2">MAIN NAVIGATION</Typography>
        <div>
          {mainNav.map(([label, link, icon]) => (
            <Link href={{ pathname: link }} key={link}>
              <a>
                <Chip
                  key={link}
                  label={label}
                  icon={
                    <Badge color="secondary" badgeContent={link === "/notification" && !!myNotification ? myNotification.length : null}>
                      {icon}
                    </Badge>
                  }
                  variant="outlined"
                  color={activeNav === link ? "secondary" : "info"}
                />
              </a>
            </Link>
          ))}
        </div>
      </div>
      {children}
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

export default Nav;

{
  /* <Button
              // color="inherit"
              size="small"
              variant="outlined"
              disabled={activeNav === link}
              startIcon={<Badge badgeContent={link === "/notification" && !!myNotification ? myNotification : null}>{icon}</Badge>}
              color="info">
              <Link href={{ pathname: link }} key={link}>
                <a>{label}</a>
              </Link>
            </Button> */
}
