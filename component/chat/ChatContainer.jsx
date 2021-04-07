import { Chat } from "./";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#777", 0.15),
    marginLeft: 0,
    width: "100%",
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
  },
}));

const ChatContainer = ({ followers, following, blocked, deviceWidth }) => {
  const classes = useStyles();
  const scrollRef = useRef(null);
  const chatScrollRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const selectedPersonScrollRef = useRef(null);
  const [filter, setFilter] = useState("following");
  const [filterSort, setFilterSort] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    selectedPersonScrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  const chatList = filter === "followers" ? followers : filter === "following" ? following : blocked;

  const selectPersonHandler = ({ handle }) => () => {
    if (deviceWidth < 960) {
      setSelectedPerson(handle);
      setMobile(true);
    } else {
      setSelectedPerson(handle);
    }
  };

  const setFilterSortFunc = () => {
    setFilterSort(!filterSort);
    if (!filterSort) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Chat
      {...{
        classes,
        chatList,
        selectPersonHandler,
        setFilter,
        mobile,
        selectedPerson,
        setFilterSortFunc,
        scrollRef,
        filterSort,
        followers,
        following,
        filter,
        blocked,
        chatScrollRef,
        setMobile,
        selectedPersonScrollRef,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    deviceWidth: state?.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
