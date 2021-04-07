import { Members } from "/";
import { useEffect, useState } from "react";
import { chunkArray } from "@utils/clientFunctions";
import { fetchProfile } from "@utils/firestoreFetch";

import { fetcher, trimString } from "@utils/clientFunctions";

import { connect } from "react-redux";
import { useSnackbar } from "notistack";

const MembersContainer = ({ activeSpace, setActiveSpace, displayMembers, setDisplayMembers, myHandle, myRefresh }) => {
  const chunkSize = 100;
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const listChunk = chunkArray({ array: list, chunkSize })[page - 1] || [];

  useEffect(() => {
    if (displayMembers) {
      const listHandler = async () => {
        const list = [];
        for (const handle of activeSpace[displayMembers]) {
          const { displayName, profilePicture } = await fetchProfile(handle);
          list.push({ displayName, profilePicture, handle });
        }
        return list;
      };

      listHandler().then((list) => {
        setList(list);
      });
    }
  }, []);

  const followHandler = ({ follow, viewer }) => async () => {
    const status = await fetcher("/api/profile/followViewer ", JSON.stringify({ follow, viewer, myHandle, myRefresh }));
    if (status) {
      if (follow) {
        setActiveSpace({ ...activeSpace, myFollowing: [...activeSpace?.myFollowing, viewer] });
      } else {
        setActiveSpace({ ...activeSpace, myFollowing: activeSpace?.myFollowing.filter((x) => x !== viewer) });
      }
    }
  };

  return displayMembers ? (
    <Members
      {...{
        setDisplayMembers,
        title: `${activeSpace.title} ${displayMembers}`,
        listChunk,
        list,
        chunkSize,
        page,
        setPage,
        activeSpace,
        followHandler,
      }}
    />
  ) : (
    ""
  );
};

const mapStateToProps = (state) => ({
    myHandle: state?.profile?.myHandle,
    myRefresh: state?.profile?.myRefresh,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
