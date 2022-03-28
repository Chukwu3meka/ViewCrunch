import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import NotificationContainer from "@component/notification";
import { dateCalculator } from "@utils/clientFunctions";

const NotificationPage = ({ notification, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Notification Page",
          seo_description: "ViewsCrunch Notification page. Here you get a report on all activities relating to your account.",
          seo_hashtag: "#ViewCrunch Notification",
          seo_keywords: "viewcrunch notification, viewcrunch, notification",
        }}
      />
      <NotificationContainer notification={notification} />;
    </>
  );
};

export default NotificationPage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = await profileFromRefresh({ cookie: ctx.req.headers.cookie });

    const messages = Object.entries(profile.notification)
      .map(([key, value]) => ({
        ...value,
        message: key,
        date: dateCalculator({ date: value.date.toDate().toDateString() }),
      }))
      .reverse();

    return {
      props: {
        error: {},
        notification: { messages, unseen: profile.unseenNotification },
      },
    };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
