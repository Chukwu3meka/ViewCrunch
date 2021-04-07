import { shortNumber } from "@utils/clientFunctions";
import { Dialog } from "@component/others";

const MyArticlesDialog = ({
  forceRefresh,
  deleteFailed,
  deleteSuccess,
  deleteEnabled,
  verifiedArticle,
  selectedArticle,
  confirmDeleteArticle,
}) => {
  return (
    <>
      {/* {deleteSuccess && <BottomAlert message="Article deleted succesfully" forceRefresh={forceRefresh} />} */}

      {/* {deleteFailed && <BottomAlert message="Unable to delete article" severity="error" forceRefresh={forceRefresh} />} */}

      {/* {verifiedArticle && (
        <BottomAlert
          message="Articles rated by over 100 people cannot be deleted; but improved as much as you like, so far it's content remains inline with the initial post."
          severity="warning"
          forceRefresh={forceRefresh}
        />
      )} */}

      {deleteEnabled && (
        <Dialog
          title="Delete Article"
          message={`You are about to delete "${selectedArticle.title}" with ${shortNumber(
            selectedArticle.view
          )} views and an average rating of ${selectedArticle.rating}. Please input the title to confirm deletion`}
          forceRefresh={forceRefresh}
          comparism={selectedArticle.title}
          handler={confirmDeleteArticle}
        />
      )}
    </>
  );
};

export default MyArticlesDialog;
