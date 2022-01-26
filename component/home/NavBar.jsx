import Link from "next/link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  </NavContainer>
);

export default NavBar;
