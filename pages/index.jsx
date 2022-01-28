import { ErrorPage } from "@component/page";
import HomeContainer from "@component/home";

const Index = ({ error, trending, crunches }) => {
  if (error) return <ErrorPage statusCode={error?.code} title={error?.title} />;

  return <HomeContainer trending={trending} crunches={crunches} />;
};

export default Index;

export const getServerSideProps = async () => {
  const { errorProp } = require("@utils/serverFunctions"),
    { fetchHomeData } = require("@utils/firestoreFetch"),
    { error, trending, crunches } = await fetchHomeData();

  if (error) return errorProp(400, "Unable to fetch Data");

  return { props: { trending, crunches } };
};
