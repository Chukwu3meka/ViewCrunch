import Timeline from "@material-ui/lab/Timeline";
import { Paper, Typography } from "@material-ui/core";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";

const TimeLine = ({ viewerHistoryFunc, classes }) => (
  <div style={{ width: "100%" }}>
    <Timeline align="alternate">
      {viewerHistoryFunc().map(([label, desc, icon], index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            {icon}
            <TimelineConnector className={classes.secondaryTail} />
          </TimelineSeparator>
          <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
              <Typography variant="h6" component="h1">
                {label}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {desc}
              </Typography>
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  </div>
);

export default TimeLine;
