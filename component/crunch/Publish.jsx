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
  classes,
  loading,
  preview,
  scrollRef,
  setPreview,
  scroll2Ref,
  contentText,
  description,
  imageHandler,
  contentArray,
  setContentText,
  previewHandler,
  setContentArray,
  viewToBeModified,
  titleHandler,
  descriptionHandler,
  formatContentArray,
  keywords,
  crunch,
  keywordsHandler,
  moderator,
}) => (
  <div className={styles.publish} ref={scrollRef}>
    <TextField
      fullWidth
      autoFocus
      error={title.length && !!titleHandler(title)}
      label="Title"
      placeholder="Title of view"
      value={title}
      onChange={(e) => titleHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
    />

    <TextField
      fullWidth
      error={description.length && !!descriptionHandler(description)}
      label="Description"
      value={description}
      variant="outlined"
      placeholder="Describe what view is about, and how it should appear in search engines. Description should be between 50 to 200 letters "
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
      error={keywords.length && !!keywordsHandler(keywords)}
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
    {preview && (
      <PreviewContainer
        {...{ title, description, content: [...contentArray, contentText], setPreview, viewToBeModified, keywords, crunch, moderator }}
      />
    )}
  </div>
);

export default Publish;
