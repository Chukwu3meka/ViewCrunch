import { ViewPopup } from "/";
import { useState } from "react";

const ViewPopupContainer = ({ moreActions, forceRefresh, reportView, setReportView, view }) => {
  const [viewInFavourite, setViewInFavourite] = useState(view?.viewInFavourite);
  const [viewInBlacklist, setViewInBlacklist] = useState(view?.viewInBlacklist);

  const reportHandler = (action) => () => {
    console.log(`${action} report`);
    setReportView(true);
  };

  const favouriteHandler = () => {
    const status = !viewInFavourite;
    setViewInFavourite(status);
    console.log(`${status} favourite`);
  };

  const blacklistHandler = () => {
    const status = !viewInBlacklist;
    setViewInBlacklist(status);
    console.log(`${status} blacklist`);
  };

  return (
    <ViewPopup
      {...{
        moreActions,
        forceRefresh,
        reportView,
        setReportView,
        view,
        favouriteHandler,
        blacklistHandler,
        reportHandler,
        viewInFavourite,
        viewInBlacklist,
      }}
    />
  );
};

export default ViewPopupContainer;
