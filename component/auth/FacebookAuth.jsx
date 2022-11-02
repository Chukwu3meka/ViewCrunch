import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";

const FacebookAuth = ({ signInHandler }) => (
  <Button
    id="facebook"
    size="small"
    variant="outlined"
    onClick={signInHandler}
    startIcon={<LoginIcon />}
    sx={{ color: "#3b5998", borderColor: "#3b5998" }}>
    signin with facebook
  </Button>
);

export default FacebookAuth;
