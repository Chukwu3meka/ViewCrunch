import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import BookmarksContainer from "@component/bookmarks";
import { dateCalculator, range, toId } from "@utils/clientFunctions";

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
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = await profileFromRefresh({ cookie: ctx.req.headers.cookie });

    const { viewRef, profileRef } = await require("@utils/firebaseServer");

    const bookmarks = [];

    for (const bookmark of profile.bookmarks.reverse()) {
      await viewRef
        .doc(bookmark)
        .get()
        .then(async (snapshot) => {
          const {
            title,
            content,
            stat: { author, crunch, date, readTime, keywords, description, image, viewLink },
          } = snapshot.data();

          const { profilePicture, profileLink, displayName } = await profileRef
            .doc(author)
            .get()
            .then((snapshot) => {
              const {
                picture: { profile: profilePicture },
                details: { profileLink, displayName },
              } = snapshot.data();

              return { profilePicture, profileLink, displayName };
            });

          bookmarks.push({
            image,
            title,
            author,
            crunch,
            content,
            readTime,
            description,
            displayName,
            profileLink,
            profilePicture,
            viewLink: `/view/${viewLink}`,
            crunchLink: toId(`/crunch/${crunch}`),
            keyword: keywords[range(0, keywords.length - 1)],
            viewID: viewLink.split("-")[viewLink.split("-").length - 1],
            date: dateCalculator({ date: date.toDate().toDateString() }),
          });
        });
    }

    return { props: { error: {}, bookmarks } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
