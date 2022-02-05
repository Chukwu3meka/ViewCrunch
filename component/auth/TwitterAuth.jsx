import { connect } from "react-redux";
import cookie from "js-cookie";
import userControl from "@utils/userControl";
import { setProfileAction } from "@store/actions";
import { auth } from "@utils/firebaseClient";
import { getAuth, getRedirectResult, TwitterAuthProvider, signInWithRedirect } from "firebase/auth";
import { useEffect, useState } from "react";
import { fetcher } from "@utils/clientFunctions";
import LoginIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";

const provider = new TwitterAuthProvider();

const TwitterAuth = ({ online, authUser }) => {
  const handler = () => {
    signInWithRedirect(auth, provider);
  };
  // #4285F4
  return (
    <Button
      variant="outlined"
      sx={{
        color: "#00acee",
        borderColor: "#00acee",
      }}
      size="small"
      onClick={handler}
      startIcon={<LoginIcon />}>
      signin with Twitter
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

export default connect(mapStateToProps, mapDispatchToProps)(TwitterAuth);
