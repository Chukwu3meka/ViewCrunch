import EmailIcon from "@material-ui/icons/Email";
import { styles } from "/";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IOSSwitch } from "@component/others";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const propsPrivacySettings = {
  autoRejectFriendRequest: true,
  allowCommentOnVviews: false,
};

const Privacy = ({}) => {
  const [privacySettings, setPrivacySettings] = useState(propsPrivacySettings),
    setState = ({ state, stateName }) => setPrivacySettings({ ...privacySettings, [stateName]: state });

  return (
    <Paper elevation={4} className={styles.settings}>
      <Typography variant="h5">Privacy</Typography>
      <div>
        <div>
          <Typography variant="body1" color="textSecondary">
            Request account info
          </Typography>
          <IconButton aria-label="delete" onClick={() => console.log("hey")} className={styles.icon}>
            <EmailIcon />
          </IconButton>
        </div>
        <div>
          <Typography variant="body1" color="textSecondary">
            Delete my account
          </Typography>
          <IconButton aria-label="delete" onClick={() => console.log("hey")} className={styles.icon}>
            <DeleteIcon />
          </IconButton>
        </div>
        <IOSSwitch
          {...{
            setState,
            title: "Auto reject friend request",
            stateName: "autoRejectFriendRequest",
            state: privacySettings.autoRejectFriendRequest,
          }}
        />
        <IOSSwitch
          {...{
            setState,
            title: "Allow comment on views",
            stateName: "allowCommentOnVviews",
            state: privacySettings.allowCommentOnVviews,
          }}
        />
      </div>
    </Paper>
  );
};

export default Privacy;
