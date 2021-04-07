import { time2read, trimString, shortNumber, toHref } from "@utils/clientFunctions";
import { SocialShare, Drawer, Dialog } from "@component/others";

const ViewPopup = ({
  moreActions,
  forceRefresh,
  reportView,
  setReportView,
  view: { title, displayName, author },
  viewInFavourite,
  viewInBlacklist,
  favouriteHandler,
  blacklistHandler,
  reportHandler,
}) => {
  return (
    <>
      {moreActions && (
        <Drawer
          {...{
            forceRefresh,
            title: "View options",
            list: [
              { label: viewInBlacklist ? "Whitelist" : "Blacklist", handler: blacklistHandler },
              { label: viewInFavourite ? "Remove view from favourite" : "Add view to favourite", handler: favouriteHandler },
              { label: "Report view to Moderators and viewChest", handler: () => setReportView(true) },
              {
                jsx: (
                  <SocialShare
                    share
                    {...{
                      viewHref: toHref({ author, title }),
                      title: title,
                      author: displayName,
                    }}
                  />
                ),
              },
            ],
          }}
        />
      )}
      {reportView && (
        <Dialog
          proceed="report"
          handler={reportHandler}
          title={`Report View`}
          // forceRefresh={forceRefresh}
          cancelHandler={() => setReportView(false)}
          feedback={true}
          message={`Reporting this view, will automatically add it to your blacklist. Moderators won't receive your profile details; Do you wish to proceed.`}
        />
      )}
    </>
  );
};

export default ViewPopup;
