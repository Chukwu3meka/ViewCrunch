import { Layout } from "/";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { setUserAtBottom, setDisplayHeader, setDeviceWidth } from "@store/actions";

const LayoutContainer = (props) => {
  const scrollRef = useRef(null),
    [style, setStyle] = useState({}),
    [scrollDir, setScrollDir] = useState("scrolling down"),
    { children, setDisplayHeader, setDeviceWidth, setAppTheme, setUserAtBottom } = props;

  useEffect(() => {
    setDeviceWidth(window.innerWidth);
  });

  // to enable dark/light theme
  useEffect(() => {
    setAppTheme(props.theme);
    setStyle({
      "--pry": props.theme === "light" ? "#fff" : "#424242",
      "--sec": props.theme === "light" ? "#424242" : "#fff",
      "--dim": props.theme === "light" ? "#b1b1b18a" : "#ffffffb3",
      "--alt": props.theme === "light" ? "#fffffa" : "##9e9e9e",
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
      setUserAtBottom(scrollY > lastScrollY && scrollY > window.innerHeight + 500);

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
  mapDispatchToProps = {
    setUserAtBottom,
    setDisplayHeader,
    setDeviceWidth,
  };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutContainer);
