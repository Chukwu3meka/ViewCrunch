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
    [favourite, setFavourite] = useState(props.favourite || []),
    [blacklist, setBlacklist] = useState(props.blacklist || []);

  useEffect(() => {
    setOnline(props.online);
  }, [props.online]);

  const removeView = ({ url, title, listType }) => async () => {
    if (myHandle && online) {
      const { status, favourite, blacklist } = await fetcher(
        "/api/profile/favourite",
        JSON.stringify({
          myHandle,
          title,
          url,
          list: listType === "Favourite" ? "favourite" : blacklist,
          append: false,
        })
      );

      if (status) {
        listType === "Favourite"
          ? setFavourite(favourite.filter((x) => x.url !== url))
          : setBlacklist(blacklist.filter((x) => x.url !== url));
        enqueueSnackbar(`${title} removed from ${listType}`, { variant: "success" });
      } else {
        enqueueSnackbar(`Please, Try again. Error occured.`, { variant: "error" });
      }
    } else {
      enqueueSnackbar(`Network connectivity or Authentication issue.`, { variant: "warning" });
    }
  };

  const openView = (url) => () => router.push(url);

  return (
    <Favourite
      {...{
        list: switchView ? favourite : blacklist,
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
