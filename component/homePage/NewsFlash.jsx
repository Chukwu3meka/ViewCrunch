import Paper from "@material-ui/core/Paper";
import { LineText } from "@component/others";
import { dateCalculator } from "@utils/clientFunctions";
import Typography from "@material-ui/core/Typography";

const NewsFlash = ({ newsFlash }) => (
  <div>
    <LineText title="NEWS Flash" />
    {newsFlash.length
      ? newsFlash.map(({ flash, source, newsLink, date }, index) => (
          <a href={newsLink} key={index}>
            <Paper elevation={4}>
              <Typography variant="body1">{flash}</Typography>
              <Typography variant="caption" color="secondary">{`${source} | ${dateCalculator({ date })}`}</Typography>
            </Paper>
          </a>
        ))
      : ""}
  </div>
);

export default NewsFlash;
