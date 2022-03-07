import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchesContainer from "@component/crunch/crunches";

const CrunchIndex = ({ myCrunches, recentCrunches, otherCrunches, error: { code, title } }) => {
  if (code) return <ErrorPage statusCode={code} title={title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: "ViewCrunch Crunches Page",
          seo_description: "ViewsCrunch Crunches page. Here you get a list of views you have bookmarked.",
          seo_hashtag: "#ViewCrunch Crunches",
          seo_keywords: "viewcrunch crunches, viewcrunch, crunches",
        }}
      />
      <CrunchesContainer myCrunches={myCrunches} recentCrunches={recentCrunches} otherCrunches={otherCrunches} />
    </>
  );
};

export default CrunchIndex;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;
  try {
    const { dateCalculator, toId } = require("@utils/clientFunctions");
    const { profileFromRefresh } = require("@utils/serverFunctions");

    const profile = (await profileFromRefresh({ cookie: ctx.req.headers.cookie, optional: true })) || {};

    const { crunchRef } = await require("@utils/firebaseServer");
    const { Timestamp } = require("firebase-admin/firestore");

    const crunches = [],
      myCrunches = [],
      otherCrunches = [],
      recentCrunches = [];

    if (profile.id) {
      for (const crunch of profile.crunches) {
        const crunchID = toId(crunch);
        crunches.push(crunchID);

        await crunchRef
          .doc(crunchID)
          .get()
          .then(async (snapshot) => {
            const {
              about,
              contributors,
              date,
              followers,
              moderators,
              picture,
              suspended,
              title,
              stat: { totalFollowers },
            } = snapshot.data();

            myCrunches.push({
              crunchID,
              about,
              contributor: contributors?.includes(profile.id),
              date: dateCalculator({ date: date.toDate().toDateString() }),
              follower: followers?.includes(profile.id),
              moderator: moderators?.includes(profile.id),
              picture,
              suspended,
              title,
              totalFollowers,
            });
          });
      }
    }

    let lastVisible;
    for (let loop = 0; loop < 3; loop++) {
      if (otherCrunches.length >= 5) break;

      await (lastVisible
        ? crunchRef
            .where("suspended", "==", false)
            .orderBy("stat.lastPublished", "desc")
            .startAfter(Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title))
            .limit(5)
        : crunchRef.where("suspended", "==", false).orderBy("stat.lastPublished", "desc").limit(7)
      )
        .get()
        .then(async (snapshot) => {
          for (const crunch of snapshot.docs) {
            const crunchID = crunch.id,
              {
                about,
                contributors,
                date,
                followers,
                moderators,
                picture,
                suspended,
                title,
                stat: { totalFollowers },
              } = crunch.data();

            // take only crunches i donot follow
            if (!crunches.includes(crunchID)) {
              lastVisible = { title, date: JSON.stringify(date.toDate()) };
              otherCrunches.push({
                crunchID,
                about,
                contributor: contributors?.includes(profile.id),
                date: dateCalculator({ date: date.toDate().toDateString() }),
                follower: followers?.includes(profile.id),
                moderator: moderators?.includes(profile.id),
                picture,
                suspended,
                title,
                totalFollowers,
              });
            }
          }
        });
    }

    // get recently created crunches
    await crunchRef
      .where("suspended", "==", false)
      .orderBy("date", "desc")
      .limit(3)
      .get()
      .then(async (snapshot) => {
        for (const crunch of snapshot.docs) {
          const crunchID = crunch.id,
            {
              about,
              contributors,
              date,
              followers,
              moderators,
              picture,
              suspended,
              title,
              stat: { totalFollowers },
            } = crunch.data();

          recentCrunches.push({
            crunchID,
            about,
            contributor: contributors?.includes(profile.id),
            date: dateCalculator({ date: date.toDate().toDateString() }),
            follower: followers?.includes(profile.id),
            moderator: moderators?.includes(profile.id),
            picture,
            suspended,
            title,
            totalFollowers,
          });
        }
      });

    return { props: { error: {}, myCrunches, otherCrunches, recentCrunches } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
