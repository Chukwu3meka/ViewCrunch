import { styles } from "/";
import Image from "next/image";

const EmptyPage = ({ title }) => (
  <div className={styles.emptypage}>
    <div>
      <Image src="/images/empty-page.webp" alt={title || "Error occured"} layout="fill" />
    </div>
    <span>{title || "Nothing found"}</span>
  </div>
);

export default EmptyPage;
