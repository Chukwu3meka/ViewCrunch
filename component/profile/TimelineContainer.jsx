import Link from "next/link";
import { Timeline } from "/";

import Rating from "@material-ui/lab/Rating";
import HotelIcon from "@material-ui/icons/Hotel";
import StarsIcon from "@material-ui/icons/Highlight";
import { makeStyles } from "@material-ui/core/styles";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MusicOffIcon from "@material-ui/icons/MusicOff";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "6px 16px",
    "&>*:last-child>span": {
      display: "flex",
      justifyContent: "center",
    },
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const TimelineContainer = ({ viewerHistory: { date1, date2, upvote1, upvote2, downvote1, downvote2 }, profileCreated }) => {
  const classes = useStyles();

  const viewerHistoryFunc = () => {
    return [
      [
        "Profile",
        `Account was created on ${profileCreated}`,
        <TimelineDot>
          <AccountBalanceIcon />
        </TimelineDot>,
      ],
      [
        "First Article",
        <Link href={{ pathname: date1?.path || "/profile" }}>
          <a>{date1.label || "No post published"}</a>
        </Link>,
        <TimelineDot color="secondary">
          <LaptopMacIcon />
        </TimelineDot>,
      ],
      [
        "Last Article",
        <Link href={{ pathname: date2?.path || "/profile" }}>
          <a>{date2.label || "No post published"}</a>
        </Link>,
        <TimelineDot color="primary">
          <HotelIcon />
        </TimelineDot>,
      ],
      [
        "Highest Rating",
        <>
          <Link href={{ pathname: upvote1?.path || "/profile" }}>
            <a>{upvote1?.label || "No post published"}</a>
          </Link>
          <br />
          <Rating name="pristine" value={5} />
        </>,
        <TimelineDot color="secondary" variant="outlined">
          <StarsIcon />
        </TimelineDot>,
      ],
      [
        "Least Rating",
        <>
          <Link href={{ pathname: upvote2?.path || "/profile" }}>
            <a>{upvote2?.label || "No post published"}</a>
          </Link>
          <br />
          <Rating name="pristine" value={1} />
        </>,
        <TimelineDot color="primary" variant="outlined">
          <TrendingDownIcon />
        </TimelineDot>,
      ],
      [
        "Most Downvotes",
        <Link href={{ pathname: downvote1?.path || "/profile" }}>
          <a>{downvote1?.label || "No post published"}</a>
        </Link>,
        <TimelineDot color="secondary">
          <QueueMusicIcon />
        </TimelineDot>,
      ],
      [
        "Least Downvotes",
        <Link href={{ pathname: downvote2?.path || "/profile" }}>
          <a>{downvote2?.label || "No post published"}</a>
        </Link>,
        <TimelineDot>
          <MusicOffIcon />
        </TimelineDot>,
      ],
      [
        "ViewCrunch",
        "Keep sharing your view on the world, with the world",
        <TimelineDot color="primary">
          <FastfoodIcon />
        </TimelineDot>,
      ],
    ];
  };

  return <Timeline {...{ viewerHistoryFunc, classes }} />;
};

export default TimelineContainer;
