import { Rating } from "@material-ui/lab";
import SaveIcon from "@material-ui/icons/Save";
import AboutIcon from "@material-ui/icons/AcUnit";
import PublishIcon from "@material-ui/icons/Public";
import { shortNumber } from "@utils/clientFunctions";
import FollowIcon from "@material-ui/icons/GolfCourse";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { BlinkingAvatar, SocialShare } from "@component/others";
import { Button, IconButton, ButtonGroup, Typography, Chip, TextField, Paper, Avatar } from "@material-ui/core";

const SaveButton = ({ myProfile, handle, profilePicture, updateHandler, enabled }) =>
  myProfile ? (
    <div>
      <Chip
        avatar={<Avatar alt={handle} src={profilePicture} />}
        label="Save"
        onDelete={updateHandler}
        onClick={updateHandler}
        disabled={!enabled}
        clickable
        color={enabled ? "secondary" : "default"}
        deleteIcon={<SaveIcon />}
      />
    </div>
  ) : null;

const EditLink = ({ viewerInput, slot, title, viewerInputHandler, safeInput }) => (
  <TextField
    size="small"
    color={viewerInput[slot]?.length && safeInput[slot] ? "primary" : "secondary"}
    variant="outlined"
    label={title}
    value={viewerInput[slot]}
    error={viewerInput[slot]?.length && safeInput[slot]}
    onChange={(e) => viewerInputHandler(slot, e.target.value)}
  />
);

const MyIntro = ({
  styles,
  about,
  myProfile,
  setHandle,
  safeInput,
  setAbout,
  updateHandler,
  updateEnabled,
  viewerInput,
  viewerInputHandler,
  setUpdateEnabled,
  imageHandler,
  profilePicture,
  uploadHandler,
  coverPicture,
  imageEnabled,
  viewerData: {
    displayName,
    published,
    profession,
    handle,
    chat: { followers, following, blocked },
    stat: { profileCreated },
  },
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
            handleChange: (e) => imageHandler(e, "coverPicture"),
          }}
        />
        <BlinkingAvatar
          {...{
            upload: myProfile,
            size: "xl",
            src: profilePicture,
            alt: `${displayName} Profile Picture`,
            handleChange: (e) => imageHandler(e, "profilePicture"),
          }}
        />

        <SaveButton {...{ myProfile, handle, profilePicture, updateHandler: uploadHandler, enabled: imageEnabled }} />
      </div>

      <TextField
        color={viewerInput?.displayName?.length && safeInput?.displayName ? "primary" : "secondary"}
        // variant="filled"
        label="Display Name"
        placeholder="Minimum of 3 letters"
        value={viewerInput?.displayName}
        error={viewerInput?.displayName?.length && safeInput.displayName}
        onChange={(e) => viewerInputHandler("displayName", e.target.value)}
      />

      <TextField
        color={viewerInput?.about?.length && safeInput?.about ? "primary" : "secondary"}
        variant="outlined"
        label="About me"
        placeholder="Minimum of 13 letters"
        value={viewerInput?.about}
        error={viewerInput?.about?.length && safeInput.about}
        onChange={(e) => viewerInputHandler("about", e.target.value)}
        fullWidth
        multiline
        rowsMax={7}
      />

      <TextField
        color={viewerInput?.profession?.length && safeInput?.profession ? "primary" : "secondary"}
        variant="filled"
        label="Profession"
        placeholder="Minimum of 5 letters"
        value={viewerInput?.profession}
        error={viewerInput?.profession?.length && safeInput.profession}
        onChange={(e) => viewerInputHandler("profession", e.target.value)}
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
            <EditLink {...{ viewerInput, slot: "website", title: "My Website (https://www*)", viewerInputHandler, safeInput }} />
            <EditLink {...{ viewerInput, slot: "twitterHandle", title: "Twitter Handle", viewerInputHandler, safeInput }} />
            <EditLink {...{ viewerInput, slot: "linkedinHandle", title: "LinkedIN username", viewerInputHandler, safeInput }} />
            <EditLink {...{ viewerInput, slot: "facebookHandle", title: "Facebook username", viewerInputHandler, safeInput }} />
          </span>

          <SaveButton {...{ myProfile, handle, profilePicture, updateHandler, enabled: updateEnabled }} />
        </div>
      ) : (
        <span>
          <SocialShare
            {...{
              linkedinHandle: viewerInput.linkedinHandle,
              twitterHandle: viewerInput.twitterHandle,
              facebookHandle: viewerInput.facebookHandle,
            }}
          />
          <a href={viewerInput.website}>{`${displayName} website`}</a>
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
