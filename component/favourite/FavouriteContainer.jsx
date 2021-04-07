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
  const [switchView, setSwitchView] = useState(true);
  const {
      author: { handle, token },
      blacklist: propsBlacklist,
      favourites: propsFavourites,
    } = props,
    router = useRouter(),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [favourites, setFavourite] = useState(propsFavourites || []),
    [blacklist, setBlacklist] = useState(propsBlacklist || []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const removeView = ({ id, title, listType }) => async () => {
    if (token && online) {
      const { status } = await fetcher("/api/favourites/removeView", JSON.stringify({ id, token, listType }));
      if (status === "success") {
        listType === "favourite"
          ? setFavourite(favourites.filter((x) => x.id !== id))
          : setBlacklist(blacklist.filter((x) => x.id !== id));
        enqueueSnackbar(`${title} removed from ${listType}`, { variant: "success" });
      } else {
        enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity issue.`, { variant: "warning" });
    }
  };

  const openView = (id) => () => router.push(id);

  return (
    <Grid container className={styles.favourite}>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Button onClick={() => setSwitchView(!switchView)} variant="outlined" color="secondary">{`Switch to ${
          switchView ? "Blacklist" : "Favourite"
        }`}</Button>
        <div>
          <Favourite
            {...{ list: switchView ? favourites : blacklist, openView, removeView, listType: switchView ? "Favourite" : "Blacklist" }}
          />
        </div>
      </Grid>
      <Hidden mdDown>
        <Grid item lg={6}>
          <div>
            <Image src="/images/2.png" layout="fill" />
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
    author: state?.profile,
    online: state?.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesContainer);
