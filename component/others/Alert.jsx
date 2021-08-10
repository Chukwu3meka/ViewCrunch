import { useState, forwardRef } from "react";

import Slide from "@material-ui/core/Slide";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ViewAlert = ({ title, handler, open, message, proceed = "okay" }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        {message?.map((messageIndex, index, messageArray) => (
          <div key={index}>
            <DialogContentText id="alert-dialog-slide-description">{messageIndex}</DialogContentText>
            {messageArray?.length !== index + 1 && <Divider variant="middle" />}
          </div>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handler} color="primary">
          {proceed}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewAlert;

//   const ViewAlert = ({
//   alertType,
//   details: { text, handler, severity = "success", confirmation = "Okay", label = "Notification" },
//   style,
// }) => {
//   const [open, setOpen] = useState(true),
//     handleClose = () => {
//       setOpen(false);
//       if (handler) handler();
//     };

//   switch (alertType) {
//     case "notification": {
//       return (
//         <Dialog
//           open={open}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleClose}
//           aria-labelledby="alert-dialog-slide-title"
//           aria-describedby="alert-dialog-slide-description">
//           <DialogTitle id="alert-dialog-slide-title">{label}</DialogTitle>
//           <DialogContent>
//             {text?.map((textIndex, index, textArray) => (
//               <div key={index}>
//                 <DialogContentText id="alert-dialog-slide-description">{textIndex}</DialogContentText>
//                 {textArray?.length !== index + 1 && <Divider variant="middle" />}
//               </div>
//             ))}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} color="primary">
//               {confirmation}
//             </Button>
//           </DialogActions>
//         </Dialog>
//       );
//     }
//     case "below": {
//       return (
//         <Collapse in={open}>
//           <Alert
//             style={style}
//             severity={severity}
//             action={
//               <IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
//                 <CloseIcon fontSize="inherit" />
//               </IconButton>
//             }>
//             {text}
//           </Alert>
//         </Collapse>
//       );
//     }
//     default:
//       return "error occured";
//   }
// };

// export default ViewAlert;
