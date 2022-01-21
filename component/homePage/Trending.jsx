import { Button, Typography } from "@material-ui/core";
import Image from "next/image";
import { useEffect } from "react";
import { Paper } from "@material-ui/core";

import { trendingStyles } from ".";
import TimelineIcon from "@material-ui/icons/Timeline";

const Trending = ({
  trending = [
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 0,
    },
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 1,
    },
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 2,
    },
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 3,
    },
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 4,
    },
    {
      title: "Product redundant",
      date: "A week ago",
      author: "Ariel",
      crunch: "developers",
      image: "/images/ViewCrunch-cover.webp",
      id: 5,
    },
  ],
}) => {
  return (
    <div className={trendingStyles.trending}>
      <p>
        <TimelineIcon fontSize="small" />
        <Typography variant="h5" component="h2">
          Trending on ViewCrunch
        </Typography>
      </p>
      <div>
        {trending.map(({ image, author, crunch, title, id, date }) => (
          <Paper elevation={1}>
            <div>
              <Image src={image} height={20} width={20} alt={title} />
              {`${author} in ${crunch}`}
            </div>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2">{`Published ${date}`}</Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default Trending;
