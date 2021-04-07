import { styles } from "/";
import Image from "next/image";

const CoverPic = ({ imgSrcA, imgAltA, imgSrcB, imgAltB }) => (
  <div className={styles.coverPic}>
    <div>
      <Image src={imgSrcA} alt={imgAltA} layout="fill" />
    </div>
    <div>
      <Image src={imgSrcB} alt={imgAltB} layout="fill" />
    </div>
  </div>
);

export default CoverPic;
