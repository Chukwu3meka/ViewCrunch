import Link from "next/link";

import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
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
            <Button
              key={link}
              size="small"
              variant="outlined"
              disabled={activeNav === link}
              startIcon={
                <Badge badgeContent={link === "/notification" && !!myNotification ? myNotification : null} color="secondary">
                  {icon}
                </Badge>
              }>
              <Link href={{ pathname: link }} key={link}>
                {label}
              </Link>
            </Button>
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
