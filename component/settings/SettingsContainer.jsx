import { connect } from "react-redux";
import { setTheme } from "@store/actions";

import { LineText } from "@component/others";
import { EmailNotification, Privacy, Others } from "/";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "next/link";

const SettingsContainer = ({ setTheme }) => {
  return (
    <Grid item container xs={12} md={12} alignContent="flex-start">
      <Grid item xs={12} md={12} lg={12}>
        <LineText title="Settings" />
        <Privacy />
        <EmailNotification />
        <Others setTheme={setTheme} />
        <span className="center-item-row">
          <Button variant="contained" color="secondary">
            save
          </Button>
        </span>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
    // theme: state.device?.theme,
  }),
  mapDispatchToProps = {
    setTheme,
  };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
