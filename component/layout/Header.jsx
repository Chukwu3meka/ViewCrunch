import Link from "next/link";
import { headerStyles, NavbarContainer } from "/";

import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";

const Header = ({ classes, hidden, hamburger, handleMenu, anchorEl, handleClose, searchBar, open }) => (
  <div className={hidden === "hidden" ? headerStyles.headerHidden : headerStyles.header}>
    <div>
      {hamburger ? (
        <IconButton onClick={handleMenu} color="inherit">
          <MenuIcon color="primary" />
        </IconButton>
      ) : (
        <span />
      )}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleClose} style={{ padding: 0 }}>
          <NavbarContainer />
        </MenuItem>
      </Menu>
      <Link href="/">
        <Button style={{ textTransform: "none" }} component="h1" aria-label="ViewCrunch">
          ViewCrunch
        </Button>
      </Link>
    </div>
    {searchBar && (
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
    )}
  </div>
);

export default Header;
