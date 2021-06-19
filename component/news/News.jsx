import { LineText } from "@component/others";
import { styles } from ".";
import { Paper } from "@material-ui/core";

const News = ({ date, flash }) => (
  <div className={styles.news}>
    <LineText title={`${date} ~ NEWS Flash`} />

    <div>
      {flash?.split("@@@").map((x) => (
        <Paper elevation={4}>{x}</Paper>
      ))}
    </div>
  </div>
);

export default News;
