import Fade from "react-reveal/Fade";
import { EmptyPage } from "@component/page";
import TransitionGroup from "react-transition-group/TransitionGroup";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

const Favourites = ({ list, openView, removeView, listType }) => {
  return list?.length ? (
    <List dense={false}>
      <TransitionGroup {...{ appear: false, enter: true, exit: true }}>
        {list.map(({ link, title }, index) => (
          <Fade key={link} collapse bottom>
            <ListItem>
              <ListItemIcon>
                <Typography>{index + 1}</Typography>
              </ListItemIcon>
              <ListItemText primary={title} onClick={openView(link)} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={removeView({ link, title, listType })}>
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
  );
};

export default Favourites;
