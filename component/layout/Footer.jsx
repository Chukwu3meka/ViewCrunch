import Link from "next/link";
import Image from "next/image";

import Typography from "@mui/material/Typography";

import { layoutStyles } from "/";
import { AuthFirebase } from "@component/page";

const Footer = () => (
  <div className={layoutStyles.footer}>
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

      <span>
        <Link href="/info/contactus">
          <a>Contact Us</a>
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

    <div>
      <div>
        <div
          className="fb-like"
          data-href="https://www.facebook.com/viewcrunch/"
          data-width=""
          data-layout="button_count"
          data-action="like"
          data-size="large"
          data-share="false"
        />
        <div className="fb-share-button" data-href="https://www.viewcrunch.com" data-layout="button_count" data-size="large">
          <a
            target="_blank"
            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.viewcrunch.com%2F&amp;src=sdkpreparse"
            className="fb-xfbml-parse-ignore">
            Share
          </a>
        </div>
      </div>

      <div>
        <Image src="/images/ViewCrunch.webp" layout="fill" alt="ViewCrunch footer icon" />
      </div>
      <AuthFirebase />
    </div>

    <Typography variant="body1" color="textSecondary">
      ● © 2020 ~ {new Date().getFullYear()} ViewCrunch ●
    </Typography>
  </div>
);

export default Footer;
