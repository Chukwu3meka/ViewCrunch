import { forwardRef } from "react";

import Typography from "@mui/material/Typography";
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

const NotificationDialog = ({ openMessage: { message, date, href }, closeMessageHandler }) =>
  message ? (
    <Dialog open={!!message} TransitionComponent={Transition} keepMounted onClose={closeMessageHandler} aria-describedby="notification">
      <DialogTitle>
        <Typography textTransform="capitalize">{date}</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText color="HighlightText" id="notification">
          {message}{" "}
        </DialogContentText>
      </DialogContent>
      {href ? (
        <DialogActions>
          <Link href={href}>
            <Button>Visit Page</Button>
          </Link>
        </DialogActions>
      ) : null}
    </Dialog>
  ) : null;

export default NotificationDialog;

// notification schema: {message, date, icon, seen}
