import { styles, PreviewContainer } from "/";
import PublishIcon from "@material-ui/icons/Brush";
import { FixedIcon, Alert } from "@component/others";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { Button, TextField, Tooltip, Typography, CircularProgress } from "@material-ui/core";

const Publish = ({
  title,
  crunch,
  classes,
  loading,
  preview,
  keywords,
  scrollRef,
  moderator,
  oldContent,
  setPreview,
  scroll2Ref,
  contentText,
  description,
  imageHandler,
  titleHandler,
  contentArray,
  retouchWarning,
  setContentText,
  previewHandler,
  setContentArray,
  keywordsHandler,
  setRetouchWarning,
  descriptionHandler,
  formatContentArray,
}) => (
  <div className={styles.publish} ref={scrollRef}>
    <TextField
      fullWidth
      autoFocus
      error={title.length && !!titleHandler(title) ? true : false}
      label="Title"
      placeholder="Title of view"
      value={title}
      onChange={(e) => titleHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <TextField
      fullWidth
      error={description.length && !!descriptionHandler(description) ? true : false}
      label="Description"
      value={description}
      variant="outlined"
      placeholder="Describe what view is about, and how it should appear in search engines. Description should be between 50 to 125 letters "
      multiline
      onChange={(e) => descriptionHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <Typography variant="caption" color="secondary">
      View
    </Typography>
    <div>
      {formatContentArray()?.map((x, index, loopArray) =>
        typeof x === "object" ? (
          <span key={index}>
            <Tooltip
              title="Delete Image below"
              onClick={() => {
                setContentArray(loopArray.filter((selected, selectedIndex) => selectedIndex !== index));
              }}>
              <DeleteForeverIcon />
            </Tooltip>
            <img src={x?.image} />
          </span>
        ) : (
          <TextField
            key={index}
            value={x}
            fullWidth
            InputProps={{ disableUnderline: true }}
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
        <TextField
          value={contentText}
          // autoFocus
          style={{ height: "100%" }}
          // rows={contentArray?.length ? 5 : Math.round(deviceHeight / 33)}
          fullWidth
          InputProps={{ disableUnderline: true }}
          multiline
          onChange={(e) => setContentText(e.target.value)}
        />
      )}
    </div>

    <TextField
      fullWidth
      error={keywords.length && !!keywordsHandler(keywords) ? true : false}
      label="Keywords"
      value={keywords}
      variant="outlined"
      multiline
      placeholder="All Keywords used in view separated by comma. Characters should be within 4 to 110"
      onChange={(e) => keywordsHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <div className={classes.wrapper}>
      <Button size="small" variant="contained" color="primary" onClick={previewHandler} disabled={loading} endIcon={<PublishIcon />}>
        preview
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>

    <FixedIcon icon="publish" clickHandler={{ image: imageHandler, down: () => scroll2Ref("end"), up: () => scroll2Ref("start") }} />

    <Alert
      open={retouchWarning}
      confirmation="okay"
      title="Updating view title"
      handler={() => setRetouchWarning(false)}
      message={[
        "Once published, View title cannot be modified. Endeavour to use a suitable title before initial publish.",
        "Updating this view will lead to deletion of all previous image references with the same title",
      ]}
    />

    {preview && (
      <PreviewContainer
        {...{ title, description, content: [...contentArray, contentText], setPreview, oldContent, keywords, crunch, moderator }}
      />
    )}
  </div>
);

export default Publish;
