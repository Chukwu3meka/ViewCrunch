import { styles } from "/";
import Reddit from "@material-ui/icons/Reddit";
import Twitter from "@material-ui/icons/Twitter";
import Facebook from "@material-ui/icons/Facebook";
import LinkedIn from "@material-ui/icons/LinkedIn";
import WhatsApp from "@material-ui/icons/WhatsApp";
import { toId } from "@utils/clientFunctions";

const SocialShare = ({
  share,
  space,
  viewHref = "/",
  title = "title",
  author = "viewChest",
  linkedinHandle = "viewchest",
  twitterHandle = "viewchest",
  facebookHandle = "thepedroview",
}) =>
  share || space ? (
    <div className={styles.socialShare}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=https://viewchest.com${space ? `/space/${toId(space)}` : viewHref}`}>
        <Facebook fontSize="inherit" />
      </a>
      <a
        href={`https://twitter.com/home?status=https://viewchest.com${
          space ? `/space/${toId(space)}` : `${viewHref} ${`${title} written by ${author}`}`
        }`}>
        <Twitter fontSize="inherit" />
      </a>
      <a href={`https://api.whatsapp.com/send?text=https://viewchest.com${space ? `/space/${toId(space)}` : viewHref} ${space}`}>
        <WhatsApp fontSize="inherit" />
      </a>
      <a href={`https://reddit.com/submit?url=https://viewchest.com${space ? `/space/${toId(space)}` : viewHref}&title=${space}`}>
        <Reddit fontSize="inherit" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=https://viewchest.com${
          space ? `/space/${toId(space)}` : viewHref
        }&title=${space}`}>
        <LinkedIn fontSize="inherit" />
      </a>
    </div>
  ) : (
    <div className={styles.socialShare}>
      <a href={`https://www.facebook.com/${facebookHandle}`}>
        <Facebook fontSize="inherit" />
      </a>
      <a href={`https://twitter.com/${twitterHandle}`}>
        <Twitter fontSize="inherit" />
      </a>
      <a href={`https://www.linkedin.com/${linkedinHandle}`}>
        <LinkedIn fontSize="inherit" />
      </a>
    </div>
  );

export default SocialShare;
