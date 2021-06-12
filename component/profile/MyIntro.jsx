import Rating from "@material-ui/lab/Rating";
import SaveIcon from "@material-ui/icons/Save";
import { shortNumber } from "@utils/clientFunctions";
import { BlinkingAvatar } from "@component/others";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FollowIcon from "@material-ui/icons/GolfCourse";
import PublishIcon from "@material-ui/icons/Public";
import AboutIcon from "@material-ui/icons/AcUnit";
import IconButton from "@material-ui/core/IconButton";
import { SocialShare } from "@component/others";

import { Button, ButtonGroup, Typography, Chip, TextField, Paper, Avatar } from "@material-ui/core";

const SaveButton = ({ myProfile, handle, profilePicture, handleSave, enabled }) => {
  return myProfile ? (
    <div>
      <Chip
        avatar={<Avatar alt={handle} src={profilePicture} />}
        label="Save"
        onDelete={handleSave}
        onClick={handleSave}
        disabled={!enabled}
        clickable
        color={enabled ? "secondary" : "default"}
        deleteIcon={<SaveIcon />}
      />
    </div>
  ) : null;
};

const EditLink = ({ viewerLink, slot, title }) => (
  <TextField
    size="small"
    color="secondary"
    variant="outlined"
    label={title}
    value={viewerLink[slot]}
    error={viewerLink[slot]?.length > 0 ? () => viewerLinkHandler("slot", viewerLink[slot]) : false}
    onChange={(e) => viewerLinkHandler("slot", e.target.value)}
  />
);

const MyIntro = ({
  styles,
  about,
  myProfile,
  setHandle,
  setAbout,
  safeInputHandler,
  handleSave,
  updateEnabled,
  viewerLink,
  viewerLinkHandler,
  setUpdateEnabled,
  handleImageChange,
  viewerData: {
    displayName,
    published,
    profession,
    handle,
    chat: { followers, following, blocked },
    stat: { profileCreated },
  },

  profilePicture,
  uploadImageHandler,
  coverPicture,
  imageEnabled,
}) => (
  <div className={styles.myIntro}>
    <Paper elevation={4}>
      <div>
        <BlinkingAvatar
          {...{
            upload: myProfile,
            size: "l",
            src: coverPicture,
            alt: `${displayName} Cover Picture`,
            handleChange: (e) => handleImageChange(e, "coverPicture"),
          }}
        />
        <BlinkingAvatar
          {...{
            upload: myProfile,
            size: "xl",
            src: profilePicture,
            alt: `${displayName} Profile Picture`,
            handleChange: (e) => handleImageChange(e, "profilePicture"),
          }}
        />

        <SaveButton {...{ myProfile, handle, profilePicture, handleSave: () => uploadImageHandler("image"), enabled: imageEnabled }} />
      </div>

      <TextField
        color="secondary"
        value={displayName}
        error={displayName.toString().length > 30 ? true : false}
        onChange={(e) => {
          if (myProfile) {
            setHandle(e.target.value);
            if (!updateEnabled) setUpdateEnabled(true);
          }
        }}
      />

      <TextField
        variant="outlined"
        value={about}
        color="secondary"
        id="about author"
        fullWidth
        error={about.toString().length > 200 ? true : false}
        label="About Me"
        multiline
        rowsMax={7}
        onChange={(e) => {
          if (myProfile) {
            setAbout(e.target.value);
            if (!updateEnabled) setUpdateEnabled(true);
          }
        }}
      />

      <TextField
        color="secondary"
        value={profession}
        // inputProps={{ min: 0, style: { textAlign: "center" } }}
        // error={displayName.toString().length > 30 ? true : false}
        // onChange={(e) => {
        //   if (myProfile) {
        //     setHandle(e.target.value);
        //     if (!updateEnabled) setUpdateEnabled(true);
        //   }
        // }}
      />
    </Paper>

    <Paper elevation={4}>
      <Typography variant="caption" color="primary">
        Profile stat:
      </Typography>
      <span>
        <FollowIcon color="primary" fontSize="small" /> &nbsp;
        <Typography variant="body2">{`${followers?.length} Followers; ${following?.length} Following`}</Typography>
      </span>

      <span>
        <PublishIcon color="primary" fontSize="small" /> &nbsp;
        <Typography variant="body2">{`${shortNumber(published.length)} views published`}</Typography>
      </span>

      <span>
        <VisibilityIcon color="primary" fontSize="small" /> &nbsp;
        <Typography variant="body2">{`Joined ViewCrunch ${profileCreated}`}</Typography>
      </span>
    </Paper>

    <Paper elevation={4}>
      <IconButton className={styles.fixedIcon} color="secondary">
        <AboutIcon />
      </IconButton>

      {myProfile ? (
        <div>
          <span>
            {/* <EditLink {...{ viewerLinkHandler, slot: "website", title: "My Website", viewerLink, safeInputHandler }} />
            <EditLink {...{ viewerLinkHandler, slot: "twitterHandle", title: "Twitter Handle", viewerLink, safeInputHandler }} />
            <EditLink {...{ viewerLinkHandler, slot: "linkedinHandle", title: "LinkedIN username", viewerLink, safeInputHandler }} />
            <EditLink {...{ viewerLinkHandler, slot: "facebookHandle", title: "Facebook username", viewerLink, safeInputHandler }} /> */}

            <EditLink {...{ viewerLink, slot: "linkedinHandle", title: "LinkedIN username" }} />
            <EditLink {...{ viewerLink, slot: "facebookHandle", title: "Facebook username" }} />
          </span>

          <SaveButton {...{ myProfile, handle, profilePicture, handleSave, enabled: updateEnabled }} />
        </div>
      ) : (
        <span>
          <SocialShare
            {...{
              linkedinHandle: viewerLink.linkedinHandle,
              twitterHandle: viewerLink.twitterHandle,
              facebookHandle: viewerLink.facebookHandle,
            }}
          />
          <a href={viewerLink.website}>{`${displayName} website`}</a>
          <ButtonGroup color="secondary" variant="contained" aria-label="friendship action">
            <Button>{following?.includes(handle) ? "unfollow" : "follow"}</Button>
            <Button>{blocked?.includes(handle) ? "unblock" : "block"}</Button>
          </ButtonGroup>
        </span>
      )}
    </Paper>
  </div>
);

export default MyIntro;
