import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Crunches } from "/";
import { fetcher } from "@utils/clientFunctions";
import { setNotificationAction } from "@store/actions";

const CrunchesContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    [myID, setMyID] = useState(props.myID),
    [myCrunches, setMyCrunches] = useState(props.myCrunches || []),
    [otherCrunches, setOtherCrunches] = useState(props.otherCrunches || []);

  useEffect(() => {
    setMyID(props.myID);
  }, [props.myID]);

  const followHandler =
    ({ follower, id, title }) =>
    async () => {
      if (!myID) return enqueueSnackbar("You're not authenticated", { variant: "error" });

      // call updateCrunch twice,
      // Initial call: to prevent delay from server response
      // Server call: to ensure accuracy
      const updateCrunch = () => {
        setMyCrunches(
          myCrunches.map((x) =>
            x.crunchID === id
              ? {
                  ...x,
                  follower: !follower,
                  totalFollowers: x.totalFollowers + (follower ? -1 : 1),
                }
              : x
          )
        );
        setOtherCrunches(
          otherCrunches.map((x) =>
            x.crunchID === id
              ? {
                  ...x,
                  follower: !follower,
                  totalFollowers: x.totalFollowers + (follower ? -1 : 1),
                }
              : x
          )
        );
      };

      updateCrunch();
      const success = await fetcher("/api/crunch/follow", { follower, id, myID, title });

      if (success) return updateCrunch();
      enqueueSnackbar("Cannot acces Server", { variant: "error" });
    };

  return <Crunches myCrunches={myCrunches} otherCrunches={otherCrunches} followHandler={followHandler} />;
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = { setNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(CrunchesContainer);
