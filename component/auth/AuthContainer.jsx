import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { signOut, getRedirectResult } from "firebase/auth";

import userControl from "@utils/userControl";
import { auth } from "@utils/firebaseClient";
import { setProfileAction } from "@store/actions";

import { fetcher } from "@utils/clientFunctions";
import { FacebookAuth, TwitterAuth, GoogleAuth, styles } from ".";

const AuthContainer = (props) => {
  const { destroyCookie, saveCookie } = userControl(),
    { setProfileAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(false),
    [authenticated, setAuthenticated] = useState(false);

  useEffect(() => setOnline(props.online), [props.online]);
  useEffect(() => setAuthenticated(!!props.authenticated), [props.authenticated]);

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (result) authUser(result.user);
      })
      .catch(async (error) => {
        if (error.code === "auth/account-exists-with-different-credential") authUser(auth.currentUser);
      });
  }, []);

  const logoutHandler = () => {
    try {
      signOut(auth).catch((error) => {
        throw ({ error }, "Signout failed");
      });
      setProfileAction({});
      destroyCookie();
    } catch (error) {
      enqueueSnackbar("Cannot acces Server", { variant: "error" });
      process.env.NODE_ENV !== "production" && console.log("Signout err", error);
    }
  };

  const authUser = async (auth) => {
    const {
      uid,
      photoURL,
      displayName,
      stsTokenManager: { refreshToken },
    } = auth;

    const profile = await fetcher("/api/profile/createProfile", JSON.stringify({ uid, displayName, photoURL, refreshToken }));

    if (profile) {
      setAuthenticated(profile);
      setProfileAction(profile);
      saveCookie(refreshToken);
    }
  };

  return (
    <div className={styles.auth}>
      {authenticated ? (
        <Button variant="contained" color="error" size="small" onClick={logoutHandler}>
          logout
        </Button>
      ) : (
        <>
          <TwitterAuth online={online} authUser={authUser} />
          <GoogleAuth online={online} authUser={authUser} />
          <FacebookAuth online={online} authUser={authUser} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
    online: state.device?.online,
    authenticated: state.profile?.myID,
  }),
  mapDispatchToProps = {
    setProfileAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
