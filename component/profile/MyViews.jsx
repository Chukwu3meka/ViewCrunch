import Link from "next/link";
import Image from "next/image";
import { Dialog } from "@component/others";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import DeleteIcon from "@material-ui/icons/Delete";
import UpvoteIcon from "@material-ui/icons/ThumbUp";
import Pagination from "@material-ui/lab/Pagination";
import { shortNumber } from "@utils/clientFunctions";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Tooltip, Typography, IconButton, Accordion, AccordionDetails, AccordionSummary } from "@material-ui/core";

const MyArticles = ({
  page,
  views,
  styles,
  classes,
  expanded,
  chunkSize,
  myProfile,
  copyHandler,
  handleChange,
  shareHandler,
  selectedArticle,
  handlePagination,
  deleteViewHandler,
  authorArticlesChunk,
  setDeleteEnabledHandler,
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
                    <Tooltip title={upvote < 1 ? "Delete" : "Disabled"}>
                      <IconButton aria-label="delete" onClick={() => setDeleteEnabledHandler({ ref, title, upvote, date })}>
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

    <Dialog
      dialogTitle="Delete Article"
      dialogBody={`You are about to delete "${selectedArticle.title}", published on ${selectedArticle.date}, with ${
        selectedArticle.upvote ? shortNumber(selectedArticle.upvote) : "no"
      } ${selectedArticle.upvote < 2 ? "upvote" : "upvotes"}. Please input the title to confirm deletion`}
      dialogHandler={deleteViewHandler}
      displayDialog={selectedArticle.title}
      setDisplayDialog={setDeleteEnabledHandler}
      compareText={selectedArticle.title}
      proceed="delete"
    />
  </div>
);

export default MyArticles;
