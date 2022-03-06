import { useState } from "react";
import { connect } from "react-redux";

import { Crunches } from "/";
import { setNotificationAction } from "@store/actions";

const CrunchesContainer = (props) => {
  const [myCrunches, setMyCrunches] = useState(props.myCrunches || []);

  return <Crunches myCrunches={myCrunches} />;
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = { setNotificationAction };

export default connect(mapStateToProps, mapDispatchToProps)(CrunchesContainer);
