import { Members } from "/";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { fetcher } from "@utils/clientFunctions";
import { chunkArray } from "@utils/clientFunctions";
import { fetchProfile } from "@utils/firestoreFetch";

const MembersContainer = ({ activeCrunch, setActiveCrunch, displayMembers, setDisplayMembers, myHandle }) => {
  const chunkSize = 100;
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const listChunk = chunkArray({ array: list, chunkSize })[page - 1] || [];

  useEffect(() => {
    if (displayMembers && activeCrunch[displayMembers]) {
      const listHandler = async () => {
        const list = [];
        for (const handle of activeCrunch[displayMembers]) {
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
    const status = await fetcher("/api/profile/followViewer ", JSON.stringify({ follow, viewer, myHandle }));
    if (status) {
      if (follow) {
        setActiveCrunch({ ...activeCrunch, myFollowing: [...activeCrunch?.myFollowing, viewer] });
      } else {
        setActiveCrunch({ ...activeCrunch, myFollowing: activeCrunch?.myFollowing.filter((x) => x !== viewer) });
      }
    }
  };

  return displayMembers ? (
    <Members
      {...{
        setDisplayMembers,
        title: `${activeCrunch.title} ${displayMembers}`,
        listChunk,
        list,
        chunkSize,
        page,
        setPage,
        activeCrunch,
        followHandler,
      }}
    />
  ) : (
    ""
  );
};

const mapStateToProps = (state) => ({
    myHandle: state?.profile?.myHandle,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MembersContainer);
