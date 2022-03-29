import { Preview } from ".";

const PreviewContainer = ({ displayPreview, setDisplayPreview, view }) => {
  const hidePreview = () => setDisplayPreview(false);

  return <Preview displayPreview={displayPreview} hidePreview={hidePreview} view={view} />;
};

export default PreviewContainer;
