import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Notification, NotificationDialog, styles } from ".";
import { Typography } from "@mui/material";
import { fetcher } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const NotificationContainer = (props) => {
  const {
      notification: { messages: propsMessages, unread: propsUnread },
    } = props,
    [myID, setMyID] = useState(null),
    { enqueueSnackbar } = useSnackbar(),
    [unread, setUnread] = useState(propsUnread),
    [openMessage, setOpenMessage] = useState(-1),
    [messages, setMessages] = useState(propsMessages);

  useEffect(() => {
    setMyID(props.myID);
  }, [props.myID]);

  const deleteMessageHandler = (index) => () => {
    // enqueueSnackbar("Something went wrong, ", { variant: "error" });
    console.log("delete", index);
  };

  const openMessageHandler = (index) => async () => {
    if (index >= 0) {
      const { message, seen } = messages[index];

      if (!seen) {
        let items = [...messages];
        let item = { ...messages[index] };
        item.seen = true;
        items[index] = item;
        setMessages(items);
        setUnread(unread - 1);

        if (myID) await fetcher("/api/profile/notificationOpened", JSON.stringify({ myID, message: messages[index] }));
      }

      setOpenMessage(index);
    }
  };

  const closeMessageHandler = () => {
    setOpenMessage(-1);
  };

  return (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer>
        <div className={styles.nav}>
          <Typography variant="h4">Notifications</Typography>
          <hr />
          <Typography fontSize={15}>Here you get a report on all activities relating to your account.</Typography>
          {unread ? (
            <Typography fontSize={10} color="aqua">
              You have {unread} unread {unread > 1 ? "messages" : "messages"}
            </Typography>
          ) : null}{" "}
        </div>
      </NavContainer>
      <Grid item xs={12} sm={12} md={8}>
        <Notification
          messages={messages}
          openMessage={openMessage}
          openMessageHandler={openMessageHandler}
          deleteMessageHandler={deleteMessageHandler}
        />
        <Footer />
        <NotificationDialog
          messages={messages}
          openMessage={openMessage}
          openMessageHandler={openMessageHandler}
          closeMessageHandler={closeMessageHandler}
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({ myID: state.profile?.myID }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
