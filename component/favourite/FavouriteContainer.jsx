import Image from "next/image";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";

import { Favourite, styles } from "/";
import { fetcher } from "@utils/clientFunctions";

const FavouritesContainer = (props) => {
  const { myHandle } = props,
    router = useRouter(),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [switchView, setSwitchView] = useState(true),
    [favourites, setFavourite] = useState(props.favourites || []),
    [blacklist, setBlacklist] = useState(props.blacklist || []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const removeView = ({ link, title, listType }) => async () => {
    if (myHandle && online) {
      const { status } = await fetcher("/api/profile/favourite", JSON.stringify({ link, title, myHandle, listType }));
      if (status === "success") {
        listType === "Favourite"
          ? setFavourite(favourites.filter((x) => x.link !== link))
          : setBlacklist(blacklist.filter((x) => x.link !== link));
        enqueueSnackbar(`${title} removed from ${listType}`, { variant: "success" });
      } else {
        enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity or Authentication issue.`, { variant: "warning" });
    }
  };

  const openView = (link) => () => router.push(link);

  return (
    <Grid container className={styles.favourite}>
      <Grid item xs={12} sm={12} md={12} lg={8}>
        <div>
          <Button onClick={() => setSwitchView(!switchView)} variant="outlined" color="secondary">{`Switch to ${
            switchView ? "Blacklist" : "Favourite"
          }`}</Button>
          <Favourite
            {...{ list: switchView ? favourites : blacklist, openView, removeView, listType: switchView ? "Favourite" : "Blacklist" }}
          />
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
};

const mapStateToProps = (state) => ({
    myHandle: state.profile?.myHandle,
    online: state.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesContainer);
