import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { range } from "@utils/clientFunctions";

const useStyles = makeStyles({
  root: {
    maxWidth: 960,
    margin: "auto",
  },
  media: {
    maxWidth: 460,
    height: 180,
    margin: "auto",
  },
});

const InfoContainer = ({ title, body, path }) => {
  const classes = useStyles(),
    actions = [
      { title: "FAQ", path: "/info/faq" },
      { title: "About", path: "/info/about" },
      { title: "Contact", path: "/info/contact" },
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
            <Typography variant="body2" color="textSecondary" component="p">
              {body}
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
