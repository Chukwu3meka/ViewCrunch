import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";
import { TwitterAuthProvider, signInWithRedirect } from "firebase/auth";

import { auth } from "@utils/firebaseClient";

const provider = new TwitterAuthProvider();

const TwitterAuth = ({ online }) => {
  const handler = () => online && signInWithRedirect(auth, provider);

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

export default TwitterAuth;
