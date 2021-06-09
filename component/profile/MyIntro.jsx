import Image from "next/image";
import { shortNumber } from "@utils/clientFunctions";
import { BlinkingAvatar } from "@component/others";

import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import Avatar from "@material-ui/core/Avatar";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";

import FollowIcon from "@material-ui/icons/GolfCourse";
import PublishIcon from "@material-ui/icons/Public";

import AboutIcon from "@material-ui/icons/AcUnit";

import IconButton from "@material-ui/core/IconButton";

import { styles } from "/";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { SocialShare } from "@component/others";

const MyIntro = ({
  // handle,
  styles,
  about,
  classes,
  preview,
  myProfile,
  setHandle,
  setAbout,
  handleSave,
  updateEnabled,
  setUpdateEnabled,
  handleImageChange,
  viewerData: {
    displayName,
    published,
    profession,
    handle,
    chat: { followers, following, blocked },
    stat: { profileCreated, audience },
    social: { linkedinHandle, twitterHandle, facebookHandle, personalWebsite },
  },

  profilePicture,
  coverPicture,
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
            <TextField size="small" color="primary" variant="outlined" label="LinkedIN" value={linkedinHandle} />
            <TextField size="small" color="primary" variant="outlined" label="Twitter" value={twitterHandle} />
            <TextField size="small" color="primary" variant="outlined" label="Facebook" value={facebookHandle} />
            <TextField size="small" color="primary" variant="outlined" label="Website" value={personalWebsite} />
          </span>
          {myProfile && (
            <div className={classes.root}>
              <Chip
                avatar={<Avatar alt={handle} src={profilePicture} />}
                label="Save edit"
                onDelete={handleSave}
                onClick={handleSave}
                disabled={!updateEnabled}
                clickable
                color={updateEnabled ? "secondary" : "default"}
                deleteIcon={<SaveIcon />}
              />
            </div>
          )}
        </div>
      ) : (
        <span>
          <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />
          <a href={personalWebsite}>{personalWebsite}</a>
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
