import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "rgb(255, 215, 0)",
    color: "rgb(255, 215, 0)",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    borderRadius: "50%",
  },
  n: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  l: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  xl: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const BlinkingAvatar = ({ src = "/images/no-image.webp", alt = "ViewCrunch", handleChange, size = "n", upload = false }) => {
  const classes = useStyles(size),
    tags = { alt, src, className: classes[size] };

  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        variant="dot">
        <Avatar {...tags} />
        {upload ? (
          <input
            type="file"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
            style={{
              borderRadius: "50%",
              position: "absolute",
              top: "-35px",
              left: 0,
              height: "calc(100% + 36px)",
              width: "calc(100% + 5px)",
              outline: "none",
            }}
          />
        ) : null}
      </StyledBadge>
    </div>
  );
};

export default BlinkingAvatar;
