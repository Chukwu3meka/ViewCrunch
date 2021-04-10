import { Story, StoryNav } from "/";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { fetcher, toId } from "@utils/clientFunctions";
import { SocialShare, Drawer, Dialog } from "@component/others";

import { useSnackbar } from "notistack";

const StoryContainer = ({ view, profile, advert, online }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [viewInFavourite, setViewInFavourite] = useState(view.viewer.viewInFavourite);
  const [viewInBlacklist, setViewInBlacklist] = useState(view.viewer.viewInBlacklist);
  const [reportView, setReportView] = useState(false);

  const [moreActions, setMoreActions] = useState(false);
  //   const { date, title, handle, markdown, comments, authorId, articleId, avgRating, ratingData, noOfRating, viewLength, profilePicture } =
  //     content || [];

  // const myReview = 3,
  // // const myReview = ratingData[myAuthorID] .
  // [articleRating, setArticleRating] = useState(null),
  // postUrl = `https://www.viewchest.com/blog/${articleId}`,
  // ratingHandler = async (event, newValue) => {
  //   setArticleRating(newValue);
  //   if (newValue && online) {
  //     await fetcher("/api/rateArticle", JSON.stringify({ token, articleId, myAuthorID, articleRating: newValue }));
  //   }
  // };

  // const [forceRefresh, setForceRefresh] = useState(0),
  //   [moreActions, setMoreActions] = useState(false);

  const hideHandelr = () => {
    console.log("here");
  };

  const reportHandler = (action) => () => {
    console.log(`${action} report`);
    setReportView(true);
  };

  const favouriteHandler = async () => {
    const mode = !viewInFavourite;
    const status = await fetcher("/api/space/favourite", JSON.stringify({ view: view.id, myHandle: profile.myHandle, mode }));

    console.log(status, mode, "favourite");

    // setViewInFavourite(status);

    // if ("universal" === id) return enqueueSnackbar(`You can't unfollow Universal space`, { variant: "warning" });
  };

  const blacklistHandler = () => {
    const status = !viewInBlacklist;
    setViewInBlacklist(status);
    console.log(`${status} blacklist`);
  };

  const moreActionsHandler = () => {
    if (online) {
      setMoreActions([
        { label: viewInFavourite ? "Remove view from favourite" : "Add view to favourite", handler: favouriteHandler },
        { label: "Report view to Moderators and viewChest", handler: () => setReportView(true) },
        { label: viewInBlacklist ? "Remove from Blacklist" : "Add to Blacklist", handler: blacklistHandler },
        {
          jsx: (
            <SocialShare
              share
              {...{
                viewHref: `/${view?.author}/${view.id}`,
                title: view?.title,
                author: view?.author,
              }}
            />
          ),
        },
      ]);
    }
  };

  return (
    <Grid container spacing={5}>
      <Story {...{ ...view, profile, moreActionsHandler, setReportView, online, view, moreActions, setMoreActions }} />
      <StoryNav {...{ ...view.author, ...view.post, advert }} />
    </Grid>
  );
};

export default StoryContainer;
