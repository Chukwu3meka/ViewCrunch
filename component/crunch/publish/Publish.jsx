import { styles } from ".";
import { NavContainer } from "@component/layout";
import { Box, Button, Grid, Input, TextField, Tooltip, Typography } from "@mui/material";
import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
import Fab from "@mui/material/Fab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoadingButton from "@mui/lab/LoadingButton";
import PublishIcon from "@mui/icons-material/Publish";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Publish = ({
  //
  titleChangeHandler,
  title,
  setTags,
  tags,
  formatContentArray,
  setContentArray,
  contentArray,
  contentText,
  setContentText,
  previewHandler,
  loading,
  imageHandler,
}) => (
  <Grid container>
    {/* style={{ maxWidth: "1200px", margin: "auto" }} */}
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Publish</Typography>
        <hr />
        <Typography fontSize={15}>Share your views with the world in any crunch, and get real responses once its approved.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <Box p={1} className={styles.publish}>
        <Input
          autoFocus
          fullWidth
          value={title}
          disableUnderline={true}
          placeholder="View Title"
          onChange={titleChangeHandler}
          sx={{ fontSize: 35, caretColor: "#1197c0" }}
        />

        {/* content */}

        <div id={styles.content}>
          {formatContentArray()?.map((x, index, loopArray) =>
            typeof x === "object" ? (
              <span key={index}>
                <Tooltip
                  title="Delete this photo"
                  onClick={() => {
                    setContentArray(loopArray.filter((selected, selectedIndex) => selectedIndex !== index));
                  }}>
                  <Fab color="secondary" size="small" aria-label="add-image">
                    <DeleteForeverIcon />
                  </Fab>
                </Tooltip>
                <img src={x?.image} />
              </span>
            ) : (
              <Input
                fullWidth
                multiline
                disableUnderline={true}
                key={index}
                value={x}
                fullWidth
                // InputProps={{ disableUnderline: true }}
                multiline
                onChange={(e) => {
                  const tempContent = [...formatContentArray()];
                  tempContent[index] = e.target.value;
                  setContentArray([...tempContent]);
                }}
              />
            )
          )}

          {typeof contentArray[contentArray?.length - 1] !== "String" && (
            <Input
              fullWidth
              multiline
              onChange={(e) => setContentText(e.target.value)}
              value={contentText}
              disableUnderline={true}
              sx={{
                fontSize: "1.1em",
                caretColor: "#1197c0",
              }}
              placeholder="Tell the world your view..."
            />
          )}
        </div>

        <Typography variant="subtitle1" fontSize={14} mt={3}>
          Add tags, so readers know what your view is about
        </Typography>

        <TextField
          color="primary"
          fullWidth
          // error={keywords.length && !!keywordsHandler(keywords) ? true : false}
          label="Keywords"
          value={tags}
          variant="outlined"
          // multiline
          label="Add or change tags (up to 5) separated by comma,"
          onChange={(e) => setTags(e.target.value)}
          // onChange={(e) => keywordsHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
        />

        <Button size="small" onClick={previewHandler} color="success" variant="contained" sx={{ mt: 2 }}>
          Publish
        </Button>
        {/* <LoadingButton
          size="small"
          onClick={previewHandler}
          loading={loading}
          color="success"
          variant="contained">
          Publish
        </LoadingButton> */}
      </Box>

      <Fab color="primary" aria-label="add-image" sx={{ position: "fixed", bottom: 16, right: 16, overflow: "hidden" }}>
        <input
          type="file"
          onChange={imageHandler}
          accept=".jpg, .jpeg, .png"
          accept="image/*"
          multiple
          style={{
            position: "absolute",
            top: "-35px",
            left: 0,
            height: "calc(100% + 36px)",
            width: "calc(100% + 5px)",
            outline: "none",
          }}
        />

        <AddPhotoIcon />
      </Fab>
    </Grid>
  </Grid>
);

export default Publish;
