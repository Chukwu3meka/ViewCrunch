import { dateCalculator } from "@utils/clientFunctions";
import { Profile } from "/";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   root: {
//     padding: 0,
//     flexGrow: 1,
//     width: "100%",
//     marginTop: "20px",
//     maxWidth: "1000px",
//     minWidth: "100px",
//   },
// });

const ProfileContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { viewerData, viewerHistory, myProfile, token } = props;

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  // classes = useStyles(),
  const [tabValue, setTabValue] = useState(0),
    [online, setOnline] = useState(props.online),
    // [profileWarning, setProfileWarning] = useState(myProfile);
    [profileWarning, setProfileWarning] = useState(false);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
    },
    TabPanel = ({ children, index, ...other }) => (
      <div role="profile-panel" hidden={tabValue !== index} {...other}>
        {tabValue === index && children}
      </div>
    );

  return (
    <Profile
      {...{
        viewerData,
        viewerHistory,
        token,
        online,
        // classes,
        tabValue,
        TabPanel,
        myProfile,
        profileWarning,
        handleTabChange,
        setProfileWarning,
        enqueueSnackbar,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    token: state?.profile?.token,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
