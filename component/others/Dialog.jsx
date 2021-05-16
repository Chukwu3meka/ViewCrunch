import { useState } from "react";
import { Button, Dialog, TextField, DialogTitle, DialogContent, DialogActions, DialogContentText } from "@material-ui/core";

const FormAlert = ({
  dialogTitle,
  dialogBody,
  dialogHandler,
  setDisplayDialog,
  compareText,
  displayDialog,
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
    <Dialog open={displayDialog} onClose={closeDialogHandler}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{dialogBody}</DialogContentText>
        {compareText && (
          <TextField
            autoFocus
            margin="dense"
            id="dialog-formText"
            value={dialogText}
            multiline
            rowsMax={3}
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
