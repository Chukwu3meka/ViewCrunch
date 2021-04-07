import Image from "next/image";
import { useEffect } from "react";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { styles } from "/";
import { EmptyPage } from "@component/page";
import { SocialShare } from "@component/others";
import { shortNumber } from "@utils/clientFunctions";

const ActiveChat = ({ person, blocked, following, chatScrollRef, setMobile }) => {
  if (!person?.displayName) {
    return (
      <span>
        <EmptyPage title="Start chating noW" />
      </span>
    );
  }

  const {
    displayName,
    coverPicture,
    handle,
    published,
    about,
    profilePicture,
    social: { facebookHandle, linkedinHandle, twitterHandle },
    stat: { profileCreated, audience, voteReceived, voteSent },
  } = person;

  const isBlocked = blocked.map(({ handle }) => handle).includes(handle);
  const isfollowed = following.map(({ handle }) => handle).includes(handle);

  useEffect(() => chatScrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" }));

  useEffect(() => {
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", remapBackButton);
    return () => window.removeEventListener("popstate", remapBackButton);
  });

  const remapBackButton = () => {
    history.pushState(null, null, document.URL);
    setMobile(false);
  };

  return (
    <div className={styles.chatContent} ref={chatScrollRef}>
      <div>
        <Image src={coverPicture} layout="fill" />
      </div>
      <div>
        <Image src={profilePicture} layout="fill" />
      </div>
      <SocialShare {...{ linkedinHandle, twitterHandle, facebookHandle }} />

      <div>
        <Typography variant="h4">{displayName}</Typography>
        <Typography variant="body1" align="center">
          {about}
        </Typography>
        <Typography variant="caption" color="textSecondary">{`Joined viewChest ${profileCreated}.`}</Typography>
        <div>
          <span>
            Avg Audience <br />
            {shortNumber(audience)}
          </span>
          <span>
            Published <br />
            {shortNumber(published)}
          </span>
          <span>
            Votes Received <br />
            {shortNumber(voteReceived)}
          </span>
          <span>
            Votes Sent <br />
            {shortNumber(voteSent)}
          </span>
        </div>
        <ButtonGroup color="secondary" aria-label="friendship action">
          <Button>{isfollowed ? "unfollow" : "follow"}</Button>
          <Button>{isBlocked ? "unblock" : "block"}</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ActiveChat;
