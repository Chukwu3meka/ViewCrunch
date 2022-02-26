import { connect } from "react-redux";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {
  signOut,
  getRedirectResult,
  signInWithRedirect,
  linkWithCredential,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import userControl from "@utils/userControl";
import { auth } from "@utils/firebaseClient";
import { setProfileAction } from "@store/actions";

import { fetcher } from "@utils/clientFunctions";
import { FacebookAuth, TwitterAuth, GoogleAuth, styles } from ".";

const providers = {
  google: new GoogleAuthProvider(),
  twitter: new TwitterAuthProvider(),
  facebook: new FacebookAuthProvider(),
};

const AuthContainer = (props) => {
  const { destroyCookie, saveCookie } = userControl(),
    { setProfileAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(false),
    [authenticated, setAuthenticated] = useState(false);

  useEffect(() => setOnline(props.online), [props.online]);

  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (auth.currentUser) await authUser(auth.currentUser);
        if (result) await authUser(result.user);
      })
      .catch(async (err) => {
        const savedProvider = sessionStorage.getItem("providerType");

        if (err?.code === "auth/account-exists-with-different-credential") {
          // The AuthCredential type that was used before conflict.
          const credential =
            savedProvider === "twitter"
              ? TwitterAuthProvider.credentialFromError(err)
              : savedProvider === "facebook"
              ? FacebookAuthProvider.credentialFromError(err)
              : null;

          linkWithCredential(auth.currentUser, credential)
            .then(() => sessionStorage.removeItem("providerType"))
            .catch(() => sessionStorage.removeItem("providerType"));
        }
      });
  }, []);

  const logoutHandler = () => {
    setAuthenticated(false);
    try {
      signOut(auth)
        .then(() => {
          setProfileAction({});
          destroyCookie();
        })
        .catch((error) => {
          throw ({ error }, "Signout failed");
        });
    } catch (error) {
      enqueueSnackbar("Cannot acces Server", { variant: "error" });
      process.env.NODE_ENV !== "production" && console.log("Signout err", error);
    }
  };

  const authUser = async (auth) => {
    if (auth) {
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
    }
  };

  const signInHandler = (e) => {
    if (online) {
      const providerType = e.target.id,
        provider = providers[providerType];

      signInWithRedirect(auth, provider);
      sessionStorage.setItem("providerType", providerType);
    } else {
      enqueueSnackbar("You're not connected to the Internet", { variant: "error" });
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
          <TwitterAuth signInHandler={signInHandler} />
          <GoogleAuth signInHandler={signInHandler} />
          <FacebookAuth signInHandler={signInHandler} />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
    online: state.device?.online,
  }),
  mapDispatchToProps = {
    setProfileAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
