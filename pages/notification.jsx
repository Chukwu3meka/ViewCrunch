import ErrorPage from "@component/others/ErrorPage";
import SeoHead from "@component/others/SeoHead";
import NotificationContainer from "@component/notification";

const NotificationPage = ({ notification, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return <NotificationContainer notification={notification} />;
};

export default NotificationPage;

export const getServerSideProps = async (ctx) => {
  try {
    const { errorProp } = require("@utils/clientFunctions");
    const { fetchNotification } = await require("@utils/firestoreFetch");

    // const { fetchProfile } = require("@utils/firestoreFetch");
    const { profileFromRefresh } = require("@utils/serverFunctions");

    // const myID = await profileFromRefresh({ cookie: ctx.req.headers.cookie });
    const myID = await profileFromRefresh({ cookie: "sadA" });

    console.log(myID);
    // if (!myHandle) return errorProp(401, "User not logged in");

    // const { notification } = await fetchProfile(myHandle);
    // if (typeof notification !== "object") return errorProp(404, "Favourite and Blacklist not found");

    return {
      props: {
        error: true,
        notification: [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: true,
        notification: [],
      },
    };
  }
};
