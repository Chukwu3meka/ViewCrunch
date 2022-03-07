import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchIDContainer from "@component/crunch/crunchID";

const CrunchID = ({ crunchDetails, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: crunchDetails.title,
          seo_description: crunchDetails.about,
          seo_hashtag: `#${crunchDetails.title}`,
          seo_keywords: `viewcrunch crunches, viewcrunch, crunches, ${crunchDetails.title?.toLowerCase()}`,
        }}
      />
      <CrunchIDContainer crunchDetails={crunchDetails} />
    </>
  );
};

export default CrunchID;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;

  try {
    const { dateCalculator, toId } = require("@utils/clientFunctions");
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = (await profileFromRefresh({ cookie: ctx.req.headers.cookie, optional: true })) || {};

    const { crunchRef } = await require("@utils/firebaseServer");

    const crunchID = ctx.query.id;

    const crunchDetails = await crunchRef
      .doc(crunchID)
      .get()
      .then(async (snapshot) => {
        const { about, contributors, date, followers, moderators, picture, suspended, title, stat } = snapshot.data();

        return {
          about,
          title,
          picture,
          crunchID,
          suspended,
          follower: followers?.includes(profile.id),
          moderator: moderators?.includes(profile.id),
          contributor: contributors?.includes(profile.id),
          date: dateCalculator({ date: date.toDate().toDateString() }),
          ...stat,
          lastPublished: dateCalculator({ date: stat.lastPublished.toDate().toDateString() }),
        };
      })
      .catch((err) => {
        throw err;
      });

    return { props: { error: {}, crunchDetails } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
