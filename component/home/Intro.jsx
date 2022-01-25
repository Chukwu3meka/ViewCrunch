import Image from "next/image";
import Typography from "@material-ui/core/Typography";

import { introStyles } from ".";

const Intro = () => (
  <div className={introStyles.intro}>
    <div>
      <Typography variant="h3" component="h2">
        There's a lot to learn on the Internet
      </Typography>
      <Typography variant="h5" component="h3">
        Without direction, we easily loose focus
      </Typography>
      <div>
        <Image src="/images/ViewCrunch.webp" layout="fill" alt="ViewCrunch Intro" />
      </div>
    </div>
  </div>
);

export default Intro;
