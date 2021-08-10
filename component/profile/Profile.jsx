import { Alert } from "@component/others";
import { Tab, Tabs } from "@material-ui/core";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { styles, MyViewsContainer, MyIntroContainer, TimelineContainer } from "/";

const Profile = ({
  online,
  tabValue,
  TabPanel,
  myHandle,
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
      <MyViewsContainer {...{ views: viewerData.published, myProfile, myHandle, enqueueSnackbar }} />
    </TabPanel>
    <TabPanel value={tabValue} index={2}>
      <TimelineContainer
        {...{
          viewerHistory: viewerData.viewerHistory,
          profileCreated: viewerData?.stat?.profileCreated,
        }}
      />
    </TabPanel>

    <Alert
      open={profileWarning && myProfile}
      confirmation="I'm Aware"
      title="Profile Availability"
      handler={() => setProfileWarning(false)}
      message={[
        "This page is availabile to the entire public (whether authenticated or not). We strongly discourage posting of private life issues or personal identification details. Uploading nude images is a violaton of our TOS.",
        "Don't forget to click the save button when you update your Profile.",
      ]}
    />
  </div>
);

export default Profile;
