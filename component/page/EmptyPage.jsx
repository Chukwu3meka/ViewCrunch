import { styles } from "/";
import Image from "next/image";
import Typography from "@material-ui/core/Typography";

const EmptyPage = ({ title }) => (
  <div className={styles.emptypage}>
    <div>
      <Image src="/images/empty-page.webp" alt={title || "Error occured"} layout="fill" />
    </div>
    <Typography variant="body2">{title || "Nothing found"}</Typography>
  </div>
);

export default EmptyPage;
