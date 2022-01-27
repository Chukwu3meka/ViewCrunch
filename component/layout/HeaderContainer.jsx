import { Header } from "/";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

const HeaderContainer = (props) => {
  const [hidden, setHidden] = useState(false),
    [mobile, setMobile] = useState(false);

  useEffect(() => {
    setHidden(props.headerDisplay);
    setMobile(window.innerWidth >= 400);
  }, [props.headerDisplay]);

  return <Header {...{ hidden, mobile }} />;
};

const mapStateToProps = (state) => ({
    headerDisplay: state.device.headerDisplay,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
