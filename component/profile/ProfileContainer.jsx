import { Profile } from "/";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const ProfileContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { viewerData, myProfile, myHandle } = props;

  const [tabValue, setTabValue] = useState(0),
    [online, setOnline] = useState(props.online),
    [profileWarning, setProfileWarning] = useState(myProfile);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

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
        online,
        myHandle,
        tabValue,
        TabPanel,
        myProfile,
        viewerData,
        profileWarning,
        handleTabChange,
        enqueueSnackbar,
        setProfileWarning,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    myHandle: state.profile?.myHandle,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
