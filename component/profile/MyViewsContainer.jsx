import { useState } from "react";
import { MyViews, styles } from "/";
import { fetcher, dateDiff } from "@utils/clientFunctions";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const MyArticlesContainer = (props) => {
  const chunkSize = 10,
    classes = useStyles(),
    [page, setPage] = useState(1),
    [views, setViews] = useState(props.views),
    [expanded, setExpanded] = useState(false),
    { myProfile, enqueueSnackbar, myHandle } = props,
    [selectedArticle, setSelectedArticle] = useState({});

  console.log(views);

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

  const shareHandler = ({ path, title, ref }) => () => {
    if (navigator) {
      navigator.share({ url: `https://viewcrunch.com/${path}`, title });
    } else {
      copyHandler(ref);
    }
  };

  const setDeleteEnabledHandler = ({ ref, title, upvote, date }) => {
    if (ref && title && !isNaN(upvote) && date) {
      if (upvote > 1) return enqueueSnackbar("Cannot delete view with upvotes", { variant: "error" });
      if (dateDiff(date) >= 90) return enqueueSnackbar("Cannot delete view older than three months", { variant: "error" });
      setSelectedArticle({ ref, title, upvote, date });
    } else {
      setSelectedArticle({});
    }
  };

  const deleteViewHandler = async () => {
    const status = await fetcher("/api/crunch/deleteView", JSON.stringify({ ...selectedArticle, myHandle }));
    if (status) {
      setViews(views.filter((x) => x.ref !== selectedArticle.ref));
      const index = views.findIndex((x) => x.ref === selectedArticle.ref);
      if (index !== -1) views.splice(index, 1);
      enqueueSnackbar("Deletion succesful", { variant: "success" });
      setDeleteEnabledHandler();
    } else {
      enqueueSnackbar("Unable to delete. Kindly try again, later.", { variant: "error" });
    }
  };

  return (
    <MyViews
      {...{
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
      }}
    />
  );
};

export default MyArticlesContainer;
