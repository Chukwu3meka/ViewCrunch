import Link from "next/link";
import Typography from "@material-ui/core/Typography";

import { styles } from "/";
import { AuthFirebase } from "@component/page";

const Footer = () => (
  <div className={styles.footer}>
    <div>
      <div />
    </div>
    <div>
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

        <img src="/images/viewChest.webp" alt="viewChest footer icon" />

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
        ● © 2018 ~ {new Date().getFullYear()} viewChest ●
      </Typography>
    </div>
  </div>
);

export default Footer;
