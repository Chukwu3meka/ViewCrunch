import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";

const GoogleAuth = ({ signInHandler }) => (
  <Button
    id="google"
    size="small"
    variant="outlined"
    onClick={signInHandler}
    startIcon={<LoginIcon />}
    sx={{ color: "#DB4437", borderColor: "#DB4437" }}>
    signin with google
  </Button>
);

export default GoogleAuth;
