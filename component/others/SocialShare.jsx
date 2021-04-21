import { styles } from "/";
import Reddit from "@material-ui/icons/Reddit";
import Twitter from "@material-ui/icons/Twitter";
import Facebook from "@material-ui/icons/Facebook";
import LinkedIn from "@material-ui/icons/LinkedIn";
import WhatsApp from "@material-ui/icons/WhatsApp";
import { toId } from "@utils/clientFunctions";

const SocialShare = ({
  share,
  crunch,
  viewHref = "/",
  title = "title",
  author = "ViewCrunch",
  linkedinHandle = "ViewCrunch",
  twitterHandle = "ViewCrunch",
  facebookHandle = "thepedroview",
}) =>
  share || crunch ? (
    <div className={styles.socialShare}>
      <a href={`https://www.facebook.com/sharer/sharer.php?u=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref}`}>
        <Facebook fontSize="inherit" />
      </a>
      <a
        href={`https://twitter.com/home?status=https://ViewCrunch.com${
          crunch ? `/crunch/${toId(crunch)}` : `${viewHref} ${`${title} written by ${author}`}`
        }`}>
        <Twitter fontSize="inherit" />
      </a>
      <a href={`https://api.whatsapp.com/send?text=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref} ${crunch}`}>
        <WhatsApp fontSize="inherit" />
      </a>
      <a href={`https://reddit.com/submit?url=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref}&title=${crunch}`}>
        <Reddit fontSize="inherit" />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?url=https://ViewCrunch.com${
          crunch ? `/crunch/${toId(crunch)}` : viewHref
        }&title=${crunch}`}>
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
