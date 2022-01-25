import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LoveIcon from "@material-ui/icons/FavoriteBorderTwoTone";

import { viewsStyles } from ".";
import { Loading } from "@component/others";

const Views = ({ views, loading, fetchFailed, getViews }) => (
  <div className={viewsStyles.views}>
    <Typography variant="h2">Recent Views from Great Authors</Typography>
    <div>
      {views?.map(
        ({ displayName, profilePicture, profileLink, crunchLink, crunch, title, image, content, date, readTime, keyword, viewLink }) => (
          <Fade bottom key={viewLink}>
            <Paper className={viewsStyles.view}>
              <div>
                <div>
                  <div>
                    <Image src={profilePicture} layout="fill" alt={displayName} />
                  </div>
                  <Typography variant="body1">
                    <Link href={profileLink}>
                      <a>{displayName}</a>
                    </Link>
                    &nbsp;in&nbsp;
                    <Link href={crunchLink}>
                      <a>{crunch}</a>
                    </Link>
                  </Typography>
                </div>
                <Link href={viewLink}>
                  <a>
                    <Typography variant="h5" component="h3">
                      {title}
                    </Typography>
                  </a>
                </Link>
                <Typography variant="body2">{content.replace(/<[^>]+>/g, "")}</Typography>
                <div>
                  <Typography variant="body2">{`${date} · ${readTime} ☆ ${keyword}`}</Typography>
                  <LoveIcon fontSize="small" />
                </div>
              </div>
              <Image src={image} width={140} height={130} alt={title} />
            </Paper>
          </Fade>
        )
      )}
    </div>

    {loading && <Loading status={loading} />}
    {fetchFailed && (
      <Loading
        loadType="failed"
        failedText="We are unable to fetch any view for you; Kindly click the button below."
        clickHandler={() => getViews("retry")}
      />
    )}
  </div>
);

export default Views;
