import { View } from "/";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetcher } from "@utils/clientFunctions";

const ViewContainer = ({ view, deviceWidth, online, profile, advert }) => {
  const scrollRef = useRef(null),
    { viewData, viewId } = view;

  const [forceRefresh, setForceRefresh] = useState(0),
    [moreActions, setMoreActions] = useState(false);
  const [reportView, setReportView] = useState(false);

  useEffect(() => {
    // if (online && !viewData.includes(profile.myHandle)) {
    //   fetcher("/api/incRead", JSON.stringify({ myRefresh: profile.myRefresh, viewId }));
    // }
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <View
      {...{
        view,
        online,
        advert,
        profile,
        scrollRef,
        reportView,
        deviceWidth,
        moreActions,
        forceRefresh,
        setReportView,
        setMoreActions,
        setForceRefresh,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    online: state?.device?.online,
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
