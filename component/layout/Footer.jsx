import { styles } from "/";
import Link from "next/link";
import { AuthFirebase } from "@component/page";
import Typography from "@material-ui/core/Typography";

const Footer = ({ scrollTop }) => (
  <div className={styles.footer}>
    <AuthFirebase />
    <div>
      <span>
        <Link href="/control/terms">
          <a>Terms</a>
        </Link>
        ~
        <Link href="/control/faq">
          <a>FAQ</a>
        </Link>
        ~
        <Link href="/control/advertise">
          <a>Advertise</a>
        </Link>
      </span>

      <img src="/images/ViewCrunch.webp" alt="ViewCrunch footer icon" onClick={scrollTop} />

      <span>
        <Link href="/control/contact">
          <a>Contact</a>
        </Link>
        ~
        <Link href="/control/about">
          <a>About</a>
        </Link>
        ~
        <Link href="/control/privacy">
          <a>Privacy</a>
        </Link>
      </span>
    </div>
    <Typography variant="body2" color="textSecondary">
      ● © 2018 ~ {new Date().getFullYear()} ViewCrunch ●
    </Typography>
  </div>
);

export default Footer;
