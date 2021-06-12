import { Dialog } from "@component/others";

import { styles } from "/";
import Link from "next/link";
import Image from "next/image";
import { shortNumber, toId } from "@utils/clientFunctions";

import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import Pagination from "@material-ui/lab/Pagination";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Tooltip, Typography, IconButton, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";

const MyArticles = ({
  page,
  styles,
  classes,
  views,
  expanded,
  chunkSize,
  myProfile,
  handleChange,
  deleteArticle,
  handlePagination,
  authorArticlesChunk,
  copyHandler,
  shareHandler,

  forceRefresh,
  deleteEnabled,
  selectedArticle,
  confirmDeleteArticle,
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
                    <a>{`https://viewcrunch.com${path}`}</a>
                  </Link>
                  <div>
                    <Tooltip title="share">
                      <ShareIcon aria-label="copy" color="primary" onClick={shareHandler({ path, title, ref })} />
                    </Tooltip>

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
                    <Link href={{ pathname: `/crunch/retouch`, query: { ref } }}>
                      <a>
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit">
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </a>
                    </Link>
                    <Tooltip title={upvote < 100 ? "Delete" : "Retain"}>
                      <IconButton aria-label="delete" onClick={deleteArticle({ ref, title })}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
      count={Math.ceil(views.length / chunkSize)}
      page={page}
      onChange={handlePagination}
    />

    {deleteEnabled ? (
      <Dialog
        title="Delete Article"
        message={`You are about to delete "${selectedArticle.title}" with ${shortNumber(
          selectedArticle.view
        )} views and an average rating of ${selectedArticle.rating}. Please input the title to confirm deletion`}
        forceRefresh={forceRefresh}
        comparism={selectedArticle.title}
        handler={confirmDeleteArticle}
      />
    ) : null}
  </div>
);

export default MyArticles;
