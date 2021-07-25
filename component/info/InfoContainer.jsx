import { styles } from ".";
import Link from "next/link";
import { range } from "@utils/clientFunctions";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, CardActionArea, CardActions, CardContent, CardMedia, Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 960,
    margin: "auto",
  },
  media: {
    // maxWidth: 400,
    height: 200,
    margin: "auto",
    borderRadius: 5,
  },
});

const InfoContainer = ({ title, body, path }) => {
  const classes = useStyles(),
    actions = [
      { title: "FAQ", path: "/info/faq" },
      { title: "About", path: "/info/about" },
      { title: "Contact US", path: "/info/contactus" },
      { title: "Advertise", path: "/info/advertise" },
      { title: "Privacy Policy", path: "/info/privacy" },
      { title: "Terms and Conditions", path: "/info/terms" },
    ].filter((x) => x.path !== `/info/${path}`),
    action1 = actions[range(0, 2)],
    action2 = actions[range(3, 4)];

  return (
    <div
      style={{
        padding: "10px",
        width: "100%",
        textAlign: "justify",
      }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`/images/info/${path}.png`} title={`ViewCrunch~${title}`} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="article" className={styles.info}>
              {body}
              <p>
                ***
                <b>
                  WE VEHEMENTLY FORBID SCANNING OF THIS WEBSITE, OR ANY ACT OF EXPLOITATION (ALONE OR IN CONJUCTION WITH OTHERS) AND
                  LEGAL ACTIONS WILL BE TAKEN AT HIGH COST AGAINST ANY ENTITY, INDIVIDUAL OR ORGANISATION THAT ATTEMT TO EXPLOIT ANY
                  VULNERABILITY KNOWN OR UNKNOWN, FOREIGN OR DOMESTIC
                </b>
                ***
                <span>
                  best wishes,
                  <br /> ViewCrunch.
                </span>
              </p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link href={action1.path}>
            <a>
              <Button size="small" color="primary">
                {action1.title}
              </Button>
            </a>
          </Link>

          <Link href={action2.path}>
            <a>
              <Button size="small" color="primary">
                {action2.title}
              </Button>
            </a>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default InfoContainer;
