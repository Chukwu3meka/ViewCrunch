import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import ThemeIcon from "@material-ui/icons/EmojiObjects";

import { navStyles } from ".";

const Nav = ({ mainNav, activeNav, crunches, currentThemeHandler, myNotification }) => (
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
      <div>
        <Typography component="h2">DISCOVER WHICH CRUNCH SUITS YOU</Typography>
        {crunches.length ? (
          <div>
            {crunches.map(({ title, link }) => (
              <Link href={{ pathname: link }} key={link}>
                <Button variant="outlined" size="small">
                  {title}
                </Button>
              </Link>
            ))}
          </div>
        ) : (
          <Typography variant="body2">We're searching for suitable Crunches</Typography>
        )}
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

export default Nav;
