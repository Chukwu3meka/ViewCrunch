import Link from "next/link";
import Image from "next/image";

import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";

import { layoutStyles } from "/";

const Header = ({ classes, hidden, mobile }) => (
  <div className={hidden === "hidden" ? layoutStyles.headerHidden : layoutStyles.header}>
    {mobile ? (
      <Link href="/">
        <div>
          <Image src="/images/ViewCrunch.webp" layout="fill" alt="ViewCrunch" />
        </div>
      </Link>
    ) : (
      <div />
    )}
    <Link href="/">
      <Typography variant="h1">ViewCrunch</Typography>
    </Link>
    {mobile ? (
      <Toolbar>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    ) : (
      <span />
    )}
  </div>
);

export default Header;
