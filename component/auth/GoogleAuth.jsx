import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

import { auth } from "@utils/firebaseClient";

const provider = new GoogleAuthProvider();

const GoogleAuth = ({ online }) => {
  const handler = () => online && signInWithRedirect(auth, provider);

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

export default GoogleAuth;
