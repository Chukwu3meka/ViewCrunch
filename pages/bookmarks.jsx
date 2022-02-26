import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import BookmarksContainer from "@component/bookmarks";

const NotificationPage = ({ bookmarks, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Bookmarks Page",
          seo_description: "ViewsCrunch Bookmarks page. Here you get a views yoyu have bookmarked.",
          seo_hashtag: "#ViewCrunch Bookmarks",
          seo_keywords: "viewcrunch bookmarks, viewcrunch, bookmarks",
        }}
      />
      <BookmarksContainer bookmarks={bookmarks} />;
    </>
  );
};

export default NotificationPage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const myID = await profileFromRefresh({ cookie: ctx.req.headers.cookie });

    return {
      props: {
        error: {},
        bookmarks: myID.bookmarks,
      },
    };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
