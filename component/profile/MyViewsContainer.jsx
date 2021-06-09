import { makeStyles } from "@material-ui/core/styles";
import { fetcher } from "@utils/clientFunctions";
import { useState } from "react";
import { MyViews, MyViewsDialog, styles } from "/";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyArticlesContainer = ({ articles, token, myProfile, enqueueSnackbar }) => {
  const chunkSize = 10,
    classes = useStyles(),
    [page, setPage] = useState(1),
    [expanded, setExpanded] = useState(false),
    [forceRefresh, setForceRefresh] = useState(0);

  // const [deleteFailed, setDeleteFailed] = useState(false);
  // const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [verifiedArticle, setVerifiedArticle] = useState(false);

  const copyHandler = (id) => () => {
    navigator.clipboard.writeText(`https://ViewCrunch.com${id}`);
    enqueueSnackbar("Copied to clipboard", { variant: "info" });
  };

  console.log(articles);

  const authorArticlesChunk = () => {
    if (!articles.length) return [];
    const chunk = [];
    for (let i = 0; i < articles.length; i += chunkSize) {
      chunk.push(articles.slice(i, i + chunkSize));
    }
    return chunk[page - 1];
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const deleteArticle = ({ id, upvote, view, title, rating }) => {
    setDeleteEnabled(upvote < 100 ? true : false);
    setVerifiedArticle(upvote < 100 ? false : true);
    // setDeleteSuccess(false);
    // setDeleteFailed(false);
    enqueueSnackbar("Cannot delete view with over 100 upvotes", { variant: "warning" });

    if (upvote < 100) {
      setSelectedArticle({ id, view, title, rating });
    }
    // setForceRefresh(Math.random() * 1000);
  };

  const confirmDeleteArticle = () => {
    const { status } = fetcher("/api/deleteArticle", JSON.stringify({ articleId: selectedArticle.id, token }));

    if (status === "success") {
      // setDeleteSuccess(true);
      enqueueSnackbar("Deleted succesfully", { variant: "success" });

      setDeleteEnabled(false);

      setVerifiedArticle(false);
      const index = articles.findIndex((x) => x.id === selectedArticle.id);
      if (index > -1) articles.splice(index, 1);
      setSelectedArticle({});
    }
    if (status !== "success") {
      // setDeleteFailed(true);
      enqueueSnackbar("Unable to delete", { variant: "error" });
    }
  };

  return (
    <>
      <MyViews
        {...{
          page,
          styles,
          classes,
          articles,
          expanded,
          myProfile,
          handleChange,
          chunkSize,
          deleteArticle,
          handlePagination,
          authorArticlesChunk,

          copyHandler,
        }}
      />
      <MyViewsDialog
        {...{ forceRefresh, deleteEnabled, verifiedArticle, selectedArticle, confirmDeleteArticle }}
        // {...{ forceRefresh, deleteFailed, deleteSuccess, deleteEnabled, verifiedArticle, selectedArticle, confirmDeleteArticle }}
      />
    </>
  );
};

export default MyArticlesContainer;
