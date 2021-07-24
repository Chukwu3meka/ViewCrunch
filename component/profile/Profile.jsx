import { AuthFirebase } from "@component/page";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Alert } from "@component/others";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import UpdateIcon from "@material-ui/icons/Update";
import { styles, MyViewsContainer, MyIntroContainer, TimelineContainer } from "/";

const Profile = ({
  myHandle,
  online,
  tabValue,
  TabPanel,
  myProfile,
  viewerData,
  handleTabChange,
  profileWarning,
  enqueueSnackbar,
  setProfileWarning,
}) => (
  <div className={styles.profile}>
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      // centered
      variant="scrollable"
      scrollButtons="on"
      aria-label="portfolio tabs">
      <Tab label="Profile" icon={<PersonPinIcon />} />
      <Tab label="Published" icon={<AssignmentIcon />} />
      <Tab label="Timeline" icon={<FingerprintIcon />} />
    </Tabs>
    <TabPanel value={tabValue} index={0}>
      <MyIntroContainer {...{ online, myProfile, viewerData, myHandle, enqueueSnackbar }} />
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      <MyViewsContainer {...{ views: viewerData.published, myProfile, enqueueSnackbar }} />
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <TimelineContainer
        {...{
          viewerHistory: viewerData.viewerHistory,
          profileCreated: viewerData?.stat?.profileCreated,
        }}
      />
    </TabPanel>

    {profileWarning && myProfile && (
      <Alert
        alertType="notification"
        details={{
          label: "Profile Availability",
          text: [
            "This page is availabile to the entire public (whether authenticated or not). We strongly discourage posting of private life issues or personal identification details. Uploading nude images is a violaton of our TOS.",
            "Don't forget to click the save button when you update your Profile.",
          ],
          confirmation: "I'm Aware",
          handler: () => setProfileWarning(false),
        }}
      />
    )}

    <AuthFirebase />
  </div>
);

export default Profile;
