import { CoverPic } from "@component/others";
import { Alert, FixedIcon } from "@component/others";
import { styles, MyArticlesContainer, MyIntroContainer, TimelineContainer } from "/";

import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Paper from "@material-ui/core/Paper";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FingerprintIcon from "@material-ui/icons/Fingerprint";

const Profile = ({
  token,
  online,
  classes,
  tabValue,
  TabPanel,
  articles,
  myProfile,
  viewerData,
  viewerHistory,
  handleTabChange,
  profileWarning,
  enqueueSnackbar,
  setProfileWarning,
  
}) => (
  <div className={styles.profile}>
    <CoverPic
      {...{
        imgSrcA: viewerData?.coverPicture || "/images/viewChest-cover.webp",
        imgAltA: viewerData?.displayName || "viewChest cover picture",
        imgSrcB: viewerData?.profilePicture || "/images/viewChest.webp",
        imgAltB: viewerData?.displayName || "viewChest logo",
      }}
    />

    <Paper className={classes.root}>
      <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="primary" textColor="primary" scrollButtons="on" centered>
        <Tab label="Profile" icon={<PersonPinIcon />} />
        <Tab label="View" icon={<AssignmentIcon />} />
        <Tab label="Timeline" icon={<FingerprintIcon />} />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <MyIntroContainer {...{ online, myProfile, viewerData, viewerHistory, token, }} />
        {/* <MyArticlesContainer {...{ articles: viewerData.published, token, myProfile, enqueueSnackbar }} /> */}
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <MyArticlesContainer {...{ articles: viewerData.published, token, myProfile, enqueueSnackbar }} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TimelineContainer
          {...{
            viewerHistory,
            profileCreated: viewerData?.stat?.profileCreated,
            enqueueSnackbar,
          }}
        />
      </TabPanel>
    </Paper>

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
