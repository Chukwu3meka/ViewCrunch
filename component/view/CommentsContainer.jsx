import { Comments } from "/";
import { useState } from "react";
import { useSnackbar } from "notistack";

const Comment = ({ online, view: { comments: initialComments }, profile: { myDisplayName, myProfilePicture } }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newComment, setNewComment] = useState(""),
    [lessMore, setLessMore] = useState(5);
  const [comments, setComments] = useState(initialComments);
  const [newestComment, setNewestComment] = useState(null);

  const lessMoreFunc = (sign) => () => {
    setLessMore(sign === "plus" ? lessMore + 5 : sign === "minus" ? lessMore - 5 : 5);
    setNewestComment(null);
  };

  const addComment = async () => {
    if (online) {
      if (newComment?.length >= 13) {
        setComments(
          [
            comments,
            { comment: newComment, displayName: myDisplayName, profilePicture: myProfilePicture, date: new Date().toDateString() },
          ].flat(Infinity)
        );
        setNewComment("");
        setNewestComment({
          comment: newComment,
          displayName: myDisplayName,
          profilePicture: myProfilePicture,
          date: new Date().toDateString(),
        });
        // await fetcher("/api/addComment", JSON.stringify({ token, articleId, newComment }));
      } else {
        enqueueSnackbar("Your comment is not valid", { variant: "warning" });
      }
    } else {
      enqueueSnackbar("No network connectivity", { variant: "error" });
    }
  };

  return (
    <Comments
      {...{
        lessMore,
        comments,
        newComment,
        addComment,
        lessMoreFunc,
        setNewComment,
        newestComment,
        myDisplayName,
        myProfilePicture,
      }}
    />
  );
};

export default Comment;
