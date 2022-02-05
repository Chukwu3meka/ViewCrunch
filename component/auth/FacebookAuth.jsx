import { connect } from "react-redux";
import cookie from "js-cookie";
import userControl from "@utils/userControl";
import { setProfileAction } from "@store/actions";
import { auth } from "@utils/firebaseClient";
import { getAuth, getRedirectResult, FacebookAuthProvider, signInWithRedirect, linkWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetcher } from "@utils/clientFunctions";
import LoginIcon from "@mui/icons-material/FacebookRounded";
import { Button } from "@mui/material";

const provider = new FacebookAuthProvider();

const FacebookAuth = ({ online, authUser }) => {
  // useEffect(() => {
  //   auth.currentUser;
  //   if (online) {
  //     getRedirectResult(auth)
  //       .then(async (result) => {
  //         const credential = GoogleAuthProvider.credentialFromResult(result);
  //         console.log({ result }, { user });
  //         // if (result) {
  //         //   // // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //         //   // const credential = FacebookAuthProvider.credentialFromResult(result);
  //         //   // // const token = credential.accessToken;
  //         //   // const user = result.user;
  //         //   const {
  //         //     uid,
  //         //     photoURL,
  //         //     displayName,
  //         //     stsTokenManager: { refreshToken },
  //         //   } = result.user;

  //         //   const profile = await fetcher("/api/profile/createProfile", JSON.stringify({ uid, displayName, photoURL, refreshToken }));

  //         //   if (profile) authUser(profile);
  //         // }
  //       })
  //       .catch((error) => {
  //         // // Handle Errors here.
  //         // const errorCode = error.code;
  //         // const errorMessage = error.message;
  //         // // The email of the user's account used.
  //         // const email = error.email;
  //         // // AuthCredential type that was used.
  //         // const credential = FacebookAuthProvider.credentialFromError(error);
  //         // // ...
  //       });
  //   }
  // }, []);

  const handler = () => {
    signInWithRedirect(auth, provider);
    // linkWithRedirect(auth.currentUser, provider);
  };

  // color="#3b5998"
  // #00acee
  // #4285F4
  return (
    <Button
      variant="outlined"
      sx={{
        color: "#3b5998",
        borderColor: "#3b5998",
      }}
      size="small"
      onClick={handler}
      startIcon={<LoginIcon />}>
      signin with facebook
    </Button>
  );
};

const mapStateToProps = (state) => ({
    online: state.device?.online,
    authenticated: state.profile?.myID,
  }),
  mapDispatchToProps = {
    setProfileAction,
  };

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);
