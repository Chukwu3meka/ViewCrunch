import Image from "next/image";
import Fade from "react-reveal/Fade";
import publish, { styles } from ".";
// import PopperUnstyled from '@mui/base';

// import { Avatar } from "@component/others";
// import { time2read, trimString, toId } from "@utils/clientFunctions";

// import Button from "@material-ui/core/Button";
// import Tooltip from "@material-ui/core/Tooltip";
// import ButtonGroup from "@material-ui/core/ButtonGroup";
// import ArrowDownward from "@material-ui/icons/ArrowDownward";
// import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import PreviousIcon from "@material-ui/icons/KeyboardBackspace";

// import PublishIcon from "@material-ui/icons/Brush";

import { Endpoint } from ".";
import { forwardRef } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { Button, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Select from "@component/others/Select";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Preview = ({ displayPreview, hidePreview, view, publishingOption, setPublishTo, publishTo }) => (
  <Dialog fullScreen open={displayPreview} onClose={hidePreview} TransitionComponent={Transition}>
    <Grid maxWidth={900} container margin="auto" padding={1}>
      <Grid item xs={12} sm={12}>
        <IconButton onClick={hidePreview} aria-label="close">
          <CloseIcon color="secondary" />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="body2" fontSize={18}>
          Preview
        </Typography>

        <Box position="relative" width="100%" height={250}>
          <Image src="/images/ViewCrunch.webp" layout="fill" />
        </Box>

        <Typography variant="body2" fontWeight={600} fontSize={22} noWrap={true}>
          {view.title}
        </Typography>
        <Divider />

        <TextField
          color="primary"
          fullWidth
          // error={keywords.length && !!keywordsHandler(keywords) ? true : false}
          placeholder="View Description"
          multiline
          // value={keywords}
          variant="standard"
          // multiline
          placeholder="Add or change tags (up to 5) separated by comma,"
          // onChange={(e) => keywordsHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
        />
        <Typography component="div" variant="subtitle1" fontSize={14}>
          <b>Note: </b>
          Changes here will affect how your view appears in public places like ViewCrunch’s homepage and in subscribers’ inboxes — not
          the contents of the view itself.
        </Typography>
      </Grid>

      <Grid item xs={12} sm={12} md={6}>
        <Typography variant="subtitle1" fontSize={14}>
          Publishing to:
        </Typography>
        <Select options={publishingOption} value={publishTo} setValue={setPublishTo} />

        <Typography variant="subtitle1" fontSize={14} mt={3}>
          Add tags, so readers know what your view is about
        </Typography>

        <TextField
          color="primary"
          fullWidth
          // error={keywords.length && !!keywordsHandler(keywords) ? true : false}
          label="Keywords"
          // value={keywords}
          variant="outlined"
          // multiline
          label="Add or change tags (up to 5) separated by comma,"
          // onChange={(e) => keywordsHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
        />
        <Button sx={{ mt: 1 }} size="small" onClick={() => {}} color="success" variant="contained">
          Publish
        </Button>
      </Grid>
    </Grid>

    <Box className={styles.preview} display="flex" overflow="hidden">
      <Box maxWidth="70%" width="100%"></Box>
    </Box>
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
