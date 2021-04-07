import { Notification } from "/";
import { fetcher } from "@utils/clientFunctions";

import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

const NotificationContainer = (props) => {
  const {
      notification: propsNotification,
      profile: { handle, token },
    } = props,
    { enqueueSnackbar } = useSnackbar(),
    [expanded, setExpanded] = useState(false),
    [online, setOnline] = useState(props.online),
    [notification, setNotification] = useState(propsNotification || []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const deleteNotification = (body) => async () => {
    if (token && !online) {
      const { status } = await fetcher("/api/notification/deleteNotification", JSON.stringify({ body, token }));
      if (status === "success") {
        setExpanded(false);
        setNotification(notification.filter((x) => x.body !== body));
        enqueueSnackbar(`Notification deleted`, { variant: "success" });
      } else {
        enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
    }
  };

  return (
    <Notification
      {...{
        expanded,
        handleChange,
        notification,
        deleteNotification,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    profile: state?.profile,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
