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
import { shortNumber } from "@utils/clientFunctions";

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

const TimelineContainer = ({
  viewerHistory: { firstArticle, lastArticle, highestRating, worstRating, mostView, leastView },
  profileCreated,
}) => {
  const classes = useStyles(),
    viewerHistoryFunc = () => {
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
          <Link href={{ pathname: firstArticle?.link || "/profile" }}>
            <a>{`${firstArticle?.label} ~ ${firstArticle?.title}`}</a>
          </Link>,
          <TimelineDot color="secondary">
            <LaptopMacIcon />
          </TimelineDot>,
        ],
        [
          "Last Article",
          <Link href={{ pathname: lastArticle?.link || "/profile" }}>
            <a>{`${lastArticle?.label} ~ ${lastArticle?.title}`}</a>
          </Link>,
          <TimelineDot color="primary">
            <HotelIcon />
          </TimelineDot>,
        ],
        [
          "Highest Rating",
          <>
            <Link href={{ pathname: highestRating?.link || "/profile" }}>
              <a>{highestRating?.title}</a>
            </Link>
            <br />
            <Rating name="pristine" value={5} />
          </>,
          <TimelineDot color="secondary" variant="outlined">
            <StarsIcon />
          </TimelineDot>,
        ],
        [
          "Worst Rating",
          <>
            <Link href={{ pathname: worstRating?.link || "/profile" }}>
              <a>{worstRating?.title}</a>
            </Link>
            <br />
            <Rating name="pristine" value={1} />
          </>,
          <TimelineDot color="primary" variant="outlined">
            <TrendingDownIcon />
          </TimelineDot>,
        ],
        [
          "Most View",
          <Link href={{ pathname: mostView?.link || "/profile" }}>
            <a>{`${mostView?.title} @ ${shortNumber(mostView?.label)}`}</a>
          </Link>,
          <TimelineDot color="secondary">
            <QueueMusicIcon />
          </TimelineDot>,
        ],
        [
          "Least View",
          <Link href={{ pathname: leastView?.link || "/profile" }}>
            <a>{`${leastView?.title} @ ${shortNumber(leastView?.label)}`}</a>
          </Link>,
          <TimelineDot>
            <MusicOffIcon />
          </TimelineDot>,
        ],
        [
          "viewChest",
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
