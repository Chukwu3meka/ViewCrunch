import Image from "next/image";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { styles } from "@component/notification";

import Link from "next/link";

import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import { LineText } from "@component/others";
import { EmptyPage } from "@component/page";
import { Accordion, AccordionSummary, AccordionDetails } from "/";

const Notification = ({ notification, deleteNotification, expanded, handleChange }) => (
  <div className={styles.notification}>
    <div>
      {notification.length ? (
        notification?.map(({ title, body, link }, index) => (
          <Accordion key={index} square expanded={expanded === body} onChange={handleChange(body)}>
            <AccordionSummary aria-controls="content" id="header">
              <Typography>
                <Typography component="i" color="textSecondary">{`${index + 1}. `}</Typography>
                {title}
              </Typography>
              <IconButton edge="end" aria-label="delete" onClick={deleteNotification({ title, body, link })}>
                <DeleteIcon />
              </IconButton>
            </AccordionSummary>
            <AccordionDetails>
              <Link href={link}>{body}</Link>
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <EmptyPage title="You don't have any notificatioN" />
      )}
    </div>

    <img src="/images/clips/top wave.svg" />
    <img src="/images/clips/shapes (1).svg" />
    <img src="/images/clips/shapes (2).svg" />
    <img src="/images/clips/shapes (3).svg" />
    <img src="/images/clips/bottom wave.svg" />
  </div>
);

export default Notification;
