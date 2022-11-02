import SeoHead from "@component/others/SeoHead";
import ErrorPage from "@component/others/ErrorPage";
import CrunchIDContainer from "@component/crunch/crunchID";

const CrunchID = ({ crunchDetails, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

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
    const { crunch_ID } = require("@utils/serverFbQuery");

    const crunchDetails = await crunch_ID({ cookie: ctx.req.headers.cookie, crunchID: ctx.query.id });

    return { props: { error: {}, crunchDetails } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
