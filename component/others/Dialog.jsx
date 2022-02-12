import { forwardRef, useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormAlert = ({
  dialogTitle,
  dialogBody,
  dialogHandler,
  setDisplayDialog,
  compareText,
  displayDialog,
  placeholder,
  proceed = "okay",
  closeable = true,
}) => {
  const [dialogText, setDialogText] = useState("");

  const handleFormAlertConfirm = () => {
    setDialogText("");
    setDisplayDialog(false);
    if (dialogHandler) dialogHandler(dialogText);
  };

  const closeDialogHandler = () => {
    setDialogText("");
    setDisplayDialog(false);
  };

  return (
    <Dialog
      open={displayDialog}
      onClose={closeDialogHandler}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby="viewcrunch-dialog">
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogBody}</DialogContentText>
        {compareText && (
          <TextField
            autoFocus
            margin="dense"
            id="dialog-formText"
            placeholder={placeholder || "start typing..."}
            value={dialogText}
            multiline
            maxRows={3}
            fullWidth
            onChange={(e) => setDialogText(e.target.value)}
            autoComplete="off"
          />
        )}
        <DialogActions>
          {closeable && (
            <Button variant="outlined" onClick={closeDialogHandler}>
              cancel
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            disabled={(compareText === "feedback" || !compareText) && dialogText.length >= 3 ? false : dialogText !== compareText}
            onClick={handleFormAlertConfirm}>
            {proceed}
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default FormAlert;
