import { connect } from "react-redux";
import { useState, useEffect, useRef } from "react";

import { Layout } from "/";
import { setUserAtBottom, setDisplayHeader, setDeviceWidth } from "@store/actions";

const LayoutContainer = (props) => {
  const scrollRef = useRef(null),
    [style, setStyle] = useState({}),
    [scrollDir, setScrollDir] = useState("scrolling down"),
    { children, setDisplayHeader, setDeviceWidth, setAppTheme, setUserAtBottom } = props;

  const handleDeviceResize = () => setDeviceWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleDeviceResize);
    return () => window.removeEventListener("resize", handleDeviceResize);
  });

  // to enable dark/light theme
  useEffect(() => {
    setAppTheme(props.theme);

    setStyle({
      "--pry": props.theme === "light" ? "#DBD9D9" : "#424242",
      "--sec": props.theme === "light" ? "#ffffff" : "#0D0D1A",
      "--dim": props.theme === "light" ? "#b1b1b18a" : "#ffffffb3",
      "--opp": props.theme === "light" ? "#424242" : "#fff",
    });
  }, [props.theme]);

  // scroll direction and to detect when user is at the bottom
  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }

      // user at bottom
      setUserAtBottom(scrollY > lastScrollY && scrollY > window.innerHeight + 300);
      setScrollDir(scrollY > lastScrollY ? "scrolling down" : "scrolling up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    if (scrollDir === "scrolling up") {
      setDisplayHeader("hidden");
    } else {
      setDisplayHeader("visible");
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return <Layout children={children} style={style} scrollRef={scrollRef} />;
};

const mapStateToProps = (state) => ({
    theme: state.profile?.myTheme || "light",
  }),
  mapDispatchToProps = { setUserAtBottom, setDisplayHeader, setDeviceWidth };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
