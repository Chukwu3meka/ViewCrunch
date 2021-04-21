import { styles } from "/";
import { connect } from "react-redux";
import { setTheme } from "@store/actions";

import { LineText } from "@component/others";
import { Notification, Privacy, Others } from "/";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";

const SettingsContainer = ({ setTheme }) => {
  return (
    <div className={styles.settings}>
      <LineText title="Settings" />
      <Privacy />
      <Notification />
      <Others setTheme={setTheme} />
      <Button variant="contained" color="secondary">
        save
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
    // theme: state.device?.theme,
  }),
  mapDispatchToProps = {
    setTheme,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
