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
    "& > *": {
      margin: theme.spacing(1),
    },
    overflow: "hidden",
    borderRadius: "50%",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  rounded: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
  },
}));

const ImageUpload = ({ src, alt, size = "normal", handleChange }) => {
  const classes = useStyles(),
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
        <Avatar {...tags} className={classes.large} />
        <input
          type="file"
          // onChange={handleChange}
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
      </StyledBadge>
    </div>
  );
};

export default ImageUpload;
