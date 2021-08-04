import { styles } from ".";
import { LineText } from "@component/others";
import NextIcon from "@material-ui/icons/ArrowRightAlt";
import { Paper, Button, ButtonGroup } from "@material-ui/core";
import PreviousIcon from "@material-ui/icons/KeyboardBackspace";
import Head from "next/head";

const News = ({ date, flash, prev, next, scrollRef, newsFetcher }) => (
  <>
    <Head>
      <link rel="canonical" href="https://www.viewcrunch.com/news" />
    </Head>
    <Paper className={styles.news} ref={scrollRef}>
      <LineText title={`ViewCrunch NEWS for ${date}`} />

      <div>
        {flash?.split("@@@").map((x, index) =>
          x ? (
            <Paper elevation={4} key={index + 1}>
              {x}
            </Paper>
          ) : (
            ""
          )
        )}
      </div>

      <ButtonGroup variant="contained" aria-label="contained primary button group" color="secondary" align="center">
        {prev ? (
          <Button startIcon={<PreviousIcon />} onClick={newsFetcher(0)}>
            {prev}
          </Button>
        ) : (
          ""
        )}
        {next ? (
          <Button endIcon={<NextIcon />} onClick={newsFetcher(1)}>
            {next}
          </Button>
        ) : (
          ""
        )}
      </ButtonGroup>
    </Paper>
  </>
);

export default News;
