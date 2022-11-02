import PublishContainer from "@component/crunch/publish";

import ErrorPage from "@component/others/ErrorPage";

const Publish = ({ crunches, displayName, error: { code, title } }) => {
  if (code) return <ErrorPage code={code} title={title} />;

  return (
    <>
      {/* SEO page */}
      <PublishContainer crunches={crunches} displayName={displayName} />
    </>
  );
};
export default Publish;

export const getServerSideProps = async (ctx) => {
  const errorCodes = require("@source/errorCodes").default;

  try {
    const { crunch_publish } = require("@utils/serverFbQuery");

    const { crunches, displayName } = await crunch_publish({ cookie: ctx.req.headers.cookie });

    return { props: { error: {}, crunches, displayName } };
  } catch (error) {
    const { code, title } = typeof error === "number" ? errorCodes[error] : { code: 400, title: "Internal Server Error" };

    if (process.env.NODE_ENV === "development") console.log("Error Occured::: ", error);

    return { props: { error: { code, title } } };
  }
};
