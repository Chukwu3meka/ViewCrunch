import cookie from "js-cookie";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { signOut, getRedirectResult } from "firebase/auth";

import userControl from "@utils/userControl";
import { auth } from "@utils/firebaseClient";
import { setProfileAction } from "@store/actions";

import { fetcher } from "@utils/clientFunctions";
import { FacebookAuth, TwitterAuth, GoogleAuth, styles } from ".";

const AuthContainer = (props) => {
  const { logout } = userControl(),
    { setProfileAction } = props,
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
    signOut(auth)
      .then(() => {
        setProfileAction({});
        logout();
      })
      .catch((error) => {
        // console.log({ error }, "Signout failed");
      });
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
      cookie.set("ViewCrunch", refreshToken, { expires: 183, path: "" });
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
