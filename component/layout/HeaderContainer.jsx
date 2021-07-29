import { Header } from "/";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("#777", 0.15),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HeaderContainer = (props) => {
  useEffect(() => {
    setHidden(props.headerDisplay);
    setSearchBar(window.innerWidth >= 400);
    setHamburger(window.innerWidth < 1280);
  }, [props.headerDisplay]);

  const classes = useStyles(),
    [hidden, setHidden] = useState(false),
    [anchorEl, setAnchorEl] = useState(null),
    [hamburger, setHamburger] = useState(false),
    [searchBar, setSearchBar] = useState(false),
    open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <Header {...{ classes, hidden, hamburger, handleMenu, anchorEl, handleClose, searchBar, open }} />;
};

const mapStateToProps = (state) => ({
    headerDisplay: state.device.headerDisplay,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
