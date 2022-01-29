import Link from "next/link";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { NavContainer } from "@component/layout";

import Chip from "@mui/material/Chip";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import ThemeIcon from "@mui/icons-material/EmojiObjects";

const NavBar = ({ crunches }) => (
  <NavContainer>
    <div className={styles.nav}>
      <Typography component="h2">DISCOVER WHICH CRUNCH SUITS YOU</Typography>
      {crunches.length ? (
        <div>
          {crunches.map(({ title, link }) => (
            <Link href={{ pathname: link }} key={link}>
              <a>
                <Chip key={link} label={title} variant="outlined" color="info" />
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <Typography variant="body2">We're searching for suitable Crunches</Typography>
      )}
    </div>
  </NavContainer>
);

export default NavBar;
