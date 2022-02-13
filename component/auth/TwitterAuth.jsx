import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Google";

const TwitterAuth = ({ signInHandler }) => (
  <Button
    id="twitter"
    size="small"
    variant="outlined"
    onClick={signInHandler}
    startIcon={<LoginIcon />}
    sx={{ color: "#00acee", borderColor: "#00acee" }}>
    signin with Twitter
  </Button>
);

export default TwitterAuth;
