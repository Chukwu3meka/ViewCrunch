import { connect } from "react-redux";
import cookie from "js-cookie";
import userControl from "@utils/userControl";
import { setProfileAction } from "@store/actions";
import { auth } from "@utils/firebaseClient";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetcher } from "@utils/clientFunctions";
import LoginIcon from "@mui/icons-material/Google";
import { Button } from "@mui/material";

const provider = new GoogleAuthProvider();

const GoogleAuth = ({ online, authUser }) => {
  // useEffect(() => {
  //   if (online) {
  //     getRedirectResult(auth)
  //       .then(async (result) => {
  //         if (result) {
  //           // // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //           // const credential = GoogleAuthProvider.credentialFromResult(result);
  //           // // const token = credential.accessToken;
  //           // const user = result.user;

  //           console.log(result.user);

  //           const {
  //             uid,
  //             photoURL,
  //             displayName,
  //             stsTokenManager: { refreshToken },
  //           } = result.user;

  //           const profile = await fetcher("/api/profile/createProfile", JSON.stringify({ uid, displayName, photoURL, refreshToken }));

  //           if (profile) authUser(profile);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log({ error });
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.email;
  //         // AuthCredential type that was used.
  //         const credential = GoogleAuthProvider.credentialFromError(error);
  //         // // ...
  //         console.log({ errorCode, errorMessage, email, credential });
  //       });
  //   }
  // }, []);

  const handler = () => {
    signInWithRedirect(auth, provider);
  };
  // color="#3b5998"
  // #00acee
  // #4285F4
  return (
    <Button
      variant="outlined"
      sx={{
        color: "#DB4437",
        borderColor: "#DB4437",
      }}
      size="small"
      onClick={handler}
      startIcon={<LoginIcon />}>
      signin with google
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

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
