import Link from "next/link";
import Image from "next/image";

import Typography from "@mui/material/Typography";

import { layoutStyles } from "/";
import AuthContainer from "@component/auth";

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
      <Image src="/images/ViewCrunch.webp" layout="fill" alt="ViewCrunch footer icon" />
    </div>

    <AuthContainer />

    <Typography variant="body1" color="textSecondary">
      ● © 2020 ~ {new Date().getFullYear()} ViewCrunch ●
    </Typography>
  </div>
);

export default Footer;
