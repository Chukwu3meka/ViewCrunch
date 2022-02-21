import Link from "next/link";
import Image from "next/image";
import Fade from "react-reveal/Fade";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { viewsStyles, ViewsFooter } from ".";
import { Loading } from "@component/others";

const Views = ({ views, loading, fetchFailed, getViews, mobile, bookmarkHandler, bookmarks }) => (
  <div className={viewsStyles.views}>
    <Typography variant="h2">Recently Published</Typography>
    <div>
      {views?.map(
        ({
          displayName,
          profilePicture,
          profileLink,
          crunchLink,
          crunch,
          image,
          content,
          date,
          readTime,
          keyword,
          viewLink,
          title,
          author,
          viewID,
        }) => (
          <Fade bottom key={viewLink}>
            <Paper className={viewsStyles.view}>
              <div>
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
                      <Typography variant="h5" component="h2">
                        {title}
                      </Typography>
                    </a>
                  </Link>
                  <Typography variant="body2">{content.replace(/<[^>]+>/g, "")}</Typography>

                  {!mobile ? (
                    <ViewsFooter {...{ mobile: false, date, readTime, keyword, title, author, viewID, bookmarks, bookmarkHandler }} />
                  ) : null}
                </div>
                <div>
                  <Image src={image} layout="fill" alt={title} />
                </div>
              </div>
              {mobile ? (
                <ViewsFooter {...{ mobile: true, date, readTime, keyword, title, author, viewID, bookmarks, bookmarkHandler }} />
              ) : null}
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
