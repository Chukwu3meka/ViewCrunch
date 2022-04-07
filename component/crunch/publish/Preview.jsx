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

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";

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

const Preview = ({
  displayPreview,
  hidePreview,
  view,
  publishingOption,
  setPublishTo,
  publishTo,
  loading,
  publishHandler,
  description,
  descriptionChangeHandler,
}) => (
  <Dialog
    fullScreen
    open={displayPreview}
    onClose={hidePreview} //disable this to prevent closing preview when esc button is clicked
    TransitionComponent={Transition}>
    <Grid maxWidth={900} container margin="auto" padding={1}>
      <Grid item xs={12} sm={12} md={12}>
        <Box width={10} ml="auto">
          <IconButton onClick={hidePreview} aria-label="close" edge="end">
            <CloseIcon color="secondary" />
          </IconButton>
        </Box>
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
          maxRows={3}
          color="primary"
          fullWidth
          multiline
          value={description}
          placeholder="d"
          variant="standard"
          placeholder="Write a preview description"
          onChange={descriptionChangeHandler}
        />
        <Typography variant="body2" color="primary" fontSize={12} textAlign="right" marginTop={-0.6}>
          {description.length}/158
        </Typography>
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

        {view.keywords ? (
          <>
            <Typography variant="subtitle1" fontSize={14} mt={3}>
              Keywords you've added for readers to know about your view
            </Typography>

            <Stack direction="row" spacing={1}>
              {view.keywords?.split(",")?.map((tag) => (
                <Chip key={tag} label={tag} color="info" />
              ))}
            </Stack>
          </>
        ) : (
          <Typography variant="subtitle1" fontSize={14} mt={3}>
            Keywords improve visibility for readers when they search and it also helps them know what your view is all about
          </Typography>
        )}

        <LoadingButton
          sx={{ mt: 3 }}
          size="small"
          onClick={publishHandler}
          color="success"
          variant="contained"
          loading={loading}
          loadingPosition="start"
          startIcon={<PublishIcon />}>
          Publish
        </LoadingButton>
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <article className={styles.preview} dangerouslySetInnerHTML={{ __html: view.content }} />
      </Grid>
    </Grid>
  </Dialog>
);

export default Preview;
