import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { newsStyles } from ".";

const News = ({ news }) =>
  news?.length ? (
    <div className={newsStyles.news}>
      <Typography variant="h2">Top Headlines</Typography>
      {news.map(({ title, link }) => (
        <Paper key={link}>
          <a target="_blank" href={link}>
            {title}
          </a>
        </Paper>
      ))}
    </div>
  ) : null;

export default News;
