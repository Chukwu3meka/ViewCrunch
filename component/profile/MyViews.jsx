import { styles } from "/";
import Link from "next/link";
import Image from "next/image";
import { shortNumber, toId } from "@utils/clientFunctions";

import Rating from "@material-ui/lab/Rating";
import EditIcon from "@material-ui/icons/Edit";
import Tooltip from "@material-ui/core/Tooltip";
import SchoolIcon from "@material-ui/icons/School";
import DeleteIcon from "@material-ui/icons/Delete";
import Accordion from "@material-ui/core/Accordion";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import UpvoteIcon from "@material-ui/icons/ThumbUp";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

const MyArticles = ({
  page,
  styles,
  classes,
  articles,
  expanded,
  chunkSize,
  myProfile,
  handleChange,
  deleteArticle,
  handlePagination,
  authorArticlesChunk,
  copyHandler,
}) => (
  <div className={styles.myArticles}>
    <div>
      {authorArticlesChunk().map(({ ref, path, date, title, upvote, pryImage }) => {
        return (
          <Accordion expanded={expanded === ref} onChange={handleChange(ref)} key={ref}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="my-views" id="my-views">
              <Typography className={classes.heading}>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div className={styles.accordionStyle}>
                <div>
                  <Image src={pryImage} alt={title} layout="fill" />
                </div>
                <div>
                  <Link href={path}>
                    <a>{`https://ViewCrunch.com${path}`}</a>
                  </Link>
                  <div>
                    <Typography variant="subtitle2" color="textSecondary">
                      {date}
                    </Typography>
                    <span>
                      <UpvoteIcon color="primary" fontSize="small" /> &nbsp;
                      <Typography variant="body2" color="textSecondary">
                        {shortNumber(upvote)}
                      </Typography>
                    </span>
                  </div>
                </div>
                {myProfile && (
                  <div>
                    <Tooltip title="Copy">
                      <IconButton aria-label="copy" onClick={copyHandler(ref)}>
                        <FileCopyIcon />
                      </IconButton>
                    </Tooltip>
                    {/* <Link href={{ pathname: `/crunch/retouch`, query: { id: toId(title) } }}>
                      <a>
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </a>
                    </Link> */}
                    {/* <Tooltip title={views < 100 ? "Delete" : "Retain"}>
                      <IconButton aria-label="delete" onClick={() => deleteArticle({ id, crunch, views, title, upvote })}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip> */}
                  </div>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
    <br />
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      count={Math.ceil(articles.length / chunkSize)}
      page={page}
      onChange={handlePagination}
    />
  </div>
);

export default MyArticles;
