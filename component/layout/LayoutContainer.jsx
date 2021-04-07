import { Layout } from "/";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setBottomScroll, setDisplayHeader, setDeviceWidth } from "@store/actions";

const LayoutContainer = (props) => {
  const [style, setStyle] = useState({}),
    [lastScrollPos, setLastScrollPos] = useState(0),
    [userAtBottom, setUserAtBottom] = useState(false),
    { children, setBottomScroll, setDisplayHeader, setDeviceWidth, setAppTheme } = props;

  // console.log(props.theme);

  const pathname = useRouter().pathname;

  useEffect(() => {
    setAppTheme(props.theme);
    setStyle({
      "--pry": props.theme === "light" ? "#fff" : "#424242",
      "--dim": props.theme === "light" ? "#0000008a" : "#ffffffb3",
      "--sec": props.theme === "light" ? "#424242" : "#fff",
    });
  }, [props.theme]);

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  });

  const handleScroll = (e) => {
    if (!userAtBottom && e.target.clientHeight + 1600 >= e.target.scrollHeight - e.target.scrollTop) {
      setUserAtBottom(true);
      setBottomScroll(true);
    } else {
      setBottomScroll(false);
    }

    if (e.target.scrollTop > lastScrollPos) {
      setDisplayHeader("hidden");
    } else {
      setDisplayHeader("visible");
      if (userAtBottom && e.target.clientHeight + 1600 < e.target.scrollHeight - e.target.scrollTop) {
        setUserAtBottom(false);
      }
    }
    setLastScrollPos(e.target.scrollTop);
  };

  return <Layout {...{ handleScroll, children, style, pathname }} />;
};

const mapStateToProps = (state) => ({
    theme: state.device?.theme || "light",
  }),
  mapDispatchToProps = {
    setBottomScroll,
    setDisplayHeader,
    setDeviceWidth,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
