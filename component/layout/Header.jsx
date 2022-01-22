import Link from "next/link";
import Image from "next/image";
import { headerStyles, NavbarContainer } from "/";

import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import { Typography } from "@material-ui/core";

const Header = ({ classes, hidden, hamburger, handleMenu, anchorEl, handleClose, searchBar, open }) => (
  <div className={hidden === "hidden" ? headerStyles.headerHidden : headerStyles.header}>
    <Link href="/">
      <Image src="/images/ViewCrunch.webp" height={30} width={30} alt="ViewCrunch" />
    </Link>
    <Link href="/">
      <Typography variant="h1">ViewCrunch</Typography>
    </Link>
    {searchBar ? (
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
