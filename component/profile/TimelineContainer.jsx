import Link from "next/link";
import { Timeline } from "/";
import HotelIcon from "@material-ui/icons/Hotel";
import StarsIcon from "@material-ui/icons/Highlight";
import { makeStyles } from "@material-ui/core/styles";
import { TimelineDot, Rating } from "@material-ui/lab";
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
        date1?.path ? (
          <Link href={{ pathname: date1?.path }}>
            <a>{date1.label}</a>
          </Link>
        ) : (
          "No post published"
        ),
        <TimelineDot color="secondary">
          <LaptopMacIcon />
        </TimelineDot>,
      ],
      [
        "Last Article",
        date2?.path ? (
          <Link href={{ pathname: date2?.path }}>
            <a>{date2.label}</a>
          </Link>
        ) : (
          "No post published"
        ),
        <TimelineDot color="primary">
          <HotelIcon />
        </TimelineDot>,
      ],
      [
        "Highest Rating",
        <>
          {upvote1?.path ? (
            <Link href={{ pathname: upvote1?.path }}>
              <a>{upvote1?.label}</a>
            </Link>
          ) : (
            "No post published"
          )}{" "}
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
          {upvote2?.path ? (
            <Link href={{ pathname: upvote2?.path }}>
              <a>{upvote2?.label}</a>
            </Link>
          ) : (
            "No post published"
          )}{" "}
          <br />
          <Rating name="pristine" value={1} />
        </>,
        <TimelineDot color="primary" variant="outlined">
          <TrendingDownIcon />
        </TimelineDot>,
      ],
      [
        "Most Downvotes",
        downvote1?.label ? (
          <Link href={{ pathname: downvote1?.path }}>
            <a>{downvote1?.label}</a>
          </Link>
        ) : (
          "No post published"
        ),
        <TimelineDot color="secondary">
          <QueueMusicIcon />
        </TimelineDot>,
      ],
      [
        "Least Downvotes",
        downvote2?.path ? (
          <Link href={{ pathname: downvote2?.path }}>
            <a>{downvote2?.label}</a>
          </Link>
        ) : (
          "No post published"
        ),
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
