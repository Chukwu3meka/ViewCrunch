import { forwardRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Link from "next/link";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NotificationDialog = ({ messages, openMessage, closeMessageHandler }) => (
  <Dialog
    open={openMessage >= 0}
    TransitionComponent={Transition}
    keepMounted
    onClose={closeMessageHandler}
    aria-describedby="notification">
    <DialogTitle>ViewCrunch Notification</DialogTitle>
    <DialogContent>
      <DialogContentText color="HighlightText" id="notification">
        {messages[openMessage]?.message}
      </DialogContentText>
    </DialogContent>
    {messages[openMessage]?.href ? (
      <DialogActions>
        <Link href={messages[openMessage]?.href}>
          <Button>Visit Page</Button>
        </Link>
      </DialogActions>
    ) : null}{" "}
  </Dialog>
);

export default NotificationDialog;

// notification schema: {message, date, icon, seen}
