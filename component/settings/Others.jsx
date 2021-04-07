import EmailIcon from "@material-ui/icons/Email";
import { styles } from "/";
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { IOSSwitch } from "@component/others";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const propsOtherSettings = {
  theme: true,
};

const Others = ({ setTheme: setReduxTheme }) => {
  const [otherSettings, setOtherSettings] = useState(propsOtherSettings),
    setState = ({ state, stateName }) => {
      console.log(state, stateName);
      setOtherSettings({ ...otherSettings, [stateName]: state });
      if (stateName === "theme") setReduxTheme(state ? "dark" : "light");
    };

  // const [theme, setTheme] = useState("dark" ? true : false);

  // const setState = (state) => {
  //   console.log(state);
  //   setTheme(state);
  // };

  // setState = ({ state, stateName }) => setPrivacySettings({ ...privacySettings, [stateName]: state });

  return (
    <Paper elevation={4} className={styles.settings}>
      <Typography variant="h5" color="textSecondary">
        Others
      </Typography>
      <div>
        <IOSSwitch
          {...{
            setState,
            title: "Theme",
            stateName: "theme",
            state: otherSettings.theme,
          }}
        />
      </div>
    </Paper>
  );
};

export default Others;
