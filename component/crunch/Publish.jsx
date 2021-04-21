import { styles, PreviewContainer } from "/";
import { FixedIcon } from "@component/others";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import PublishIcon from "@material-ui/icons/Brush";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CircularProgress from "@material-ui/core/CircularProgress";

const Publish = ({
  title,
  profile,
  classes,
  loading,
  preview,
  scrollRef,
  setPreview,
  scroll2Ref,
  titleError,
  contentText,
  description,
  imageHandler,
  contentArray,
  setContentText,
  descriptionError,
  previewHandler,
  setContentArray,
  viewToBeModified,
  titleHandler,
  descriptionHandler,
  formatContentArray,
  keywords,
  crunch,
  keywordsError,
  keywordsHandler,
}) => (
  <div className={styles.publish} ref={scrollRef}>
    <TextField
      fullWidth
      autoFocus
      error={title.length && titleError}
      label="Title"
      value={title}
      onChange={(e) => titleHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <TextField
      fullWidth
      error={description.length && descriptionError}
      label="Description"
      value={description}
      variant="outlined"
      multiline
      onChange={(e) => descriptionHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <Typography variant="caption">View</Typography>
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
              // setContentText("");
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
      {/* <span style={{ height: contentArray?.length ? 5 : Math.round(deviceHeight / 33) }} /> */}
      {/* <span /> */}
      {/* <span style={{ height: contentArray?.length ? 5 : Math.round(deviceHeight / 33) }} /> */}
    </div>

    <TextField
      fullWidth
      error={keywords.length && keywordsError}
      label="Keywords"
      value={keywords}
      variant="outlined"
      multiline
      onChange={(e) => keywordsHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <div className={classes.wrapper}>
      <Button size="small" variant="contained" color="primary" onClick={previewHandler} disabled={loading} endIcon={<PublishIcon />}>
        preview
      </Button>
      {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    </div>
    <FixedIcon icon="publish" clickHandler={{ image: imageHandler, down: () => scroll2Ref("end"), up: () => scroll2Ref("start") }} />
    {preview && (
      <PreviewContainer
        {...{ title, description, content: [...contentArray, contentText], setPreview, viewToBeModified, profile, keywords, crunch }}
      />
    )}
  </div>
);

export default Publish;
