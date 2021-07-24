import { styles } from "/";
import Link from "next/link";
import { AuthFirebase } from "@component/page";
import Typography from "@material-ui/core/Typography";

const Footer = ({ scrollTop }) => (
  <div className={styles.footer}>
    {/* <a href="https://facebook.com/viewcrunch">Kindly Follow us on our facebook @ViewCrunch</a> */}
    <div>
      <div id="fb-root"></div>
      <div
        className="fb-like"
        datahref="https://facebook.com/viewcrunch"
        datawidth=""
        datalayout="button_count"
        dataaction="like"
        datasize="large"
        datashare="true"
      />
      <div class="fb-share-button" data-href="https://www.viewcrunch.com" data-layout="button_count" data-size="large">
        <a
          target="_blank"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.viewcrunch.com%2F&amp;src=sdkpreparse"
          class="fb-xfbml-parse-ignore">
          Share
        </a>
      </div>
    </div>

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
