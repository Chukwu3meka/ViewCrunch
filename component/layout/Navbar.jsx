import { styles } from "/";
import Link from "next/link";
import { trimString } from "@utils/clientFunctions";
import { CoverPic, Avatar } from "@component/others";
import { withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import ThemeIcon from "@material-ui/icons/EmojiObjects";
import { List, ListItem, Typography, IconButton, ListItemIcon, ListItemText, Badge } from "@material-ui/core";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const NavBar = ({
  navBar,
  myHandle,
  myProfession,
  myDisplayName,
  myNotification,
  myCoverPicture,
  myProfilePicture,
  selectedNavBar,
  deviceWidth,
  currentThemeHandler,
}) => (
  <div className={styles.navbar}>
    <div>
      {deviceWidth >= 420 ? (
        <Link href={{ pathname: `/${myHandle ? myHandle : "unauthenticated"}` }}>
          <a>
            <CoverPic
              {...{
                imgSrcA: myCoverPicture || "/images/ViewCrunch-cover.webp",
                imgAltA: myDisplayName || "ViewCrunch cover picture",
                imgSrcB: myProfilePicture || "/images/ViewCrunch.webp",
                imgAltB: myDisplayName || "ViewCrunch logo",
              }}
            />
            <div>
              <Typography variant="body2">{myDisplayName ? trimString(myDisplayName, 15) : "ViewCrunch"}</Typography>
              <Typography variant="caption">{myProfession ? trimString(myProfession, 30) : new Date().toDateString()}</Typography>
            </div>
          </a>
        </Link>
      ) : (
        <Link href={{ pathname: `/${myHandle ? myHandle : "unauthenticated"}` }}>
          <span>
            <Avatar src={myProfilePicture || "/images/ViewCrunch.webp"} alt={myDisplayName || "ViewCrunch cover picture"} size="large" />
          </span>
        </Link>
      )}

      <div>
        <List component="nav-links">
          {navBar.map(([label, link, icon], index) => (
            <Link href={{ pathname: link }} key={index}>
              <a>
                <ListItem button selected={selectedNavBar === label}>
                  <ListItemIcon>
                    <IconButton
                      size="small"
                      style={{
                        position: "relative",
                      }}>
                      <StyledBadge badgeContent={link === "/notification" && !!myNotification ? myNotification : null} color="secondary">
                        {icon || <ImageIcon />}
                      </StyledBadge>
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText id={label} primary={label} />
                  {selectedNavBar === label && (
                    <span style={{ backgroundColor: "rgb(255, 215, 0)", borderRadius: "50%", height: "8px", width: "8px" }} />
                  )}
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </div>
    </div>

    <div>
      <Link href="/settings">
        <span>
          <IconButton>
            <SettingsIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">Settings</Typography>
        </span>
      </Link>
      <ThemeIcon onClick={currentThemeHandler} style={{ cursor: "pointer" }} />
    </div>
  </div>
);

export default NavBar;
