import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { CrunchID } from "/";
import { fetcher } from "@utils/clientFunctions";
import { setNotificationAction } from "@store/actions";

const CrunchesContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [myID, setMyID] = useState(props.myID),
    [myCrunches, setMyCrunches] = useState(props.myCrunches || []),
    [otherCrunches, setOtherCrunches] = useState(props.otherCrunches || []),
    [recentCrunches, setRecentCrunches] = useState(props.recentCrunches || []);

  useEffect(() => {
    setMyID(props.myID);

    console.log(props.crunchDetails);
  }, [props.myID]);

  return <CrunchID crunchDetails={{ ...props.crunchDetails }} />;
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = { setNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(CrunchesContainer);
