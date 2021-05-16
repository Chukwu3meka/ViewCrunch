import { styles } from "/";
import Image from "next/image";
import Fade from "react-reveal/Fade";
import { EmptyPage } from "@component/page";
import DeleteIcon from "@material-ui/icons/Delete";
import TransitionGroup from "react-transition-group/TransitionGroup";
import {
  Grid,
  Hidden,
  Button,
  List,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

const Favourites = ({ list, openView, removeView, listType, setSwitchView, switchView }) => (
  <Grid container className={styles.favourite}>
    <Grid item xs={12} sm={12} md={12} lg={8}>
      <div>
        <Button onClick={() => setSwitchView(!switchView)} variant="outlined" color="secondary">{`Switch to ${
          switchView ? "Blacklist" : "Favourite"
        }`}</Button>
        {list?.length ? (
          <List dense={false}>
            <TransitionGroup {...{ appear: false, enter: true, exit: true }}>
              {list.map(({ url, title }, index) => (
                <Fade key={url} collapse bottom>
                  <ListItem>
                    <ListItemIcon>
                      <Typography>{index + 1}</Typography>
                    </ListItemIcon>
                    <ListItemText primary={title} onClick={openView(url)} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={removeView({ url, title, listType })}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Fade>
              ))}
            </TransitionGroup>
          </List>
        ) : (
          <EmptyPage title={`${listType} is emptY`} />
        )}
      </div>
    </Grid>
    <Hidden mdDown>
      <Grid item lg={4}>
        <div>
          <Image src="/images/2.png" layout="fill" />
        </div>
      </Grid>
    </Hidden>
  </Grid>
);

export default Favourites;
