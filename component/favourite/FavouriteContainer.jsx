import { Favourite } from "/";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";

const FavouritesContainer = (props) => {
  const { myHandle } = props,
    router = useRouter(),
    { enqueueSnackbar } = useSnackbar(),
    [online, setOnline] = useState(props.online),
    [switchView, setSwitchView] = useState(true),
    [favourites, setFavourite] = useState(props.favourite || []),
    [blacklist, setBlacklist] = useState(props.blacklist || []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const removeView = ({ link, title, listType }) => async () => {
    if (myHandle && online) {
      const status = await fetcher("/api/profile/favourite", JSON.stringify({ link, title, myHandle, listType, remove: true }));
      if (status) {
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
    <Favourite
      {...{
        list: switchView ? favourites : blacklist,
        openView,
        removeView,
        listType: switchView ? "Favourite" : "Blacklist",
        switchView,
        setSwitchView,
      }}
    />
  );
};

const mapStateToProps = (state) => ({
    myHandle: state.profile?.myHandle,
    online: state.device?.online,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavouritesContainer);
