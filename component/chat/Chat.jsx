import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FilterListIcon from "@material-ui/icons/FilterList";
import FormHelperText from "@material-ui/core/FormHelperText";

import { ActiveChat, styles } from "/";
import { trimString } from "@utils/clientFunctions";
import { shortNumber } from "@utils/clientFunctions";
import { Avatar, FixedIcon } from "@component/others";

const Index = ({
  classes,
  chatList,
  selectPersonHandler,
  setFilter,
  mobile,
  selectedPerson,
  setFilterSortFunc,
  scrollRef,
  filterSort,
  followers,
  following,
  filter,
  blocked,
  chatScrollRef,
  setMobile,
  selectedPersonScrollRef,
}) => (
  <Grid container className={styles.chat}>
    {mobile ? (
      <Grid item xs={12} sm={12} md={12} lg={12} className={styles.mobileChatContent}>
        <IconButton aria-label="close" color="inherit" onClick={() => setMobile(false)}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <ActiveChat {...{ person: chatList?.find((x) => x.handle === selectedPerson), blocked, following, chatScrollRef, setMobile }} />
      </Grid>
    ) : (
      <Grid item xs={12} sm={12} md={3} lg={3} className={styles.chatList}>
        <div ref={scrollRef}>
          {filterSort ? (
            <div>
              <FormControl variant="filled" size="small" fullWidth>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}>
                  <MenuItem value="" disabled>
                    Filter by
                  </MenuItem>
                  <MenuItem value="followers">{`Followers ${shortNumber(followers?.length) || 0}`}</MenuItem>
                  <MenuItem value="following">{`Following ${shortNumber(following?.length) || 0}`}</MenuItem>
                  <MenuItem value="blocked">{`Blocked ${shortNumber(blocked?.length) || 0}`}</MenuItem>
                </Select>
                <FormHelperText>Filter by</FormHelperText>
              </FormControl>
            </div>
          ) : (
            <div />
          )}
          <Toolbar>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Toolbar>
        </div>
        <div>
          {chatList.map(({ displayName, profilePicture, profession, handle }) => (
            <div
              key={handle}
              onClick={selectPersonHandler({ handle })}
              className={selectedPerson === handle ? styles.selected : ""}
              ref={selectedPerson === handle ? selectedPersonScrollRef : null}>
              <Avatar alt={trimString(displayName, 30)} src={profilePicture} />
              <div>
                <Typography component="span" variant="body1">
                  {displayName}
                </Typography>
                <Typography component="span" variant="body2" color="textSecondary">
                  {profession}
                </Typography>
              </div>
            </div>
          ))}
        </div>
        <FixedIcon {...{ icon: <FilterListIcon />, clickHandler: setFilterSortFunc }} />
      </Grid>
    )}
    <Hidden smDown>
      <Grid item md={9} lg={9} className={styles.chatDiv}>
        <ActiveChat {...{ person: chatList?.find((x) => x.handle === selectedPerson), blocked, following, chatScrollRef, setMobile }} />
      </Grid>
    </Hidden>
  </Grid>
);
export default Index;
