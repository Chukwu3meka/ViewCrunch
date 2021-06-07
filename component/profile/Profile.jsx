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
import { styles, MyArticlesContainer, MyIntroContainer, TimelineContainer } from "/";

const Profile = ({
  token,
  online,
  tabValue,
  TabPanel,
  myProfile,
  viewerData,
  viewerHistory,
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
      centered
      variant="scrollable"
      scrollButtons="on"
      aria-label="portfolio tabs">
      <Tab label="Profile" icon={<PersonPinIcon />} />
      <Tab label="Published" icon={<AssignmentIcon />} />
      <Tab label="Timeline" icon={<FingerprintIcon />} />
    </Tabs>
    <TabPanel value={tabValue} index={0}>
      <MyIntroContainer {...{ online, myProfile, viewerData, viewerHistory, token }} />
    </TabPanel>
    <TabPanel value={tabValue} index={1}>
      {/* <MyArticlesContainer {...{ articles: viewerData.published, token, myProfile, enqueueSnackbar }} /> */}
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      {/* <TimelineContainer
        {...{
          viewerHistory,
          profileCreated: viewerData?.stat?.profileCreated,
          enqueueSnackbar,
        }}
      /> */}
    </TabPanel>

    {profileWarning && myProfile && (
      <Alert
        alertType="notification"
        details={{
          label: "Profile Availability",
          text: [
            "This page is availabile to the entire public (whether authenticated or not). We strongly discourage posting of private life issues or personal identification details. Uploading nude images is a violaton of our TOS.",
            'Don\'t forget to click the save button when you update your "picture",  or "about me".',
          ],
          confirmation: "I'm Aware",
          handler: () => setProfileWarning(false),
        }}
      />
    )}
  </div>
);

export default Profile;
