import Fade from "react-reveal/Fade";
import { Loading } from "@component/others";
import { Paper, Typography } from "@material-ui/core";
import Link from "next/link";
import Image from "next/image";
import { viewsStyles } from ".";

import BookmarkAddIcon from "@material-ui/icons/FavoriteBorderTwoTone";

const Views = ({ views, loading, fetchFailed, scrollRef, getViews }) => (
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
                  <BookmarkAddIcon fontSize="small" />
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
        // scrollRef={scrollRef}
        loadType="failed"
        failedText="We are unable to fetch any view for you; Please, refresh the page or click the button below."
        clickHandler={getViews}
      />
    )}
  </div>
);

export default Views;
