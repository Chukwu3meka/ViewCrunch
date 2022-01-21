import { Button, Typography } from "@material-ui/core";
import Image from "next/image";

import { introStyles } from ".";

const Intro = () => {
  return (
    <div className={introStyles.intro}>
      <div>
        <Typography variant="h3" component="h2">
          There's a lot to learn on the Internet
        </Typography>
        <Typography variant="h5" component="h3">
          Without direction, we easily loose focus
        </Typography>
        <Button variant="contained" color="primary">
          Share your Views
        </Button>
        <div>
          <Image src="/images/ViewCrunch.webp" layout="fill" alt="ViewCrunch Intro" />
        </div>
      </div>
    </div>
  );
};

export default Intro;
