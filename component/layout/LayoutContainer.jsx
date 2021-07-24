import { Layout } from "/";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { setUserAtBottom, setDisplayHeader, setDeviceWidth } from "@store/actions";

const LayoutContainer = (props) => {
  const scrollRef = useRef(null),
    [style, setStyle] = useState({}),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [userAtBottom, setUserAtBottom] = useState(false),
    { children, setDisplayHeader, setDeviceWidth, setAppTheme } = props;

  const pathname = useRouter().pathname;

  useEffect(() => {
    setAppTheme(props.theme);
    setStyle({
      "--pry": props.theme === "light" ? "#fff" : "#424242",
      "--sec": props.theme === "light" ? "#424242" : "#fff",
      "--dim": props.theme === "light" ? "#b1b1b18a" : "#ffffffb3",
      "--alt": props.theme === "light" ? "#fffffa" : "##9e9e9e",
    });
  }, [props.theme]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  });

  const userAtBottomHandler = (status) => {
    setUserAtBottom(status);
    props.setUserAtBottom(status);
  };

  const handleScroll = (e) => {
    // user at bottom
    if (!userAtBottom && e.target.clientHeight + 400 >= e.target.scrollHeight - e.target.scrollTop) userAtBottomHandler(true);
    if (userAtBottom && e.target.clientHeight + 400 < e.target.scrollHeight - e.target.scrollTop) userAtBottomHandler(false);

    // bottom scroll
    if (e.target.scrollTop > lastScrollPos) setDisplayHeader("hidden");
    if (e.target.scrollTop <= lastScrollPos) setDisplayHeader("visible");

    setLastScrollPos(e.target.scrollTop);
  };

  const scrollTop = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <Layout {...{ handleScroll, children, style, pathname, scrollRef, scrollTop }} />;
};

const mapStateToProps = (state) => ({
    theme: state.profile?.myTheme || "light",
  }),
  mapDispatchToProps = {
    setUserAtBottom,
    setDisplayHeader,
    setDeviceWidth,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
