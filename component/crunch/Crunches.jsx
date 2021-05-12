import Link from "next/link";
import Fade from "react-reveal/Fade";
import { styles, MembersContainer } from "/";
import { Paper, Button, Typography } from "@material-ui/core";
import { CoverPic, Dialog, Drawer } from "@component/others";
import { shortNumber, trimString } from "@utils/clientFunctions";
import TransitionGroup from "react-transition-group/TransitionGroup";

const Crunch = ({
  myHandle,
  moreActions,
  activeCrunch,
  reportHandler,
  displayReport,
  setMoreActions,
  displayMembers,
  setActiveCrunch,
  confirmUnfollow,
  unfollowHandler,
  setDisplayReport,
  setDisplayMembers,
  setConfirmUnfollow,
  activeCrunchHandler,
  activeViewscapeChunk,
}) => (
  <>
    <div className={styles.crunches}>
      {activeViewscapeChunk.map((activeViewscape, index) => (
        <TransitionGroup key={index} {...{ appear: false, enter: true, exit: true }}>
          {activeViewscape?.map(({ id, title, coverPicture, primaryPicture, roles, dateCreated, about, moderators, followers }) => (
            <Fade key={id} collapse bottom>
              <Paper elevation={5}>
                <Link href={`/crunch/${id}`}>
                  <div>
                    <Typography component="div" variant="body2">{`${shortNumber(
                      followers.length
                    )} members 💗 Created ${dateCreated}`}</Typography>
                    <CoverPic
                      {...{
                        imgSrcA: coverPicture || "/images/ViewCrunch-cover.webp",
                        imgAltA: title || "ViewCrunch cover picture",
                        imgSrcB: primaryPicture || "/images/ViewCrunch.webp",
                        imgAltB: title || "ViewCrunch logo",
                      }}
                    />
                    <Typography component="div" variant="body1" color="textSecondary">
                      {title}
                    </Typography>
                    <div>{trimString(about, 200)}</div>
                  </div>
                </Link>
                <div>
                  <Button
                    size="small"
                    color="inherit"
                    variant="outlined"
                    style={{ color: "red" }}
                    onClick={activeCrunchHandler({ id, title, moderators, followers })}>
                    unfollow
                  </Button>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    onClick={activeCrunchHandler({ id, title, moderators, followers, more: true })}>
                    ●●●
                  </Typography>

                  <Link href={`/crunch/publish?id=${id}`}>
                    <Button variant="outlined" size="small" color="secondary" disabled={!roles.publish}>
                      publish
                    </Button>
                  </Link>
                </div>
              </Paper>
            </Fade>
          ))}
        </TransitionGroup>
      ))}

      <>
        <Dialog
          dialogTitle={`Unfollow ${activeCrunch?.title}`}
          dialogBody={
            <>
              You are about to unfollow {activeCrunch?.title}. If you wish to proceed, please enter
              <b> {activeCrunch?.title}</b> in the field below.{" "}
              {[activeCrunch?.moderators].flat(Infinity).includes(myHandle)
                ? `If you choose to unfollow ${activeCrunch?.title} you will no longer be able to influence administrative activities of ${activeCrunch?.title}.`
                : ""}
            </>
          }
          dialogHandler={unfollowHandler}
          compareText={activeCrunch?.title}
          displayDialog={confirmUnfollow}
          setDisplayDialog={setConfirmUnfollow}
          proceed="unfollow"
        />
        <Dialog
          dialogTitle="Report Crunch"
          dialogBody={`If you report ${activeCrunch?.title}, Moderators and Admins won't receive your profile details; Enter issues you have with the crunch below(characters must not exceed 200 and must contain only alphabet).
        `}
          dialogHandler={reportHandler}
          displayDialog={displayReport}
          setDisplayDialog={setDisplayReport}
          compareText="feedback"
          proceed="report"
        />
        {displayMembers && <MembersContainer {...{ activeCrunch, setActiveCrunch, displayMembers, setDisplayMembers }} />}
        <Drawer title={activeCrunch.title} list={activeCrunch.list} displayDrawer={moreActions} setDisplayDrawer={setMoreActions} />
      </>
    </div>
  </>
);

export default Crunch;
