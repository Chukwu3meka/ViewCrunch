import { styles } from "/";
import Reddit from "@mui/icons-material/Reddit";
import Twitter from "@mui/icons-material/Twitter";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import WhatsApp from "@mui/icons-material/WhatsApp";
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
      <a
        target="_blank"
        href={`https://www.facebook.com/sharer/sharer.php?u=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref}`}>
        <Facebook fontSize="inherit" />
      </a>
      <a
        target="_blank"
        href={`https://twitter.com/home?status=https://ViewCrunch.com${
          crunch ? `/crunch/${toId(crunch)}` : `${viewHref} ${`${title} written by ${author}`}`
        }`}>
        <Twitter fontSize="inherit" />
      </a>
      <a
        target="_blank"
        href={`https://api.whatsapp.com/send?text=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref} ${
          crunch || title
        }`}>
        <WhatsApp fontSize="inherit" />
      </a>
      <a
        target="_blank"
        href={`https://reddit.com/submit?url=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref}&title=${
          crunch || title
        }`}>
        <Reddit fontSize="inherit" />
      </a>
      <a
        target="_blank"
        href={`https://www.linkedin.com/shareArticle?url=https://ViewCrunch.com${crunch ? `/crunch/${toId(crunch)}` : viewHref}&title=${
          crunch || title
        }`}>
        <LinkedIn fontSize="inherit" />
      </a>
    </div>
  ) : (
    <div className={styles.socialShare}>
      <a target="_blank" href={`https://www.facebook.com/${facebookHandle}`}>
        <Facebook fontSize="inherit" />
      </a>
      <a target="_blank" href={`https://twitter.com/${twitterHandle}`}>
        <Twitter fontSize="inherit" />
      </a>
      <a target="_blank" href={`https://www.linkedin.com/in/${linkedinHandle}`}>
        <LinkedIn fontSize="inherit" />
      </a>
    </div>
  );

export default SocialShare;
