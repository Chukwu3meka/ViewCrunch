import { styles } from "/";
import Link from "next/link";
import Image from "next/image";

const Avatar = ({ src, alt, size = "normal", pathname }) => {
  return pathname ? (
    <Link href={pathname}>
      <a className={styles[`${size}Avatar`]}>
        <Image src={src} alt={alt} layout="fill" />
      </a>
    </Link>
  ) : (
    <div className={styles[`${size}Avatar`]}>
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
};

export default Avatar;
