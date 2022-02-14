import ErrorPage from "@component/others/ErrorPage";
import SeoHead from "@component/others/SeoHead";
import NotificationContainer from "@component/notification";

const NotificationPage = ({ notification, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

  return <NotificationContainer notification={notification} />;
};

export default NotificationPage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const myID = await profileFromRefresh({ cookie: ctx.req.headers.cookie });

    console.log(myID.notification);

    return {
      props: {
        error: {},
        notification: [],
      },
    };
  } catch (error) {
    const { code, dev, title } =
      typeof error === "number" ? errorCodes[error] : { code: 400, dev: error, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", { code, dev, title });

    return { props: { error: { code, title } } };
  }
};
