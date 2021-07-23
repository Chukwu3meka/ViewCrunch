import { styles } from "/";
import Link from "next/link";
import { AuthFirebase } from "@component/page";
import Typography from "@material-ui/core/Typography";

const Footer = ({ scrollTop }) => (
  <div className={styles.footer}>
    <AuthFirebase />
    <div>
      <span>
        <Link href="/info/terms">
          <a>Terms</a>
        </Link>
        ~
        <Link href="/info/faq">
          <a>FAQ</a>
        </Link>
        ~
        <Link href="/info/advertise">
          <a>Advertise</a>
        </Link>
      </span>

      <img src="/images/ViewCrunch.webp" alt="ViewCrunch footer icon" onClick={scrollTop} />

      <span>
        <Link href="/info/contact">
          <a>Contact</a>
        </Link>
        ~
        <Link href="/info/about">
          <a>About</a>
        </Link>
        ~
        <Link href="/info/privacy">
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
