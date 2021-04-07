import { FixedIcon } from "@component/others";
import { connect } from "react-redux";
import Link from "next/link";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { shortNumber } from "@utils/clientFunctions";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { LineText } from "@component/others";
import { SocialShare } from "@component/others";
import { styles } from "/";
import { fetcher, trimString } from "@utils/clientFunctions";
import Grid from "@material-ui/core/Grid";
import { Dialog, Drawer } from "@component/others";
// import { MembersContainer, ShareContainer } from "/";
import { SecBodyContainer } from "@component/homePage";

const Space = ({
  moreActions,
  displayMembers,
  setDisplayMembers,
  cancelHandler,
  space,
  title,
  about,
  follow,
  reportHandler,
  displayReport,
  setDisplayReport,
  forceRefresh,
  unfollowHandler,
  confirmUnfollow,
  moreActionsHandler,
  unfollowConfirmationHandler,
  coverPicture,
  primaryPicture,
  members,
  dateCreated,
  views,
}) => (
  <Grid container alignContent="flex-start" className={styles.space}>
    <Grid item xs={12} sm={12} md={12} />
    {/* <Grid item xs={12} sm={12} md={12}>
      <Paper elevation={3}>
        <div>
          <Typography component="div" variant="body2">{`${shortNumber(members)} members 💗 Created ${dateCreated}`}</Typography>
          <img src={coverPicture || "/images/viewChest-cover.webp"} alt={title || "viewChest cover picture"} />
          <img src={primaryPicture || "/images/viewChest.webp"} alt={title || "viewChest logo"} />
        </div>
        <div>
          <div>{title}</div>
          <div>{about}</div>
          <div>
            <Button
              size="small"
              color="inherit"
              variant="outlined"
              style={{ color: "rgb(185, 24, 24)" }}
              onClick={unfollowConfirmationHandler}>
              {follow ? "unfollow" : "follow"}
            </Button>

            <Typography variant="body1" color="textSecondary" onClick={moreActionsHandler}>
              ●●●
            </Typography>
            <Link href={`/space/publish?id=${space}`}>
              <Button variant="outlined" size="small" color="secondary">
                publish
              </Button>
            </Link>
          </div>
        </div>
      </Paper>
      {confirmUnfollow && (
        <Dialog
          proceed="unfollow"
          handler={unfollowHandler}
          title={`Unfollow ${title}`}
          cancelHandler={cancelHandler}
          message={`You are about to unfollow ${title}, do you wish to proceed. ${
            moderators.includes(handle)
              ? `If you choose to unfollow ${title} you will no longer be able to influence administrative activities of ${title}.`
              : ""
          }`}
        />
      )}
      {moreActions && (
        <Drawer
          {...{
            forceRefresh,
            title,
            list: [
              { label: "Followers", handler: () => setDisplayMembers("followers") },
              {
                label: `Report ${trimString(title, 20)}`,
                handler: () => {
                  setDisplayReport(true);
                },
              },
              { jsx: <SocialShare postUrl={`https://viewchest.com/space/${space}`} title={title} author={title} />, handler: "link" },
              { label: "Moderators", handler: () => setDisplayMembers("moderators") },
            ],
          }}
        />
      )}
      {displayReport && (
        <Dialog
          proceed="report"
          handler={reportHandler}
          title={`Report ${title}`}
          cancelHandler={cancelHandler}
          feedback={true}
          message={`If you report ${title}, moderators won't be notified and cannot receive your profile details. viewChest will review ${title} before taking any action.`}
        />
      )}
       {displayShare && <ShareContainer {...{ moreActions, setDisplayShare }} />} 
      {displayMembers && <MembersContainer {...{ moreActions, displayMembers, setDisplayMembers }} />}
    </Grid> */}

    <Grid item xs={12} sm={12} md={12} style={{ marginTop: "50px" }}>
      <SecBodyContainer articles={views} />
    </Grid>
  </Grid>
);

export default Space;
