import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import BookmarksContainer from "@component/bookmarks";

const BookmarksPage = ({ bookmarks, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Bookmarks Page",
          seo_description: "ViewsCrunch Bookmarks page. Here you get a list of views you have bookmarked.",
          seo_hashtag: "#ViewCrunch Bookmarks",
          seo_keywords: "viewcrunch bookmarks, viewcrunch, bookmarks",
        }}
      />
      <BookmarksContainer bookmarks={bookmarks} />;
    </>
  );
};

export default BookmarksPage;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { bookmarks_index } = require("@utils/serverFbQuery");

    const bookmarks = await bookmarks_index({ cookie: ctx.req.headers.cookie });

    return { props: { error: {}, bookmarks } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
