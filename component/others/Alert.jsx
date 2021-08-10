import { forwardRef } from "react";
import { Divider, Slide, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@material-ui/core";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = ({ title, handler, open, message, proceed = "okay" }) => (
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

export default Alert;
