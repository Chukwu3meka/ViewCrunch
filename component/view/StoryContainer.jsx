import { Story, StoryNav } from "/";
import Grid from "@material-ui/core/Grid";
import { useState } from "react";
import { fetcher } from "@utils/clientFunctions";

const StoryContainer = ({ view, profile, advert, setMoreActions, setForceRefresh, setReportView, online }) => {
  // const StoryContainer = ({ myAuthorID, online, token, content, view }) => {
  //   // console.log(view);

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

  const moreActionsHandler = () => {
    setForceRefresh(Math.random() * 1000);
    setMoreActions(true);
  };

  return (
    <Grid container spacing={5}>
      <Story {...{ ...view, profile, moreActionsHandler, setReportView, online, view }} />
      <StoryNav {...{ ...view, advert }} />
    </Grid>
  );
};

export default StoryContainer;
