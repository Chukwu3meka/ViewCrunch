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
  setTitle,
  viewError,
  scrollRef,
  setPreview,
  scroll2Ref,
  titleError,
  contentText,
  description,
  imageHandler,
  contentArray,
  setDescription,
  setContentText,
  previewHandler,
  setContentArray,
  formerImagesUrl,
  titleErrorHandler,
  formatContentArray,
  keywords,
  space,
}) => (
  <div className={styles.publish} ref={scrollRef}>
    <TextField
      fullWidth
      autoFocus
      error={title.length && titleError}
      label="Title"
      value={title}
      onChange={(e) => {
        setTitle(e.target.value.trimStart().replace(/\s+/g, " "));
        titleErrorHandler(e.target.value.trimStart().replace(/\s+/g, " "));
      }}
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
      value={description}
      variant="outlined"
      label="View Description"
      fullWidth
      multiline
      onChange={(e) => setDescription(e.target.value)}
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
        {...{ title, description, content: [...contentArray, contentText], setPreview, formerImagesUrl, profile, keywords, space }}
      />
    )}
  </div>
);

export default Publish;
