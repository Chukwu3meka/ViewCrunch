import EmailIcon from "@material-ui/icons/Email";
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
    <Paper elevation={4}>
      <Typography variant="h5">Account Privacy</Typography>
      <div>
        <span>
          <Typography variant="body1" color="textSecondary">
            Request account info
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => {
              // console.log("hey")
            }}>
            <EmailIcon />
          </IconButton>
        </span>
        <span>
          <Typography variant="body1" color="textSecondary">
            Delete my account
          </Typography>
          <IconButton
            aria-label="delete"
            onClick={() => {
              // console.log("hey")
            }}>
            <DeleteIcon />
          </IconButton>
        </span>
        <IOSSwitch
          {...{
            setState,
            title: "Auto-block follow request",
            stateName: "autoRejectFriendRequest",
            state: privacySettings.autoRejectFriendRequest,
          }}
        />
      </div>
    </Paper>
  );
};

export default Privacy;
