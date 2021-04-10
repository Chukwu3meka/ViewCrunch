import { connect } from "react-redux";
import { StoryContainer, styles } from "/";
import { fetcher } from "@utils/clientFunctions";
import { useEffect, useRef, useState } from "react";

const ViewContainer = (props) => {
  const { view, profile, advert } = props;
  const scrollRef = useRef(null);
  const [online, setOnline] = useState(props.online);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  useEffect(() => {
    // if (online && !viewData.includes(profile.myHandle)) {
    //   fetcher("/api/incRead", JSON.stringify({ myRefresh: profile.myRefresh, viewId }));
    // }
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className={styles.view} ref={scrollRef}>
      <StoryContainer {...{ view, online, profile, advert }} />
    </div>
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    online: state?.device?.online,
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
