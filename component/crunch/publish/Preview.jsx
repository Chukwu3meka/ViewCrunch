import { Endpoint } from ".";
import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Preview = ({ displayPreview, hidePreview, view }) => (
  <Dialog fullScreen open={displayPreview} onClose={hidePreview} TransitionComponent={Transition}>
    <AppBar color="secondary" sx={{ position: "relative" }}>
      <Toolbar>
        <Typography variant="h4" noWrap={true} component="div">
          {view?.title}
        </Typography>
        <IconButton edge="start" onClick={hidePreview} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
    {/* <Endpoint
      ratingHover={ratingHover}
      setRatingHover={setRatingHover}
      loading={loading}
      endpoint={endpoint}
      activeTab={activeTab}
      handleTabChange={handleTabChange}
      copyToCLipboardHandler={copyToCLipboardHandler}
    /> */}
  </Dialog>
);

export default Preview;
