import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";
import { FacebookAuthProvider, signInWithRedirect } from "firebase/auth";

import { auth } from "@utils/firebaseClient";

const provider = new FacebookAuthProvider();

const FacebookAuth = ({ online }) => {
  const handler = () => online && signInWithRedirect(auth, provider);

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

export default FacebookAuth;
