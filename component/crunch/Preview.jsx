import Image from "next/image";
import Fade from "react-reveal/Fade";
import { styles } from "/";
import { Avatar } from "@component/others";
import { time2read, trimString, toId } from "@utils/clientFunctions";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import PreviousIcon from "@material-ui/icons/KeyboardBackspace";

import PublishIcon from "@material-ui/icons/Brush";

const Preview = ({
  setPreview,
  title,
  view,
  markd,
  setPublishing,
  profile,
  description,
  publishing,
  articleId,
  scrollRef,
  scrollPosition,
  setScrollPosition,
  publishHandler,
}) => {
  const { myHandle, myProfilePicture, myDisplayName } = profile;
  return (
    <div className={styles.preview}>
      <div ref={scrollRef}>
        <Fade right>
          <Typography variant="h5">{title}</Typography>
        </Fade>
        <hr style={{ width: "95%" }} />
        <Fade bottom>
          <div>
            <span>
              <Avatar alt={myDisplayName} src={myProfilePicture || "/images/ViewCrunch.webp"} size="small" />
              <Typography>{`by ${trimString(myDisplayName, 15)}`}</Typography>
            </span>
            <Typography color="textSecondary">{`${new Date().toDateString()} ● ${time2read(view)}`}</Typography>
          </div>
        </Fade>
        <Tooltip title="Scroll to buttom ">
          <IconButton
            aria-label="bottom"
            color="inherit"
            onClick={() => {
              setScrollPosition(!scrollPosition);
              scrollRef.current.scrollIntoView({ behavior: "smooth", block: scrollPosition ? "end" : "start" });
            }}>
            {scrollPosition ? <ArrowDownward fontSize="inherit" /> : <ArrowUpward fontSize="inherit" />}
          </IconButton>
        </Tooltip>

        <article dangerouslySetInnerHTML={{ __html: view }} />
        <div>
          <span>
            <div>
              <Image src="/images/ViewCrunch.webp" alt="ViewCrunch" layout="fill" />
            </div>
            &nbsp;
            <Typography component="span" variant="caption" color="textSecondary">
              {`ViewCrunch.com/${myHandle}/${toId(title)}`}
            </Typography>
          </span>
          <Typography variant="h6" color="secondary">
            {title}
          </Typography>
          <Typography variant="caption">{description}</Typography>
        </div>

        {/* {!publishing && ( */}
        <ButtonGroup variant="contained" aria-label="contained primary button group" color="secondary" align="center">
          <Button startIcon={<PreviousIcon />} onClick={() => setPreview(false)}>
            back
          </Button>
          <Button endIcon={<PublishIcon />} onClick={publishHandler}>
            {articleId ? "Update" : "Publish"}
          </Button>
        </ButtonGroup>
        {/* )} */}
      </div>
    </div>
  );
};

export default Preview;
