import { Notification } from "/";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";
import { setProfileAction } from "@store/actions";

const NotificationContainer = (props) => {
  const { enqueueSnackbar } = useSnackbar(),
    { profile, setProfileAction } = props,
    [expanded, setExpanded] = useState(false),
    [online, setOnline] = useState(props.online),
    [notification, setNotification] = useState(props.notification);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const deleteNotification = ({ title, body, link }) => async () => {
    if (profile.myHandle && online) {
      const { status } = await fetcher(
        "/api/profile/deleteNotification",
        JSON.stringify({ myHandle: profile.myHandle, title, body, link })
      );
      if (status === "success") {
        setExpanded(false);
        setNotification(notification.filter((x) => x.title !== title));
        enqueueSnackbar(`Notification deleted`, { variant: "success" });
        setProfileAction({ ...profile, myNotification: notification.length - 1 });
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
  mapDispatchToProps = { setProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
