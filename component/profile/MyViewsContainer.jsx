import { useState } from "react";
import { MyViews, styles } from "/";
import { fetcher } from "@utils/clientFunctions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyArticlesContainer = ({ views, myProfile, enqueueSnackbar, token }) => {
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

  const authorArticlesChunk = () => {
    if (!views.length) return [];
    const chunk = [];
    for (let i = 0; i < views.length; i += chunkSize) {
      chunk.push(views.slice(i, i + chunkSize));
    }
    return chunk[page - 1];
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePagination = (event, value) => {
    setPage(value);
  };

  const copyHandler = (id) => () => {
    if (navigator) {
      navigator.clipboard.writeText(`https://ViewCrunch.com${id}`);
      enqueueSnackbar("Copied to clipboard", { variant: "info" });
    } else {
      enqueueSnackbar("Blocked by server", { variant: "warning" });
    }
  };

  const deleteArticle = ({ id, upvote, view, title, rating }) => () => {
    return enqueueSnackbar("Deletion temporary disabled", { variant: "error" });
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
      const index = views.findIndex((x) => x.id === selectedArticle.id);
      if (index > -1) views.splice(index, 1);
      setSelectedArticle({});
    }
    if (status !== "success") {
      // setDeleteFailed(true);
      enqueueSnackbar("Unable to delete", { variant: "error" });
    }
  };

  const shareHandler = ({ path, title, ref }) => () => {
    if (navigator) {
      navigator.share({ url: `https://viewcrunch.com/${path}`, title });
    } else {
      copyHandler(ref);
    }
  };

  return (
    <MyViews
      {...{
        page,
        styles,
        classes,
        views,
        expanded,
        myProfile,
        handleChange,
        chunkSize,
        deleteArticle,
        handlePagination,
        authorArticlesChunk,
        shareHandler,
        copyHandler,

        // popup
        forceRefresh,
        deleteEnabled,
        selectedArticle,
        confirmDeleteArticle,
      }}
    />
  );
};

export default MyArticlesContainer;
