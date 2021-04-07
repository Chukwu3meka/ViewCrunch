import { StoryContainer, ViewPopupContainer, styles } from "/";

const View = ({
  view,
  online,
  scrollRef,
  profile,
  advert,
  moreActions,
  forceRefresh,
  setMoreActions,
  setForceRefresh,
  reportView,
  setReportView,
}) => (
  <div className={styles.view} ref={scrollRef}>
    <StoryContainer {...{ view, online, profile, advert, setMoreActions, setForceRefresh, setReportView }} />
    <ViewPopupContainer {...{ moreActions, forceRefresh, reportView, setReportView, view }} />
  </div>
);

export default View;
