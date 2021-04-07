import { styles } from "/";
import Link from "next/link";
import { CoverPic } from "@component/others";
import { trimString } from "@utils/clientFunctions";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import ThemeIcon from "@material-ui/icons/EmojiObjects";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const NavBar = ({
  navBar,
  myHandle,
  myProfession,
  myDisplayName,
  myNotification,
  myCoverPicture,
  myProfilePicture,
  selectedNavBar,
  setSelectedNavBar,
  currentThemeHandler,
}) => (
  <div className={styles.navbar}>
    <div>
      {/* profile intro */}
      <Link href={{ pathname: `/${myHandle ? myHandle : "unauthenticated"}` }}>
        <a>
          {/* <div> */}
          <CoverPic
            {...{
              imgSrcA: myCoverPicture || "/images/viewChest-cover.webp",
              imgAltA: myDisplayName || "viewChest cover picture",
              imgSrcB: myProfilePicture || "/images/viewChest.webp",
              imgAltB: myDisplayName || "viewChest logo",
            }}
          />
          <div>
            <Typography variant="body2">{myDisplayName ? trimString(myDisplayName, 15) : "viewChest"}</Typography>
            <Typography variant="caption">{myProfession ? trimString(myProfession, 30) : new Date().toDateString()}</Typography>
          </div>
          {/* </div> */}
        </a>
      </Link>
      {/* nav links */}
      {/* <a> */}
      <div>
        <List component="nav-links">
          {navBar.map(([label, link, icon], index) => (
            <Link href={{ pathname: link }} key={index}>
              <a>
                <ListItem
                  button
                  selected={selectedNavBar === link || (selectedNavBar.includes(link) && link !== "/")}
                  onClick={() => setSelectedNavBar(link)}>
                  <ListItemIcon>
                    <IconButton
                      size="small"
                      style={{
                        position: "relative",
                      }}>
                      {icon || <ImageIcon />}
                      {link === "/notification" && !!myNotification && (
                        <span
                          style={{
                            position: "absolute",
                            left: "15px",
                            top: "-5px",
                            color: "white",
                            fontSize: ".7em",
                            textAlign: "center",
                            borderRadius: "50%",
                            padding: "3px 5px 2px",
                            backgroundColor: "rgb(185, 24, 24)",
                          }}>
                          {myNotification}
                        </span>
                      )}
                    </IconButton>
                  </ListItemIcon>
                  <ListItemText id={label} primary={label} />
                  {(selectedNavBar === link || (selectedNavBar.includes(link) && link !== "/")) && (
                    <span style={{ backgroundColor: "rgb(255, 215, 0)", borderRadius: "50%", height: "8px", width: "8px" }} />
                  )}
                </ListItem>
              </a>
            </Link>
          ))}
        </List>
      </div>
      {/* </a> */}
    </div>

    {/* Theme */}
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
