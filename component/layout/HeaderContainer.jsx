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
  const classes = useStyles(),
    [hidden, setHidden] = useState(false),
    [mobile, setMobile] = useState(false);

  useEffect(() => {
    setHidden(props.headerDisplay);
    setMobile(window.innerWidth >= 400);
  }, [props.headerDisplay]);

  return <Header {...{ classes, hidden, mobile }} />;
};

const mapStateToProps = (state) => ({
    headerDisplay: state.device.headerDisplay,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
