import { styles } from "/";
import Image from "next/image";
import Link from "next/link";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

// const StyledBadge = withStyles((theme) => ({
//   badge: {
//     backgroundColor: "rgb(255, 215, 0)",
//     color: "rgb(255, 215, 0)",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "$ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }))(Badge);

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//     overflow: "hidden",
//     borderRadius: "50%",
//   },
//   small: {
//     width: theme.spacing(3),
//     height: theme.spacing(3),
//   },
//   large: {
//     width: theme.spacing(20),
//     height: theme.spacing(20),
//   },
//   rounded: {
//     color: "#fff",
//     backgroundColor: theme.palette.primary.main,
//   },
// }));

const Index = ({ src, alt, size = "normal", pathname, onClick }) => {
  return pathname ? (
    <Link href={{ pathname }}>
      <a className={styles[`${size}Avatar`]}>
        <Image src={src} alt={alt} layout="fill" />
      </a>
    </Link>
  ) : (
    <div className={styles[`${size}Avatar`]}>
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
};

export default Index;

// const Index = ({ src, alt, family = "default", size = "normal", handleChange, children, pathname }) => {
//   const classes = useStyles(),
//     tags = { alt, src, className: classes[size] };

//   switch (family) {
//     case "default": {
//       const res = (
//         <div className={classes.root}>
//           <Avatar {...tags} />
//         </div>
//       );
//       return pathname ? (
//         <Link href={{ pathname }}>
//           <a>{res}</a>
//         </Link>
//       ) : (
//         res
//       );
//     }
//     case "blink": {
//       const res = (
//         <div className={classes.root}>
//           <StyledBadge
//             overlap="circle"
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             variant="dot">
//             <Avatar {...tags} />
//           </StyledBadge>
//         </div>
//       );
//       return pathname ? (
//         <Link href={{ pathname }}>
//           <a>{res}</a>
//         </Link>
//       ) : (
//         res
//       );
//     }
//     case "icon": {
//       return (
//         <div className={classes.root}>
//           <Avatar {...tags} className={classes.rounded}>
//             {children}
//           </Avatar>
//         </div>
//       );
//     }
//     case "blinkUpload": {
//       return (
//         <div className={classes.root}>
//           <StyledBadge
//             overlap="circle"
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             variant="dot">
//             <Avatar {...tags} className={classes.large} />
//             <input
//               type="file"
//               onChange={handleChange}
//               accept=".jpg, .jpeg, .png"
//               style={{
//                 borderRadius: "50%",
//                 position: "absolute",
//                 top: "-35px",
//                 left: 0,
//                 height: "calc(100% + 36px)",
//                 width: "calc(100% + 5px)",
//                 outline: "none",
//               }}
//             />
//           </StyledBadge>
//         </div>
//       );
//     }

//     default:
//       return "AVATAR";
//   }
// };

// export default Index;
