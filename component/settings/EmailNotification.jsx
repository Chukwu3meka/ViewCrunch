import { styles } from "/";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IOSSwitch } from "@component/others";

const propsEmailSettings = {
  approvedRejectedView: false,
  viewscapeRole: false,
  authentication: true,
  accountSettingsUpdate: false,
  friendRequest: true,
};

const EmailNotification = () => {
  const [emailNotifSettings, setEmailNotifSettings] = useState(propsEmailSettings),
    setState = ({ state, stateName }) => setEmailNotifSettings({ ...emailNotifSettings, [stateName]: state });

  return (
    <Paper elevation={4} className={styles.settings}>
      <Typography variant="h5" color="textSecondary">
        Email Notification
      </Typography>
      <div>
        <IOSSwitch
          {...{
            setState,
            title: "Approved/Rejected view",
            stateName: "approvedRejectedView",
            state: emailNotifSettings.approvedRejectedView,
          }}
        />
        <IOSSwitch
          {...{
            setState,
            title: "Space Role",
            stateName: "viewscapeRole",
            state: emailNotifSettings.viewscapeRole,
          }}
        />
        <IOSSwitch
          {...{
            setState,
            title: "Authentication",
            stateName: "authentication",
            state: emailNotifSettings.authentication,
          }}
        />
        <IOSSwitch
          {...{
            setState,
            title: "Account settings update",
            stateName: "accountSettingsUpdate",
            state: emailNotifSettings.accountSettingsUpdate,
          }}
        />
        <IOSSwitch
          {...{
            setState,
            title: "Friend Request",
            stateName: "friendRequest",
            state: emailNotifSettings.friendRequest,
          }}
        />
      </div>
    </Paper>
  );
};
export default EmailNotification;
