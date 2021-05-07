import Link from "next/link";
import cookie from "js-cookie";
import Router from "next/router";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";

import { styles } from "/";
import validate from "@utils/validator";
import { fetcher } from "@utils/clientFunctions";
import { isHandleTaken } from "@utils/firestoreFetch";

const Handle = (props) => {
  const [handleError, setHandleError] = useState(false);
  const [handle, setHandle] = useState("");
  const [online, setOnline] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setOnline(props.online);
    if (!props.online) setHandleError(true);
  }, [props.online]);

  useEffect(() => {
    if (handle && online) {
      const verifyHandle = async () => {
        const validated = validate("handle", `@${handle}`);
        if (validated) {
          const handleTaken = await isHandleTaken(handle);
          if (!handleTaken && online) return setHandleError(false);
          setHandleError(true);
        } else {
          setHandleError(true);
        }
      };
      verifyHandle();
    }
  }, [handle]);

  const saveHandle = async () => {
    if (!handleError && handle?.length) {
      const profileStatus = await fetcher("/api/profile/createProfile", JSON.stringify({ handle, myRefresh: props.myRefresh }));
      if (profileStatus) {
        cookie.set("ViewCrunch", props.myRefresh, { expires: 183, path: "" });
        Router.reload();
      } else {
        enqueueSnackbar(`Unable to save handle, Please try again later`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Handle can't be empty`, { variant: "warning" });
    }
  };

  return (
    <div className={styles.chooseHandle}>
      <div>
        <Typography variant="h6">Choose Lifetime Handle</Typography>
        <Typography variant="body1" color="textSecondary" align="left">
          <>
            Once you save the handle, You will not be able to change it again.&nbsp;
            <Link href="/control/faq/handle">
              <a>Reasons why future handle update are disabled</a>
            </Link>
            . Handle can only contain 13 Alphanumeric characters, underscores included.&nbsp;
            <Link href="/control/faq/naming_convention">
              <a>Read more here on our naming convention</a>
            </Link>
            .
          </>
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value={handle}
          label="Enter Handle"
          fullWidth
          onChange={(e) => setHandle(e.target.value.toLowerCase())}
          autoComplete="off"
          error={handleError}
          color="primary"
        />
        <Button color="secondary" variant="outlined" onClick={saveHandle} disabled={handleError}>
          Save
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
    online: state.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Handle);
