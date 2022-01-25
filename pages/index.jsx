import { ErrorPage } from "@component/page";
import HomeContainer from "@component/home";

const Index = ({ error, trending }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return <HomeContainer trending={trending} />;
};

export default Index;

export const getServerSideProps = async () => {
  const { errorProp } = require("@utils/serverFunctions"),
    { fetchTrending } = require("@utils/firestoreFetch");

  const { error, trending } = await fetchTrending();

  if (error) return errorProp(400, "Unable to fetch secondary data");

  return { props: { trending } };
};
