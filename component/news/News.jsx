import { LineText } from "@component/others";
import { styles } from ".";

const News = ({ date, flash }) => (
  <div className={styles.news}>
    <LineText title={`${date} ~ NEWS Flash`} />

    <div>
      {flash?.split("@@@").map((x) => (
        <span>{x}</span>
      ))}
    </div>

    {/* <div></div> */}
  </div>
);

export default News;
