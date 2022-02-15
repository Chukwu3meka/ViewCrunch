import Link from "next/link";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { NavContainer } from "@component/layout";

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
