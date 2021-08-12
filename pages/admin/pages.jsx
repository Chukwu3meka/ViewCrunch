import { Button } from "@material-ui/core";
import { ErrorPage } from "@component/page";

const CopyAndPaste = ({ error, newsFlash: { flash, date } }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return (
    <Button
      onClick={() => {
        if (navigator) navigator.clipboard.writeText(`ViewCrunch NEWS for ${date}\n${flash.split("@@@").map((x) => `\n${x?.trim()}`)}`);
      }}>
      reset api keys
    </Button>
  );
};

export default CopyAndPaste;

export const getServerSideProps = async () => {
  const { fetchNews } = require("@utils/firestoreFetch");

  return {
    props: {
      newsFlash: (await fetchNews()) || {
        flash: "Today's NEWS not in yet ~ ViewCrunch is preparing something big for you",
        date: new Date().toDateString(),
      },
    },
  };
};
