import { useState } from "react";
import Grid from "@mui/material/Grid";

import { Notification, NotificationDialog, styles } from ".";
import { Typography } from "@mui/material";
import { fetcher } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const NotificationContainer = (props) => {
  const {
      notification: { messages: propsMessages, unread: propsUnread },
    } = props,
    [unread, setUnread] = useState(propsUnread),
    [openMessage, setOpenMessage] = useState(-1),
    [messages, setMessages] = useState(propsMessages);

  const deleteMessageHandler = (index) => () => {
    console.log("delete", index);
  };

  const openMessageHandler = (index) => () => {
    if (index >= 0) {
      const { message, seen } = messages[index];

      if (!messages[index].seen) {
        let items = [...messages];
        let item = { ...messages[index] };
        item.seen = true;
        items[index] = item;
        setMessages(items);
        setUnread(unread - 1);
        setOpenMessage(index);
      }

      // setMessages(...messages);

      console.log(message);
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

export default NotificationContainer;
